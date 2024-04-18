import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Not, Repository } from "typeorm";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import * as randomstring from "randomstring";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Red Drop" <elsoukicarol@hotmail.com>',
      to: email,
      subject: "Your OTP for Account Activation",
      text: `🎉 Welcome to Red Drop! 🎉\nWe're thrilled to have you join our community! Your journey towards an exciting experience has just begun. 🚀\nTo get started, please remember to activate your account. Simply tap the activation link at the top of your welcome email. It's your key to unlocking all the amazing features and opportunities waiting for you.\nShould you have any questions or need assistance, our team is here to help. Welcome aboard, and thank you for joining Red Drop!\n\nYour OTP for account activation is: ${otp}\n\nPlease use this OTP to activate your account.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async create(createUserDto: CreateUserDto) {
    console.log("here");
    const otp = randomstring.generate({ length: 5, charset: "numeric" });

    // Create user with OTP (without saving yet)
    const userExists = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userExists) {
      console.log(userExists);
      throw new UnauthorizedException("User does not exist.");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      otp,
      isActivated: false,
    });

    // Save the user with the OTP
    await this.usersRepository.save(user);

    // Send OTP email
    await this.sendOtpEmail(createUserDto.email, otp);

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  /// checkear
  async activateUser(id: number, otp: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user || user.otp !== otp) {
      // Incorrect OTP or user not found
      return false;
    }

    console.log(user);
    user.isActivated = true;
    /// Clear OTP after activation
    user.otp = null;
    await this.usersRepository.save(user);

    return true;
  }

  decodeToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token); // Decode without verifying the signature
      return decoded;
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string } | null> {
    console.log("aqui");
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("User does not exist.");
    }
    if (!user.isActivated) {
      throw new UnauthorizedException(
        "Account is inactive. Please activate your account."
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Incorrect password.");
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async findAllDonors(requestingUserId: number): Promise<Partial<User>[]> {
    const donors = await this.usersRepository.find({
      where: {
        role: "Donor",
        isActivated: true,
        id: Not(requestingUserId),
      },
      select: ["first_name", "last_name", "blood_type", "location"],
    });

    if (!donors.length) {
      throw new NotFoundException({ message: "No donors found." });
    }

    return donors;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
