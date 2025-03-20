import { MasterRecordStatusEnum, WebsiteDisplayStatus } from "@prisma/client";
import { ZodType, z } from "zod";

export class ProductValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(250),
        slug: z.string().min(1).max(250),
        // subCategory_id: z.number(),
        eCatalogURL: z.string().min(1).max(250),
        remarks: z.string().min(1).max(250),
        iStatus: z.nativeEnum(MasterRecordStatusEnum),
        iShowedStatus: z.nativeEnum(WebsiteDisplayStatus),
        // product_id: z.number()

    });

}