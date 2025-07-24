/* The seeding function is used to populate the 
database with sample data.*/ 

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const hoursAgo = (hours: number) => {
    const date = new Date();
    date.setHours(date.getHours() - hours);
    return date;
}

try {
    // Deleting already existing data
    await prisma.incident.deleteMany()
    await prisma.camera.deleteMany()

    await prisma.camera.createMany({
        data: [
            { id: 'cam1', name: "Cashier", location: "Entrance"},
            { id: 'cam2', name: "Counter 1", location: "Ground Floor"},
            { id: 'cam3', name: "Counter 2", location: "First Floor"}
        ],
    })

    const cameras = await prisma.camera.findMany()

    await prisma.incident.createMany({
        data: [
            { cameraid: cameras[0].id, type: 'Face Recognised', tsStart: hoursAgo(23), tsEnd: hoursAgo(22.9), thumbnailUrl: '/images/thumb1.jpg', resolved: true },
            { cameraid: cameras[2].id, type: 'Suspicious Activity', tsStart: hoursAgo(20), tsEnd: hoursAgo(19.9), thumbnailUrl: '/images/thumb2.jpg' },
            { cameraid: cameras[1].id, type: 'Unauthorised Access', tsStart: hoursAgo(18), tsEnd: hoursAgo(17.9), thumbnailUrl: '/images/thumb3.jpg' },
            { cameraid: cameras[2].id, type: 'Face Recognised', tsStart: hoursAgo(15), tsEnd: hoursAgo(14.9), thumbnailUrl: '/images/thumb4.jpg' },
            { cameraid: cameras[0].id, type: 'Suspicious Activity', tsStart: hoursAgo(12), tsEnd: hoursAgo(11.9), thumbnailUrl: '/images/thumb5.jpg' },
            { cameraid: cameras[1].id, type: 'Gun Threat', tsStart: hoursAgo(10), tsEnd: hoursAgo(9.9), thumbnailUrl: '/images/thumb6.jpg' },
            { cameraid: cameras[0].id, type: 'Unauthorised Access', tsStart: hoursAgo(8), tsEnd: hoursAgo(7.9), thumbnailUrl: '/images/thumb7.jpg' },
            { cameraid: cameras[2].id, type: 'Suspicious Activity', tsStart: hoursAgo(6), tsEnd: hoursAgo(5.9), thumbnailUrl: '/images/thumb8.jpg' },
            { cameraid: cameras[1].id, type: 'Face Recognised', tsStart: hoursAgo(4), tsEnd: hoursAgo(3.9), thumbnailUrl: '/images/thumb9.jpg', resolved: true },
            { cameraid: cameras[0].id, type: 'Suspicious Activity', tsStart: hoursAgo(3), tsEnd: hoursAgo(2.9), thumbnailUrl: '/images/thumb10.jpg' },
            { cameraid: cameras[2].id, type: 'Unauthorised Access', tsStart: hoursAgo(2), tsEnd: hoursAgo(1.9), thumbnailUrl: '/images/thumb11.jpg' },
            { cameraid: cameras[1].id, type: 'Gun Threat', tsStart: hoursAgo(1), tsEnd: hoursAgo(0.9), thumbnailUrl: '/images/thumb12.jpg' },
        ]
    })
} catch (e) {
    console.error(e)
    process.exit(1)
} finally {
    await prisma.$disconnect();
}