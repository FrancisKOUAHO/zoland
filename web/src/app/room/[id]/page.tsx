'use client'

import React from "react";
import Link from "next/link";

const Page = ({params}: { params: { id: string } }) => {

    return (
        <div>
            Game: {params.id}

            <h1>invite d'autre utilisateur a rejoindre a partie</h1>

            <form>
                <label htmlFor="code">code</label>
                <input type="text" id="code" name="code"/>
                <Link href={`/launch/picker/1`}>
                    rejoindre
                </Link>
            </form>
        </div>
    )
}

export default Page;