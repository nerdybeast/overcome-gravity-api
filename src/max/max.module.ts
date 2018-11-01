import { Module } from '@nestjs/common';
import { MaxController } from './max.controller';
import { MaxService } from './max.service';
import { DatabaseModule } from '../db/DatabaseModule';

@Module({
	imports: [DatabaseModule],
	controllers: [MaxController],
	providers: [MaxService],
	exports: [MaxService]
})
export class MaxModule {}