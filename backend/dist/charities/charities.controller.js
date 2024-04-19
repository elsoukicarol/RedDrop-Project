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
exports.CharitiesController = void 0;
const common_1 = require("@nestjs/common");
const charities_service_1 = require("./charities.service");
const create_charity_dto_1 = require("./dto/create-charity.dto");
const update_charity_dto_1 = require("./dto/update-charity.dto");
const passport_1 = require("@nestjs/passport");
let CharitiesController = class CharitiesController {
    constructor(charitiesService) {
        this.charitiesService = charitiesService;
    }
    async create(createCharityDto) {
        try {
            return await this.charitiesService.create(createCharityDto);
        }
        catch (error) {
            console.log(error);
            return { message: error.message };
        }
    }
    async deleteCharity(id) {
        try {
            return await this.charitiesService.deleteCharity(id);
        }
        catch (error) {
            console.log(error);
            return { message: error.message };
        }
    }
    async updateCharity(id, updateCharityDto) {
        return this.charitiesService.updateCharity(id, updateCharityDto);
    }
    async findCharity(id) {
        return this.charitiesService.getCharity(id);
    }
    async findAllCharities() {
        return this.charitiesService.getAllCharities();
    }
    findAll() {
        return this.charitiesService.findAll();
    }
    findOne(id) {
        return this.charitiesService.findOne(+id);
    }
    update(id, updateCharityDto) {
        return this.charitiesService.update(+id, updateCharityDto);
    }
    remove(id) {
        return this.charitiesService.remove(+id);
    }
};
exports.CharitiesController = CharitiesController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_charity_dto_1.CreateCharityDto]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "deleteCharity", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_charity_dto_1.UpdateCharityDto]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "updateCharity", null);
__decorate([
    (0, common_1.Get)('/charity/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "findCharity", null);
__decorate([
    (0, common_1.Get)('/getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "findAllCharities", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CharitiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_charity_dto_1.UpdateCharityDto]),
    __metadata("design:returntype", void 0)
], CharitiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CharitiesController.prototype, "remove", null);
exports.CharitiesController = CharitiesController = __decorate([
    (0, common_1.Controller)('charities'),
    __metadata("design:paramtypes", [charities_service_1.CharitiesService])
], CharitiesController);
//# sourceMappingURL=charities.controller.js.map