import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ExerciseService } from './ExerciseService';
import { Exercise } from '../models/Exercise';

describe('ExerciseService', () => {

	let _saveResult;
	//let _findResult;

	class ExerciseModelMock {
		async save() {
			return _saveResult;
		}
		// static async find() {
		// 	return {
		// 		exec: () => Promise.resolve(_findResult)
		// 	};
		// }
	}

	let exerciseService: ExerciseService;
	//let exerciseModelMock: ExerciseModelMock;

	beforeEach(async () => {

		const exerciseModelToken = getModelToken('Exercise');

		const testModule = await Test.createTestingModule({
			providers: [
				ExerciseService, 
				{
					provide: exerciseModelToken,
					useValue: ExerciseModelMock
				}
			]
		}).compile();

		exerciseService = testModule.get<ExerciseService>(ExerciseService);
		// exerciseModelMock = testModule.get<ExerciseModelMock>(exerciseModelToken);
	});

	test('create - happy path', async () => {

		const mockExercise = new Exercise();
		mockExercise.clientId = 'sdfsdfsdfsdf';

		_saveResult = {
			id: '123',
			clientId: mockExercise.clientId
		};

		const result = await exerciseService.create(mockExercise);

		expect(result.id).toBe('123');
		expect(result.clientId).toBe(mockExercise.clientId);
	});

	// test('findByWorkout - happy path', async () => {

	// 	_findResult = [{
	// 		id: '123',
	// 		clientId: 'abc'
	// 	}];

	// 	const results: Exercise[] = await exerciseService.findByWorkout('123');

	// 	expect(results).toHaveLength(1);
	// 	expect(results[0].id).toBe('123');
	// });
});
