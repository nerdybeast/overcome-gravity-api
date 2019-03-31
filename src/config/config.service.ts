import Joi from 'joi';
import { EnvironmentConfig } from 'models/EnvironmentConfig';
import { IProcessEnvVariables } from './IProcessEnvVariables';

export class ConfigService {

	private readonly environmentConfig : EnvironmentConfig;
	public static ValidationErrorPrefix: string = 'Config Validation Error';

	constructor(environmentVariables: IProcessEnvVariables) {
		this.environmentConfig = this.validateEnvConfig(environmentVariables);
	}

	get PORT() : number {
		return this.environmentConfig.PORT;
	}

	get MONGODB_URI() : string {
		return this.environmentConfig.MONGODB_URI;
	}

	get ROLLBAR_ACCESS_TOKEN() : string {
		return this.environmentConfig.ROLLBAR_ACCESS_TOKEN;
	}

	private validateEnvConfig(environmentVariables: IProcessEnvVariables) : EnvironmentConfig {

		const envVarsSchema: Joi.ObjectSchema = Joi.object({
			PORT: Joi.number().required(),
			MONGODB_URI: Joi.string().required(),
			ROLLBAR_ACCESS_TOKEN: Joi.string().required()
		});

		const { error, value: validatedEnvConfig } = Joi.validate<EnvironmentConfig>(environmentVariables as any, envVarsSchema);

		if (error) {
			throw new Error(`${ConfigService.ValidationErrorPrefix}: ${error.message}`);
		}

		return validatedEnvConfig;
	}
}