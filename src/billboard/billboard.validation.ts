import { WebsiteDisplayStatus } from "@prisma/client";
import { ZodType, z } from "zod";

export class BillboardValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(50),
        description: z.string().min(1).max(250),
        contentURL: z.string().url().min(1).max(50),
        // content_id: z.string(),
    });
}