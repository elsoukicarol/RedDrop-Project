"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(createPostDto, user_id) {
        const newPost = this.postRepository.create({
            ...createPostDto,
            user: { id: user_id },
        });
        await this.postRepository.save(newPost);
        return newPost;
    }
    async deletePost(postId, userId) {
        const post = await this.postRepository.findOne({
            where: { id: postId, user: { id: userId } },
        });
        if (post == null) {
            return false;
        }
        await this.postRepository.remove(post);
        return true;
    }
    async findAllPostsByUserId(userId) {
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
            throw new common_1.NotFoundException('No posts found for this user.');
        }
        return posts;
    }
    async updatePost(postId, userId, updatePostDto) {
        const post = await this.postRepository.findOne({
            where: { id: postId, user: { id: userId } },
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID "${postId}" not found or not owned by the user.`);
        }
        const updatedPost = this.postRepository.merge(post, updatePostDto);
        await this.postRepository.save(updatedPost);
        return updatedPost;
    }
    findAll() {
        return `This action returns all post`;
    }
    async findOne(id) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID "${id}" not found.`);
        }
        return post;
    }
    update(id, updatePostDto) {
        return `This action updates a #${id} post`;
    }
    remove(id) {
        return `This action removes a #${id} post`;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map