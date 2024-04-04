import { User } from 'src/user/entities/user.entity';
export declare class CreatePostDto {
    title: string;
    description: string;
    blood_type: string;
    quantity: string;
    location: string;
    urgent: boolean;
    status: string;
    user_id: User;
}
