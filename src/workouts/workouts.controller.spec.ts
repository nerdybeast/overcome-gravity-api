import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';
import { WorkoutService } from './WorkoutService';
import { ExerciseService } from '../exercises/ExerciseService';
import { SetsService } from '../sets/SetsService';
import { MaxService } from '../max/max.service';

describe('WorkoutsController', () => {

	class mockWorkoutService {}
	class mockExerciseService {}
	class mockSetsService {}
	class mockMaxService {}

	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			controllers: [WorkoutsController],
			providers: [{
				provide: WorkoutService,
				useValue: mockWorkoutService
			}, {
				provide: ExerciseService,
				useValue: mockExerciseService
			}, {
				provide: SetsService,
				useValue: mockSetsService
			}, {
				provide: MaxService,
				useValue: mockMaxService
			}]
		}).compile();
	});

	it('should be defined', () => {
		const controller: WorkoutsController = module.get<WorkoutsController>(WorkoutsController);
		expect(controller).toBeDefined();
	});
});
