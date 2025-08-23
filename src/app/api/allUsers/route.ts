import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    const session = await getAuthSession();

    if(!session?.user){
        return new Response("Unauthorized", {status: 401});
    }

    try {
        const allUsers = await db.user.findMany({
            where: {
                email: {
                    not: session.user.email 
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })
        return NextResponse.json(
            allUsers,
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {error: "failed to fetch all users"},
            {status: 500}
        );
    }
}