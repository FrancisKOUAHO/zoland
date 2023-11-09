'use client'

import {FunctionComponent, useState} from "react";
import useGameLists from "@/hooks/useGameLists";
import Link from "next/link";

const Home: FunctionComponent = () => {

    const { data: games } = useGameLists()

    if (!games) return <div>no data...</div>

    return (
        <div>
            <h1>TEST</h1>
            <Link href="/auth/login">Connexion</Link>

            <h2>Game Lists</h2>
            <ul>
                {games.map((game:any) => (
                    <li key={game.id}>
                        <Link href={`game/${game.id}`}>
                            {game.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;
