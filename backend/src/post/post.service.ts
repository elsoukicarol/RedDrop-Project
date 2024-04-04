import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, user_id: number) {
    const newPost = this.postRepository.create({
      ...createPostDto,
      user: { id: user_id },
    });
    await this.postRepository.save(newPost);

    return newPost;
  }
  async deletePost(postId: number, userId: number): Promise<boolean> {
    // Optionally, ensure the post belongs to the user attempting to delete it
    const post = await this.postRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });
    if (post == null) {
      return false;
    }

    await this.postRepository.remove(post);
    return true;
  }
  async findAllPostsByUserId(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      select: [
        'title',
        'description',
        'blood_type',
        'location',
        'quantity',
        'status',
        'id',
      ],
    });

    if (!posts.length) {
      throw new NotFoundException('No posts found for this user.');
    }

    return posts;
  }

  async updatePost(
    postId: number,
    userId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!post) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found or not owned by the user.`,
      );
    }

    const updatedPost = this.postRepository.merge(post, updatePostDto);
    await this.postRepository.save(updatedPost);
    return updatedPost;
  }

  findAll() {
    return `This action returns all post`;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found.`);
    }

    return post;
  }

  ///arreflar aqui

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
