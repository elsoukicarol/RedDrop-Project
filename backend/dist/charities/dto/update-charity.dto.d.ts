import { CreateCharityDto } from './create-charity.dto';
declare const UpdateCharityDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCharityDto>>;
export declare class UpdateCharityDto extends UpdateCharityDto_base {
    charity_name?: string;
    description?: string;
    picture?: string;
}
export {};
