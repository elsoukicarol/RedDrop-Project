import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from './post/post.module';
import { CharitiesModule } from './charities/charities.module';
// import { FaqModule } from './faq/faq.module';
import { FinancialTransactionsModule } from './financial-transactions/financial-transactions.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [],
      autoLoadEntities: true,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    PostModule,
    CharitiesModule,
    // FaqModule,
    FinancialTransactionsModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
