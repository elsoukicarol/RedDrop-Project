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
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDto) {
        try {
            const user = await this.userService.create(createUserDto);
            if (user) {
                return {
                    message: 'User created successfully, please check your email for the OTP to activate your account.',
                    user_id: user.id,
                };
            }
            else {
                return {
                    message: 'User already exists',
                };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to create user.');
        }
    }
    async activateUser(body) {
        try {
            const success = await this.userService.activateUser(body.email, body.otp);
            if (!success) {
                throw new common_1.BadRequestException('Invalid OTP or email.');
            }
            return { message: 'Account activated successfully.' };
        }
        catch (error) {
            return { message: error.message };
        }
    }
    async login(body) {
        try {
            const user = await this.userService.login(body.email, body.password);
            if (user != null) {
                return { message: user };
            }
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.BadRequestException('An error occurred during login.');
        }
    }
    async findAllDonors(request) {
        try {
            return await this.userService.findAllDonors(request.user.userId);
        }
        catch (error) {
            console.log(error);
            return error.message;
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
    update(id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('activate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/donors'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllDonors", null);
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
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map