import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import RequestWithUser from "src/Request/requestwithuser.interface";
import { Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto, response: Response): Promise<void>;
    activateUser(body: {
        id: number;
        otp: string;
    }): Promise<boolean>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: {
            access_token: string;
        };
    }>;
    findAllDonors(request: RequestWithUser): Promise<Partial<User>[]>;
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
