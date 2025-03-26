import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { CreateNewsRequest, NewsResponse } from 'src/model/news.model';
import { User } from '@prisma/client';
import { BillboardResponse, CreateBillboardRequest } from 'src/model/billboard.model';
import { BillboardValidation } from './billboard.validation';





@Injectable()
export class BillboardService {
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
    ) {

    }
    //create subCategory
    async create(user: User, request: CreateBillboardRequest): Promise<BillboardResponse> {

        this.logger.info(`create new billboard ${JSON.stringify(request)}`);
        // this.logger.info(request.name);
        const createRequest: CreateBillboardRequest = this.validationService.validate(BillboardValidation.CREATE, request);

        const billboard = await this.prismaService.billboard.create({
            data: {
                ...createRequest,
                ...{ createdBy: user.username },
            }
        })
        var today = new Date;
        return {
            title: createRequest.title,
            contentURL: createRequest.contentURL ?? "",
            description: createRequest.description
        }
    }
}
