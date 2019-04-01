import { Module } from '@nestjs/common';
import { MaxController } from './max.controller';
import { MaxService } from './max.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MaxSchema } from '../db/schemas/MaxSchema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Max',
			schema: MaxSchema
		}])
	],
	controllers: [MaxController],
	providers: [MaxService],
	exports: [MaxService]
})
export class MaxModule {}