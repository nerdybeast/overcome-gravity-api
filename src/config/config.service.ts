export class ConfigService {

	private readonly envVars: { [key: string]: string };

	constructor() {
		this.envVars = process.env;
	}

	get(key: string) {
		return this.envVars[key];
	}
}