'use client'

import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/config/api";
import React, {FunctionComponent} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";

export interface LoginForm {
    username: string;
    email: string;
    password: string;
}

const Page: FunctionComponent<string> = () => {
    const queryClient = useQueryClient();
    const router: AppRouterInstance = useRouter()


    const registerMutation = useMutation({
        mutationFn: async (loginData: LoginForm) => {
            const {data} = await api.post("/auth/register", loginData);
            console.log('data', data)
            return data;
        },
        onSuccess: () => {
            router.push('auth/login')
        },
    })

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const registerData: LoginForm = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        console.log('registerData', registerData)

        registerMutation.mutate(registerData);
    };
    return (
        <form onSubmit={onSubmit}>
            <h1>Register</h1>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </div>

            <button type="submit">Register</button>

            <Link href="/auth/login">Login</Link>
        </form>
    );
}

export default Page;