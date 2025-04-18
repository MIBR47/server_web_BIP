import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';


@Module({
    // imports: [],
    controllers: [NewsController],
    providers: [NewsService],
    // exports: []
})
export class NewsModule { }