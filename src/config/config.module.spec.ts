import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { IProcessEnvVariables } from './IProcessEnvVariables';

export async function createMockConfigModule(envVariables: IProcessEnvVariables) : Promise<TestingModule> {

	const mockConfigService = new ConfigService(envVariables);

	const mockConfigProvider = {
		provide: ConfigService,
		useValue: mockConfigService
	};

	const mockConfigModule = await Test.createTestingModule({
		providers: [mockConfigProvider]
	}).compile();

	return mockConfigModule;
}

describe('ConfigModule', () => {

	test('Can create testing module', async () => {

		const mockConfigModule = await createMockConfigModule({
			PORT: '5000',
			MONGODB_URI: 'mongo',
			ROLLBAR_ACCESS_TOKEN: '1q2w3e4r'
		});

		expect(mockConfigModule).toBeTruthy();
	});

});