"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async sendOtpEmail(email, otp) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
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
    async create(createUserDto) {
        console.log("here");
        const otp = randomstring.generate({ length: 5, charset: "numeric" });
        const userExists = await this.usersRepository.findOneBy({
            email: createUserDto.email,
        });
        if (userExists) {
            console.log(userExists);
            throw new common_1.UnauthorizedException("User does not exist.");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            otp,
            isActivated: false,
        });
        await this.usersRepository.save(user);
        await this.sendOtpEmail(createUserDto.email, otp);
        const payload = { sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async update(updateUserDto, userId) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error("User not found");
        }
        Object.assign(user, updateUserDto);
        await this.usersRepository.save(user);
        return user;
    }
    async activateUser(id, otp) {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (!user || user.otp !== otp) {
            return false;
        }
        console.log(user);
        user.isActivated = true;
        user.otp = null;
        await this.usersRepository.save(user);
        return true;
    }
    decodeToken(token) {
        try {
            const decoded = this.jwtService.decode(token);
            return decoded;
        }
        catch (error) {
            console.error("Failed to decode token", error);
            return null;
        }
    }
    async login(email, password) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException("User does not exist.");
        }
        if (!user.isActivated) {
            throw new common_1.UnauthorizedException("Account is inactive. Please activate your account.");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Incorrect password.");
        }
        const payload = { sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async findAllDonors(requestingUserId) {
        const donors = await this.usersRepository.find({
            where: {
                role: "Donor",
                isActivated: true,
                id: (0, typeorm_1.Not)(requestingUserId),
            },
            select: ["first_name", "last_name", "blood_type", "location"],
        });
        if (!donors.length) {
            throw new common_1.NotFoundException({ message: "No donors found." });
        }
        return donors;
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map