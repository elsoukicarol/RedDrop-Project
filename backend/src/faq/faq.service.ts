import { Injectable, NotFoundException } from "@nestjs/common";
import { createFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { Faq } from "./entities/faq.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>
  ) {}
  async create(createFaqDto: createFaqDto): Promise<Faq> {
    const newPost = this.faqRepository.create({
      ...createFaqDto,
    });
    await this.faqRepository.save(newPost);
    return newPost;
  }

  async delete(id: number): Promise<{ message: string }> {
    const faq = await this.faqRepository.findBy({ id: id });
    if (!faq) {
      throw new NotFoundException("FAQ not found");
    }
    await this.faqRepository.remove(faq);
    return { message: "Question deleted succesfully" };
  }

  async findAll(): Promise<Faq[]> {
    return await this.faqRepository.find();
  }

  // findAll() {
  //   return `This action returns all faq`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} faq`;
  }

  update(id: number, updateFaqDto: UpdateFaqDto) {
    return `This action updates a #${id} faq`;
  }

  remove(id: number) {
    return `This action removes a #${id} faq`;
  }
}
