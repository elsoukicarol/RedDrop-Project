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
    createFinancialTransactionDto: CreateFinancialTransactionDto,
    user_id: number
  ): Promise<FinancialTransaction> {
    const { amount, charity_id } = createFinancialTransactionDto;

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
