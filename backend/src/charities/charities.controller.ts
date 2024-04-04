import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CharitiesService } from './charities.service';
import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { AuthGuard } from '@nestjs/passport';
import { Charity } from './entities/charity.entity';

@Controller('charities')
export class CharitiesController {
  constructor(private readonly charitiesService: CharitiesService) {}

  @Post('/create')
  async create(@Body() createCharityDto: CreateCharityDto) {
    try {
      return await this.charitiesService.create(createCharityDto);
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // Optional: Use this if you want the endpoint to be protected
  async deleteCharity(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.charitiesService.deleteCharity(id);
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt')) // Optional: Use this for route protection
  async updateCharity(
    @Param('id') id: number,
    @Body() updateCharityDto: UpdateCharityDto,
  ): Promise<Charity> {
    return this.charitiesService.updateCharity(id, updateCharityDto);
  }
  @Get('/charity/:id')
  @UseGuards(AuthGuard('jwt')) // Optional: Use this if you want the endpoint to be protected
  async findCharity(@Param('id') id: number) {
    return this.charitiesService.getCharity(id);
  }

  @Get('/getall')
  @UseGuards(AuthGuard('jwt')) // Optional: Use this if you want the endpoint to be protected
  async findAllCharities() {
    return this.charitiesService.getAllCharities();
  }

  @Get()
  findAll() {
    return this.charitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharityDto: UpdateCharityDto) {
    return this.charitiesService.update(+id, updateCharityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charitiesService.remove(+id);
  }
}
