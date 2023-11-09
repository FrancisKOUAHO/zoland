'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";

const Page = ({params}: { params: { id: string } }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3333/api/v1/room/sse-create-room");

        eventSource.addEventListener("message", (event) => {
            const data = JSON.parse(event.data); // { message: "To the moon!🚀" }
            setMessage(data.message);
        }, false)

        return () => eventSource.close();
    }, [])

    return (
        <div>
            Game: {params.id}

            <h1>invite d'autre utilisateur a rejoindre a partie</h1>

            <div>{message} test</div>

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