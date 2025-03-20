import { HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { CreateProductRequest, ProductResponse } from 'src/model/product.model';
import { Logger } from 'winston';
import { ProductValidation } from './product.validation';


@Injectable()
export class ProductService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
    ) {

    }
    //create product
    async create(user: User, request: CreateProductRequest): Promise<ProductResponse> {

        this.logger.info(`create new product ${JSON.stringify(request)}`);
        // this.logger.info(request.name);

        const createRequest: CreateProductRequest = this.validationService.validate(ProductValidation.CREATE, request);

        const totalproductwithSameName = await this.prismaService.product.count({
            where: {
                slug: createRequest.slug,
            }
        });

        if (totalproductwithSameName != 0) {
            throw new HttpException('product already exits', 401);
        }

        const product = await this.prismaService.product.create({
            data: {
                ...createRequest,
                ...{ createdBy: user.name }
            }
        })

        return {
            name: product.name,
            slug: product.slug ?? '',
            remarks: product.remarks ?? '',
            iStatus: product.iStatus,
            iShowedStatus: product.iShowedStatus,
            subCategory_id: product.subCategory_id,
        }
    }
}
