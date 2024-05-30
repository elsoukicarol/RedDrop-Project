import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
  Req,
  Res,
  Put,
  InternalServerErrorException,
  ConflictException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./entities/user.entity";
import RequestWithUser from "src/Request/requestwithuser.interface";
import { Response } from "express";
import { RecaptchaService } from "../recaptcha/recaptchaservice";
import { LoginDto } from "./dto/login.dto";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  @Post("signup")
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { recaptchaToken } = createUserDto;
    const isHuman =
      await this.recaptchaService.verifyRecaptchaToken(recaptchaToken);

    if (!isHuman) {
      throw new BadRequestException("Failed reCAPTCHA verification");
    }

    try {
      const user = await this.userService.create(createUserDto); // Pass the full DTO
      return {
        status: 200,
        user,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new ConflictException("User already exists.");
      } else {
        console.error(error);
        throw new InternalServerErrorException("Failed to create user.");
      }
    }
  }

  @Post("activate")
  async activateUser(@Body() body: { id: number; otp: string }) {
    const success = await this.userService.activateUser(body.id, body.otp);
    console.log(success);
    if (!success) {
      throw new BadRequestException("Invalid OTP or user ID.");
    }
    return true;
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { recaptchaToken, ...loginData } = loginDto;
    const isHuman =
      await this.recaptchaService.verifyRecaptchaToken(recaptchaToken);

    if (!isHuman) {
      throw new BadRequestException("Failed reCAPTCHA verification");
    }

    try {
      const user = await this.userService.login(
        loginData.email,
        loginData.password
      );

      if (user != null) {
        response.status(200).json(user);
      } else {
        throw new UnauthorizedException("Invalid credentials");
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new BadRequestException("An error occurred during login.");
    }
  }

  @Get("/donors")
  @UseGuards(AuthGuard("jwt"))
  async findAllDonors(
    @Req() request: RequestWithUser
  ): Promise<Partial<User>[]> {
    try {
      return await this.userService.findAllDonors(request.user.userId);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  async updateUser(
    @Param("id") userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: RequestWithUser
  ): Promise<User> {
    try {
      if (request.user.userId !== userId) {
        throw new UnauthorizedException("Unauthorized to update this user");
      }
      return await this.userService.update(updateUserDto, userId);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
