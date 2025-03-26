import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
// import { v4 as uuid } from 'uuid';
import { SubCategoryResponse, CreateSubCategoryRequest } from 'src/model/subcategory.model';
import { User, Category } from '@prisma/client';
// import { SubCategoryValidation } from './subCategory.validation';
import { SubCategoryValidation } from './subCategory.validation';
import { connect } from 'http2';
// import { SubCategoryValidation } from './subcategory.validation';




@Injectable()
export class SubCategoryService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
    ) {

    }
    //create subCategory
    async create(user: User, request: CreateSubCategoryRequest): Promise<SubCategoryResponse> {

        this.logger.info(`create new subcategory ${JSON.stringify(request)}`);
        // this.logger.info(request.name);
        const createRequest: CreateSubCategoryRequest = this.validationService.validate(SubCategoryValidation.CREATE, request);

        const totalSubCategorywithSameName = await this.prismaService.subCategory.count({
            where: {
                slug: createRequest.slug,
            }
        });

        // this.logger.info(`test`);

        if (totalSubCategorywithSameName != 0) {
            throw new HttpException('subcategory already exits', 401);
        }
        // this.logger.info(`test1`);
        // console.log("test-1")

        const category = await this.prismaService.category.findFirst({
            where: {
                id: createRequest.categoryId
            }
        })
        // this.logger.info(`id sama dengan ${category?.id} dan ${createRequest.imageURL}`);
        // this.logger.info(`test2`);
        // console.log("test-2")

        const subCategory = await this.prismaService.subCategory.create({
            data: {
                ...createRequest,
                ...{ createdBy: user.name, categoryId: category?.id! },
            }
            // include: {
            //     Category: true
            // }
        })
        // this.logger.info(`test3`);
        return {
            name: subCategory.name,
            slug: subCategory.slug ?? '',
            remarks: subCategory.remarks ?? '',
            categoryId: subCategory.categoryId,
            iStatus: subCategory.iStatus,
            iShowedStatus: subCategory.iShowedStatus,
            imageURL: subCategory.imageURL ?? " ",
        }
    }

    async findAll(
        category_id: number,
    ): Promise<SubCategoryResponse[]> {
        console.log(category_id)
        const subCategories = await this.prismaService.subCategory.findMany({
            where: { categoryId: category_id, iShowedStatus: 'SHOW' },
            // include: {
            //     Product: {
            //         select: {
            //             name: true,
            //             slug: true,
            //             eCatalogURL: true,
            //             remarks: true,
            //             iStatus: true,
            //             iShowedStatus: true,
            //             // ProductDesc: true,
            //             // ProductImage: true,

            //         },
            //     },
            // },
        });

        const subcategory = subCategories.map((subcategory) => {
            // const primaryImages = subcategory.images.filter((image) => image.isPrimary);
            // const primaryImageURL =
            //     primaryImages.length > 0 ? primaryImages[0].imageURL : null;
            return {
                ...subcategory,
                // id: subcategory.id,
                // name: subcategory.name.trim(),
                // slug: subcategory.slug?.trim(),
                // catalog_id: product.catalog_id?.trim(),
                // register_id: product.register_id?.trim(),
                // category_id: subcategory.category_id,
                // subCategory_id: product.subCategory_id.trim(),
                // brand_id: product.brand_id.trim(),
                // uom_id: product.uom_id?.trim(),
                // primaryImageURL,
            };
        });

        return subcategory as SubCategoryResponse[];
    }
}
