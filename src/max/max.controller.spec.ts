import { Test, TestingModule } from '@nestjs/testing';
import { MaxController } from './max.controller';
import { MaxService } from './max.service';

describe('Max Controller', () => {

	class mockMaxService {}

	let module: TestingModule;

	beforeAll(async () => {
		module = await Test.createTestingModule({
			controllers: [MaxController],
			providers: [{
				provide: MaxService,
				useValue: mockMaxService
			}]
		}).compile();
	});

	it('should be defined', () => {
		const controller: MaxController = module.get<MaxController>(MaxController);
		expect(controller).toBeDefined();
	});
});
