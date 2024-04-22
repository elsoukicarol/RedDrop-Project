"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const passport_1 = require("@nestjs/passport");
const post_module_1 = require("./post/post.module");
const charities_module_1 = require("./charities/charities.module");
const faq_module_1 = require("./faq/faq.module");
const financial_transactions_module_1 = require("./financial-transactions/financial-transactions.module");
const stripe_module_1 = require("./stripe/stripe.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                password: process.env.POSTGRES_PASSWORD,
                username: process.env.POSTGRES_USER,
                entities: [],
                autoLoadEntities: true,
                database: process.env.POSTGRES_DATABASE,
                synchronize: true,
                logging: true,
            }),
            user_module_1.UserModule,
            post_module_1.PostModule,
            charities_module_1.CharitiesModule,
            faq_module_1.FaqModule,
            financial_transactions_module_1.FinancialTransactionsModule,
            stripe_module_1.StripeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map