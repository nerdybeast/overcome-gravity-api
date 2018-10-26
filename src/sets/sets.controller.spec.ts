import { Test, TestingModule } from '@nestjs/testing';
import { SetsController } from './sets.controller';

describe('Sets Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SetsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SetsController = module.get<SetsController>(SetsController);
    expect(controller).toBeDefined();
  });
});
