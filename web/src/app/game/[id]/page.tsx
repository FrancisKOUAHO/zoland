'use client'

import Link from "next/link";

const Page = ({params}: { params: { id: string } }) => {

    return (
        <div>
            Game: {params.id}

            <Link href={`/room/${params.id}`}>
                Lancer la partie
            </Link>

        </div>
    )
}

export default Page;