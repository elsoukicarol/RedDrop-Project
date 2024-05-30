import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RecaptchaService {
  private readonly secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const secret = this.configService.get<string>('6LccVOwpAAAAAPv57MZyJ6nu1iX8_8q5AJzCmmWW') || '6LccVOwpAAAAAPv57MZyJ6nu1iX8_8q5AJzCmmWW';
    if (!secret) {
      throw new Error('RECAPTCHA_SECRET_KEY is not set in environment variables');
    }
    this.secretKey = secret;
  }

  async verifyRecaptchaToken(token: string): Promise<boolean> {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.secretKey}&response=${token}`;

    try {
      const response = await firstValueFrom(this.httpService.post(url));
      return response.data.success;
    } catch (error) {
      console.error('Error verifying reCAPTCHA token:', error);
      return false;
    }
  }
}
