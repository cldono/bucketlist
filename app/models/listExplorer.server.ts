import { prisma } from "~/db.server";
import type { BucketListEvent } from "@prisma/client";
export type { BucketListEvent };

export async function getAllEvents(orderByCol: string, order: string) {
    return prisma.bucketListEvent.findMany({
        orderBy: [
            {
              [orderByCol]: order,
            },
          ],
    });
}

export async function createEvent(event) {
    return prisma.bucketListEvent.create({ data: event });
}

export async function getEvent(id: number) {
    return prisma.bucketListEvent.findUnique({ where: { id } })
}