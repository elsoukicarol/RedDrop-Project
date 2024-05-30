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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const passport_1 = require("@nestjs/passport");
const recaptchaservice_1 = require("../recaptcha/recaptchaservice");
const login_dto_1 = require("./dto/login.dto");
let UserController = class UserController {
    constructor(userService, recaptchaService) {
        this.userService = userService;
        this.recaptchaService = recaptchaService;
    }
    async createUser(createUserDto) {
        const { recaptchaToken } = createUserDto;
        const isHuman = await this.recaptchaService.verifyRecaptchaToken(recaptchaToken);
        if (!isHuman) {
            throw new common_1.BadRequestException("Failed reCAPTCHA verification");
        }
        try {
            const user = await this.userService.create(createUserDto);
            return {
                status: 200,
                user,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.ConflictException("User already exists.");
            }
            else {
                console.error(error);
                throw new common_1.InternalServerErrorException("Failed to create user.");
            }
        }
    }
    async activateUser(body) {
        const success = await this.userService.activateUser(body.id, body.otp);
        console.log(success);
        if (!success) {
            throw new common_1.BadRequestException("Invalid OTP or user ID.");
        }
        return true;
    }
    async login(loginDto, response) {
        const { recaptchaToken, ...loginData } = loginDto;
        const isHuman = await this.recaptchaService.verifyRecaptchaToken(recaptchaToken);
        if (!isHuman) {
            throw new common_1.BadRequestException("Failed reCAPTCHA verification");
        }
        try {
            const user = await this.userService.login(loginData.email, loginData.password);
            if (user != null) {
                response.status(200).json(user);
            }
            else {
                throw new common_1.UnauthorizedException("Invalid credentials");
            }
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.BadRequestException("An error occurred during login.");
        }
    }
    async findAllDonors(request) {
        try {
            return await this.userService.findAllDonors(request.user.userId);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateUser(userId, updateUserDto, request) {
        try {
            if (request.user.userId !== userId) {
                throw new common_1.UnauthorizedException("Unauthorized to update this user");
            }
            return await this.userService.update(updateUserDto, userId);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(+id);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)("activate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("/donors"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllDonors", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        recaptchaservice_1.RecaptchaService])
], UserController);
//# sourceMappingURL=user.controller.js.map