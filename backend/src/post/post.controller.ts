import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { AuthGuard } from "@nestjs/passport";
// import { Request } from 'express';
// import { User } from 'src/user/entities/user.entity';
import RequestWithUser from "src/Request/requestwithuser.interface";
import { Post as PostEntity } from "./entities/post.entity";


//
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("create")
  @UseGuards(AuthGuard("jwt"))
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() request: RequestWithUser
  ) {
    // Now, you can directly access the user property without type casting
    const id = request.user.userId; // Adjust based on your user object structure
    // Use userId in your logic
    return this.postService.create(createPostDto, id);
  }
  @Delete(":postId")
  @UseGuards(AuthGuard("jwt")) // Assuming JWT authentication
  async deletePost(
    @Param("postId") postId: number,
    @Req() request: RequestWithUser
  ): Promise<{ message: string }> {
    try {
      const userId = request.user.userId;

      const result = await this.postService.deletePost(postId, userId);
      console.log(result);
      if (!result) {
        return { message: "Post was not found" };
      }
      return { message: "Post was deleted successfully" };
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get("/userposts")
  @UseGuards(AuthGuard("jwt"))
  async findAllPostsByUserId(
    @Param("userId") userId: number,
    @Req() request: RequestWithUser
  ): Promise<PostEntity[]> {
    try {
      return await this.postService.findAllPostsByUserId(request.user.userId);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  @Get("/getAllPosts")
  @UseGuards(AuthGuard("jwt"))
  async getAllPosts(
    @Param("userId") userId: number,
    @Req() request: RequestWithUser
  ): Promise<PostEntity[]> {
    try {
      return await this.postService.getAllPosts(request.user.userId);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
  
  @Patch(":postId")
  @UseGuards(AuthGuard("jwt"))
  async updatePost(
    @Param("postId") postId: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: RequestWithUser
  ): Promise<PostEntity> {
    const userId = request.user.userId;
    return this.postService.updatePost(postId, userId, updatePostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
