import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';

describe('Workouts Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WorkoutsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WorkoutsController = module.get<WorkoutsController>(WorkoutsController);
    expect(controller).toBeDefined();
  });
});
