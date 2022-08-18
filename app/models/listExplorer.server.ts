import { prisma } from "~/db.server";
import type { BucketListEvent } from "@prisma/client";
import { NavLinkProps } from "react-bootstrap";
export type { BucketListEvent };

export async function getAllEvents(orderByCol: string, searchCol: string | nil, searchTerm: string | nil) {
    const query = {
        orderBy: [
            {
              [orderByCol]: "asc",
            },
          ],
    }

    // if (searchCol && searchTerm) {
    //     query.where = {
    //         [searchCol]: searchTerm,
    //       }
    // }
    return prisma.bucketListEvent.findMany(query);
}

export async function createEvent(event: BucketListEvent) {
    return prisma.bucketListEvent.create({ data: event });
}

export async function getEvent(id: number) {
    return prisma.bucketListEvent.findUnique({ where: { id } })
}

export async function filterColumnByString(column: string, search: string) {
    return prisma.bucketListEvent.findMany({
        where: {
            [column]: search
        }
    })
}

export async function updateEventCompleted(id: number, isCompleted: boolean) {
    return prisma.bucketListEvent.update({
        where: {
            id: id
        },
        data: {
            completed: isCompleted
        }
    })
}