import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    sendOtpEmail(email: string, otp: string): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    activateUser(id: number, otp: string): Promise<boolean>;
    decodeToken(token: string): any;
    login(email: string, password: string): Promise<{
        access_token: string;
    } | null>;
    findAllDonors(requestingUserId: number): Promise<Partial<User>[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
