import { Controller, Post, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async getChatResponse(@Body('query') query: string): Promise<{ response: string }> {
    if (!query || typeof query !== 'string') {
      throw new BadRequestException('Invalid query provided');
    }
    try {
      const response = await this.chatService.getChatResponse(query);
      return { response };
    } catch (error) {
      console.error('Error in getChatResponse:', error); // Log the error
      throw new InternalServerErrorException('Error processing request');
    }
  }
}
