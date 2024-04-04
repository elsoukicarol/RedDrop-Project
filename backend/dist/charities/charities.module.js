"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharitiesModule = void 0;
const common_1 = require("@nestjs/common");
const charities_service_1 = require("./charities.service");
const charities_controller_1 = require("./charities.controller");
const charity_entity_1 = require("./entities/charity.entity");
const typeorm_1 = require("@nestjs/typeorm");
let CharitiesModule = class CharitiesModule {
};
exports.CharitiesModule = CharitiesModule;
exports.CharitiesModule = CharitiesModule = __decorate([
    (0, common_1.Module)({
        controllers: [charities_controller_1.CharitiesController],
        imports: [typeorm_1.TypeOrmModule.forFeature([charity_entity_1.Charity])],
        providers: [charities_service_1.CharitiesService],
    })
], CharitiesModule);
//# sourceMappingURL=charities.module.js.map