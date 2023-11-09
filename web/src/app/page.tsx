'use client'

import {
    JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal,
    useState
} from "react";
import Link from "next/link";

import useGameLists from "@/hooks/useGameLists";

const Home = () => {
    const [message, setMessage] = useState("");

    const {data: games, status, error, isFetching} = useGameLists()

    if (!games) return <div>no data...</div>;

    /* useEffect(() => {
         const eventSource = new EventSource("http://localhost:3333/api/v1/sse");

         eventSource.addEventListener("message", (event) => {
             const data = JSON.parse(event.data); // { message: "To the moon!🚀" }
             setMessage(data.message);
         }, false)

         return () => eventSource.close();
     }, [])*/

    return (
        <div>
            <h1>TEST</h1>
            <div>{message}</div>
            <Link href="/auth/login">Connexion</Link>

            <h2>Game Lists</h2>
            <ul>
                {games.map((game: {
                    id: Key | null | undefined;
                    title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined;
                }) => (
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
