import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMTkxNTc4OSwiaWF0IjoxNzExOTE1Nzg5fQ.n3eL_SAY4hR1JWCaXICvIQEXDycmf3mWfBfDlBDDzco',

      signOptions: { expiresIn: '60s' },
    }),
  ],

  providers: [JwtStrategy],

  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
