import { Injectable, InternalServerErrorException } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });
  }

  async getChatResponse(prompt: string): Promise<string> {
    const domainSpecificPrompt = `
      Please answer the following question with a focus on blood donation, donation centers, and related topics:
      ${prompt}
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: domainSpecificPrompt }],
        max_tokens: 150,
      });

      const answer = response.choices[0].message.content.trim();
      console.log("Received answer:", answer);

      // Check if the response is related to blood donation, health, and donation centers
      if (this.isRelatedToDomain(answer, prompt)) {
        return answer;
      } else {
        console.log("Unrelated question detected.");
        return "This question is unrelated to blood donation, health, or donation and charity centers.";
      }
    } catch (error) {
      console.error("Error in getChatResponse:", error);
      throw new InternalServerErrorException(
        "Failed to get response from OpenAI"
      );
    }
  }

  // Method to check if the response is related to the domain
  private isRelatedToDomain(answer: string, prompt: string): boolean {
    const keywords = [
      "blood donation",
      "health",
      "donation center",
      "charity",
      "donation",
      "blood bank",
      "donor",
      "transfusion",
      "clinic",
      "hospital",
    ];

    const answerIncludesKeyword = keywords.some((keyword) =>
      answer.toLowerCase().includes(keyword)
    );
    const promptIncludesKeyword = keywords.some((keyword) =>
      prompt.toLowerCase().includes(keyword)
    );

    console.log("Checking if response is related to the domain:");
    console.log("Answer includes keyword:", answerIncludesKeyword);
    console.log("Prompt includes keyword:", promptIncludesKeyword);

    return answerIncludesKeyword || promptIncludesKeyword;
  }
}
