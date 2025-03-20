import { MasterRecordStatusEnum, WebsiteDisplayStatus } from "@prisma/client";


export class ProductResponse {
    name: string;
    slug: string;
    eCatalogURL?: string;
    remarks?: string;
    iStatus: MasterRecordStatusEnum;
    iShowedStatus: WebsiteDisplayStatus;
    subCategory_id: number;
    // ProductDesc: ProductDesc[]

}

// export class ProductDesc {
//     descriptions: string;
//     productSpec: string;
//     benefits: string;


// }

export class CreateProductRequest {
    name: string;
    slug: string;
    eCatalogURL?: string;
    remarks?: string;
    iStatus: MasterRecordStatusEnum;
    iShowedStatus: WebsiteDisplayStatus;
    subCategory_id: number;
    // createdBy: string;
    // createdAt?: Date;

}




