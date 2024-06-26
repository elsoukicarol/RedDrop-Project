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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charity = void 0;
const typeorm_1 = require("typeorm");
let Charity = class Charity {
};
exports.Charity = Charity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Charity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "charity_name" }),
    __metadata("design:type", String)
], Charity.prototype, "charity_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "description" }),
    __metadata("design:type", String)
], Charity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: "donations" }),
    __metadata("design:type", Number)
], Charity.prototype, "donations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, name: "profile_picture" }),
    __metadata("design:type", String)
], Charity.prototype, "picture", void 0);
exports.Charity = Charity = __decorate([
    (0, typeorm_1.Entity)("charities")
], Charity);
//# sourceMappingURL=charity.entity.js.map