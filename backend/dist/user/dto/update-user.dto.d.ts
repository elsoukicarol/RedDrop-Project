import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role?: string;
    blood_type?: string;
    weight?: string;
    age?: string;
    medical_condition?: string;
    location?: string;
    tattoos?: string;
    tattoos_lately?: string;
    medications?: string;
    specify_conditions?: string;
}
export {};
