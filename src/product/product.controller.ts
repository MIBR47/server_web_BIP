import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import { CreateProductRequest, ProductResponse } from 'src/model/product.model';
import { webResponse } from 'src/model/web.model';

@Controller('/api/product')
export class ProductController {
    constructor(private productService: ProductService) { }


    @Post('/create')
    @HttpCode(200)
    async create(@Auth() user: User, @Body() request: CreateProductRequest): Promise<webResponse<ProductResponse>> {
        const result = await this.productService.create(user, request);

        return {
            data: result
        };
    }


}
