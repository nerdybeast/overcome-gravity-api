import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { SetsService } from '../sets/SetsService';
import { ExerciseService } from './ExerciseService';

describe('ExercisesController', () => {

	class mockExerciseService {}
	class mockSetsService {}

	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			providers: [
				{
					provide: SetsService,
					useValue: mockSetsService
				}, {
					provide: ExerciseService,
					useValue: mockExerciseService
				}
			],
			controllers: [ExercisesController],
		}).compile();
	});

	it('should be defined', () => {
		const controller: ExercisesController = module.get<ExercisesController>(ExercisesController);
		expect(controller).toBeDefined();
	});
});
