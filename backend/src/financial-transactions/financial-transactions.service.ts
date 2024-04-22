import { Injectable } from "@nestjs/common";
import { CreateFinancialTransactionDto } from "./dto/create-financial-transaction.dto";
import { UpdateFinancialTransactionDto } from "./dto/update-financial-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FinancialTransaction } from "./entities/financial-transaction.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Charity } from "src/charities/entities/charity.entity";

@Injectable()
export class FinancialTransactionsService {
  constructor(
    @InjectRepository(FinancialTransaction)
    private readonly financialTransactionRepository: Repository<FinancialTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Charity)
    private readonly charityRepository: Repository<Charity>
  ) {}

  async create(
    amount: number,
    currency: string,
    user_id: number,
    charity_id:number,
  ): Promise<FinancialTransaction> {

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const charity = await this.charityRepository.findOne({
      where: { id: charity_id },
    });

    if (!user || !charity) {
      throw new Error("User/Charity not found");
    }

    charity.donations += amount;
    await this.charityRepository.save(charity);

    const newFinancialTransaction = this.financialTransactionRepository.create({
      user,
      amount,
      currency,
      date: new Date(),
      charity_id,
    });

    await this.financialTransactionRepository.save(newFinancialTransaction);
    return newFinancialTransaction;
  }

  async getTransactionsByUserId(
    user_id: number
  ): Promise<FinancialTransaction[]> {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error("User not found");
    }
    return this.financialTransactionRepository.find({ where: { user: user } });
  }

  findAll() {
    return `This action returns all financialTransactions`;
  }

  async save(charityPayment: FinancialTransaction): Promise<FinancialTransaction> {
    try {
      return await this.financialTransactionRepository.save(charityPayment);
    } catch (error) {
      console.error("Failed to save charity payment:", error);
      throw new Error("Database operation failed.");
    }
  }
  
  findOne(id: number) {
    return `This action returns a #${id} financialTransaction`;
  }

  update(
    id: number,
    updateFinancialTransactionDto: UpdateFinancialTransactionDto
  ) {
    return `This action updates a #${id} financialTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialTransaction`;
  }
}
