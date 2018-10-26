import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';

describe('Exercises Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ExercisesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ExercisesController = module.get<ExercisesController>(ExercisesController);
    expect(controller).toBeDefined();
  });
});
