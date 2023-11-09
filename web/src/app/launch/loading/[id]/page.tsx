'use client'
import {useEffect} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

const Page = () => {
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log('ecoute')
            router.push('/launch/start/1')
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [router]);


    return (
        <div>
            <h1>Loading</h1>
        </div>
    )
}

export default Page;