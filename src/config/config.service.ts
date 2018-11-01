import Joi from 'joi';
import { EnvironmentConfig } from 'models/EnvironmentConfig';

export class ConfigService {

	private readonly environmentConfig : EnvironmentConfig;

	constructor(environmentVariables) {
		this.environmentConfig = this.validateEnvConfig(environmentVariables);
	}

	get PORT() : number {
		return this.environmentConfig.PORT;
	}

	get MONGODB_URI() : string {
		return this.environmentConfig.MONGODB_URI;
	}

	private validateEnvConfig(env: any) : EnvironmentConfig {

		const envVarsSchema: Joi.ObjectSchema = Joi.object({
			PORT: Joi.number().required(),
			MONGODB_URI: Joi.string().required()
		});

		const { error, value: validatedEnvConfig } = Joi.validate<EnvironmentConfig>(env, envVarsSchema);

		if (error) {
			throw new Error(`Config validation error: ${error.message}`);
		}

		return validatedEnvConfig;
	}
}