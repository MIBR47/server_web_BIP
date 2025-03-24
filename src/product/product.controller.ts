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
import { CreateProductRequest, ProductDescRequest, ProductDescResponse, ProductImageRequest, ProductImageResponse, ProductResponse } from 'src/model/product.model';
import { webResponse } from 'src/model/web.model';
import * as request from 'supertest';

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
    @Post('/createDescProduct')
    @HttpCode(200)
    async createDescProduct(@Auth() user: User, @Body() request: ProductDescRequest): Promise<webResponse<ProductDescResponse>> {
        const result = await this.productService.createDesc(user, request);

        return {
            data: result
        };
    }

    @Post('/createImageProduct')
    @HttpCode(200)
    async createImageProduct(@Auth() user: User, @Body() request: ProductImageRequest): Promise<webResponse<ProductImageResponse>> {
        const result = await this.productService.createImage(user, request);

        return {
            data: result
        };
    }


}
