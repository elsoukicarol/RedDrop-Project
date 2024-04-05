import { Test, TestingModule } from '@nestjs/testing';
import { FinancialTransactionsController } from './financial-transactions.controller';
import { FinancialTransactionsService } from './financial-transactions.service';

describe('FinancialTransactionsController', () => {
  let controller: FinancialTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialTransactionsController],
      providers: [FinancialTransactionsService],
    }).compile();

    controller = module.get<FinancialTransactionsController>(FinancialTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
