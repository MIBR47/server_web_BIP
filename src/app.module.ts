import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [CommonModule, UserModule, CategoryModule, SubCategoryModule, ProductModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
