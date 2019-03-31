import { createMockConfigModule } from './config.module.spec';
import { TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {

	describe('Creating ConfigService instance', () => {

		test('Validates environment variables correctly', async () => {

			const environmentVariables = {
				PORT: '5000',
				MONGODB_URI: 'mongodb://tony:stark@mlab.com',
				ROLLBAR_ACCESS_TOKEN: '1qa2ws3ed4rf5tg'
			};

			const mockConfigModule: TestingModule = await createMockConfigModule(environmentVariables);
			const configService = mockConfigModule.get<ConfigService>(ConfigService);

			expect(configService.PORT).toBe(Number(environmentVariables.PORT));
			expect(configService.MONGODB_URI).toBe(environmentVariables.MONGODB_URI);
			expect(configService.ROLLBAR_ACCESS_TOKEN).toBe(environmentVariables.ROLLBAR_ACCESS_TOKEN);
		});

		test('Validates PORT is a number', async () => {

			const environmentVariables = {
				PORT: 'ABCD',
				MONGODB_URI: 'mongodb://tony:stark@mlab.com',
				ROLLBAR_ACCESS_TOKEN: '1qa2ws3ed4rf5tg'
			};

			try{
				await createMockConfigModule(environmentVariables);
				throw new Error();
			} catch(error) {
				expect(error.message).toMatch('PORT');
			}

		});

		test('Validates environment variables are required', async () => {
			try {
				await createMockConfigModule({});
				throw new Error();
			} catch(error) {
				expect(error.message).toMatch('required');
			}
		});
	})

});