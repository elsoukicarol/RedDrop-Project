import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { FaqService } from "./faq.service";
import { createFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { Faq } from "./entities/faq.entity";

@Controller("faq")
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post("/create")
  async create(@Body() createFaqDto: createFaqDto): Promise<Faq> {
    try {
      return await this.faqService.create(createFaqDto);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<{ message: string }> {
    try {
      return await this.faqService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get()
  async getAllPosts(): Promise<Faq[]> {
    try {
      return await this.faqService.findAll();
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.faqService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.faqService.remove(+id);
  }
}
