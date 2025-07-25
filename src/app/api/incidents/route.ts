import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET (request: Request) {

    const { searchParams } = new URL(request.url)
    const resolvedParam = searchParams.get('resolved')

    const whereClause = resolvedParam === 'false' ? { resolved: false } : {};

    try {
        const incidents = await prisma.incident.findMany({
            where: whereClause,
            include: {
                camera: true,
            },
            orderBy: {
                tsStart: 'desc'
            },
        });
        return NextResponse.json(incidents);
    } catch (error) {
        console.error('Failed to fetch incidents: ', error)
        return NextResponse.json('Internal Server Error', {status: 500})
    }

}


/* THIS IS A TEST TO CHECK IF THE DATABASE URL IN ENV IS BEING ACCESSED OR NOT  --> */

// export async function GET() {
//     console.log('DATABASE URL FROM SERVER: ', process.env.DATABASE_URL)

//     return NextResponse.json({
//         message: "Checking for Database URL...",
//         databaseUrlIsPresent: !!process.env.DATABASE_URL,
//         first15Chars: process.env.DATABASE_URL?.substring(0, 15) || 'NOT FOUND',
//     });
// }