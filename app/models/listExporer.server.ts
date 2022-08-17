import { prisma } from "~/db.server";
import type { BucketListEvent } from "@prisma/client";
export type { BucketListEvent };

export async function getAllEvents() {
    return prisma.bucketListEvent.findMany();
}