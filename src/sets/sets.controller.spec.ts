import { Test, TestingModule } from '@nestjs/testing';
import { SetsController } from './sets.controller';
import { SetsService } from './SetsService';

describe('Sets Controller', () => {

	class mockSetsService {}

	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			controllers: [SetsController],
			providers: [{
				provide: SetsService,
				useValue: mockSetsService
			}]
		}).compile();
	});

	it('should be defined', () => {
		const controller: SetsController = module.get<SetsController>(SetsController);
		expect(controller).toBeDefined();
	});
});
