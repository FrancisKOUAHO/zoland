import Link from "next/link";

const Page = () => {
    return (
        <div>
            <h1>Picker personnage</h1>

            <Link href={`/launch/loading/1`}>
                Jouer
            </Link>
        </div>
    )
}

export default Page;