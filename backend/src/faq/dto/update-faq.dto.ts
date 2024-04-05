import { PartialType } from '@nestjs/mapped-types';
import { createFaqDto } from './create-faq.dto';

export class UpdateFaqDto extends PartialType(createFaqDto) {}
