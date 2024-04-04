import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import RequestWithUser from 'src/Request/requestwithuser.interface';
import { Post as PostEntity } from './entities/post.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, request: RequestWithUser): Promise<PostEntity>;
    deletePost(postId: number, request: RequestWithUser): Promise<{
        message: string;
    }>;
    findAllPostsByUserId(userId: number, request: RequestWithUser): Promise<PostEntity[]>;
    updatePost(postId: number, updatePostDto: UpdatePostDto, request: RequestWithUser): Promise<PostEntity>;
    findAll(): string;
    findOne(id: string): Promise<PostEntity>;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
