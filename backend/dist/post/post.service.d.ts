import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
export declare class PostService {
    private postRepository;
    constructor(postRepository: Repository<Post>);
    create(createPostDto: CreatePostDto, user_id: number): Promise<Post>;
    deletePost(postId: number, userId: number): Promise<boolean>;
    findAllPostsByUserId(userId: number): Promise<Post[]>;
    getAllPosts(excludeUserId: number): Promise<Post[]>;
    updatePost(postId: number, userId: number, updatePostDto: UpdatePostDto): Promise<Post>;
    findAll(): string;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
