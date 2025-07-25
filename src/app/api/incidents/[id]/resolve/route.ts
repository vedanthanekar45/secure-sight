import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type PatchParameters = {
    params: {
        id: string;
    };
};

export async function PATCH (request: Request, {params}: PatchParameters) {
    try {
        const updatedIncident = await prisma.incident.update({
            where: {
                id: params.id,
            },
            data: {
                resolved: true,
            },
        });

        return NextResponse.json(updatedIncident)
    } catch (error) {
        console.error(`Failed to resolve incident ${params.id}: `, error);
        return new NextResponse(`Internal Server Error`, { status: 500 });
    }
} 