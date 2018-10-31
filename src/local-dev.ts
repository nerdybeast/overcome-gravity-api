/**
 * We are using dotenv when developing locally to populate process.env with the values from our .env file.
 * Heroku automatically does this when we deploy so dotenv is not needed in that case which is why it's been
 * added to this project as a dev dependency.
 */
import dotenv from 'dotenv';
dotenv.config();

import './main';