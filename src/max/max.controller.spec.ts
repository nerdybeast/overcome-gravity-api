import { Test, TestingModule } from '@nestjs/testing';
import { MaxController } from './max.controller';

describe('Max Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MaxController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MaxController = module.get<MaxController>(MaxController);
    expect(controller).toBeDefined();
  });
});
