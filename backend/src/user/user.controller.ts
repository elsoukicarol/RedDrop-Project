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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import RequestWithUser from 'src/Request/requestwithuser.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      if (user) {
        return {
          message:
            'User created successfully, please check your email for the OTP to activate your account.',
          user_id: user.id,
        };
      } else {
        return {
          message: 'User already exists',
        };
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to create user.');
    }
  }

  @Post('activate')
  async activateUser(@Body() body: { email: string; otp: string }) {
    try {
      const success = await this.userService.activateUser(body.email, body.otp);
      if (!success) {
        throw new BadRequestException('Invalid OTP or email.');
      }
      return { message: 'Account activated successfully.' };
    } catch (error) {
      return { message: error.message };
    }
  }

  // @AuthGuard('jwt')
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    /// passthrough sends cookie to the frontend
  ) {
    try {
      const user = await this.userService.login(body.email, body.password);

      if (user != null) {
        return { message: user };
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new BadRequestException('An error occurred during login.');
    }
  }

  @Get('/donors')
  @UseGuards(AuthGuard('jwt')) // Optional: Use this if you want the endpoint to be protected
  async findAllDonors(
    @Req() request: RequestWithUser,
  ): Promise<Partial<User>[]> {
    try {
      return await this.userService.findAllDonors(request.user.userId);
    } catch (error) {
      console.log(error);
      return error.message;
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
