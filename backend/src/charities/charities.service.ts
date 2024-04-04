import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharityDto } from './dto/create-charity.dto';
import { UpdateCharityDto } from './dto/update-charity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Charity } from './entities/charity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharitiesService {
  constructor(
    @InjectRepository(Charity)
    private readonly charityRepository: Repository<Charity>,
  ) {}
  async create(createCharityDto: CreateCharityDto): Promise<Charity> {
    const newCharity = this.charityRepository.create(createCharityDto);
    await this.charityRepository.save(newCharity);
    return newCharity;
  }

  async deleteCharity(id: number): Promise<{ message: string }> {
    const result = await this.charityRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Charity with ID "${id}" not found.`);
    }

    return { message: 'Charity deleted successfully' };
  }
  async updateCharity(
    id: number,
    updateCharityDto: UpdateCharityDto,
  ): Promise<Charity> {
    const charity = await this.charityRepository.findOneBy({ id });

    if (!charity) {
      throw new NotFoundException(`Charity with ID "${id}" not found.`);
    }

    const updatedCharity = this.charityRepository.merge(
      charity,
      updateCharityDto,
    );
    await this.charityRepository.save(updatedCharity);
    return updatedCharity;
  }
  async getCharity(id: number): Promise<Charity[]> {
    const charity = await this.charityRepository.findBy({ id: id });

    if (charity.length === 0) {
      throw new NotFoundException(`Charity with ID "${id}" not found.`);
    }
    return charity;
  }

  async getAllCharities(): Promise<Charity[]> {
    const charities = this.charityRepository.find();

    if (!charities) {
      throw new NotFoundException(`No charities found`);
    }
    return charities;
  }

  findAll() {
    return `This action returns all charities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charity`;
  }

  update(id: number, updateCharityDto: UpdateCharityDto) {
    return `This action updates a #${id} charity`;
  }

  remove(id: number) {
    return `This action removes a #${id} charity`;
  }
}
