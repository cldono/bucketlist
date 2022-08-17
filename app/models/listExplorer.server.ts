import { prisma } from "~/db.server";
import type { BucketListEvent } from "@prisma/client";
export type { BucketListEvent };

export async function getAllEvents() {
    return prisma.bucketListEvent.findMany();
}

export async function createEvent(event) {
    return prisma.bucketListEvent.create({ data: event });
}

export async function getEvent(id: number) {
    return prisma.bucketListEvent.findUnique({ where: { id } })
}