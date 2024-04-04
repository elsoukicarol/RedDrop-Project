import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import RequestWithUser from 'src/Request/requestwithuser.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        user_id: number;
    } | {
        message: string;
        user_id?: undefined;
    }>;
    activateUser(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: any;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: {
            access_token: string;
        };
    }>;
    findAllDonors(request: RequestWithUser): Promise<Partial<User>[]>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
