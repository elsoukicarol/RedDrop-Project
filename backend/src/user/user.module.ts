import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RecaptchaModule } from 'src/recaptcha/recaptcha.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), AuthModule, RecaptchaModule],
  providers: [UserService],
})
export class UserModule {}
