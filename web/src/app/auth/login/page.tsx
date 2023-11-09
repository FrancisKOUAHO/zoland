'use client'

import Link from "next/link";
import React, {FunctionComponent} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/config/api";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

export interface LoginForm {
    email: string;
    password: string;
}

const Page: FunctionComponent<LoginForm> = () => {
    const queryClient = useQueryClient();
    const router: AppRouterInstance = useRouter()

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginForm) => {
            const {data} = await api.post("/auth/login", loginData);
            console.log('data', data)
            return data;
        },
        onSuccess: (data) => {
            router.push('/')
        },
    })

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const loginData: LoginForm = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        console.log('loginData', loginData)

        loginMutation.mutate(loginData);
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Login</h1>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"/>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </div>

            <button type="submit">login</button>

            <Link href="/auth/register">Register</Link>
        </form>
    );
}

export default Page;