import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    role?: string;
    @IsOptional()
    @IsString()
    blood_type?: string;
    @IsOptional()
    @IsString()
    weight?: string;
    @IsOptional()
    @IsString()
    age?: string;
    @IsOptional()
    @IsString()
    medical_condition?: string;
    @IsOptional()
    @IsString()
    location?: string;
    @IsOptional()
    @IsString()
    tattoos?: string;

    /// optional fields
    @IsOptional()
    @IsString()
    tattoos_lately?: string;

    @IsOptional()
    @IsString()
    medications?: string;

    @IsOptional()
    @IsString()
    specify_conditions?: string;

}
