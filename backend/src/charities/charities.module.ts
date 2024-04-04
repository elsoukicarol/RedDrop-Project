import { Module } from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CharitiesController } from './charities.controller';
import { Charity } from './entities/charity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CharitiesController],
  imports: [TypeOrmModule.forFeature([Charity])],
  providers: [CharitiesService],
})
export class CharitiesModule {}
