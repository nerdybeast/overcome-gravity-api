/**
 * The expected environment variables that come from `process.env`.
 * NOTE: Environment variables are always strings and must be cast into the proper type.
 */
export interface IProcessEnvVariables {
	PORT?: string;
	MONGODB_URI?: string;
	ROLLBAR_ACCESS_TOKEN?: string;
}