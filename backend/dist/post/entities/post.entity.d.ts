import { User } from '../../user/entities/user.entity';
export declare class Post {
    id: number;
    user: User;
    title: string;
    description: string;
    blood_type: string;
    quantity: string;
    location: string;
    urgent: boolean;
    status: string;
    created_at: Date;
    updated_at: Date;
}
