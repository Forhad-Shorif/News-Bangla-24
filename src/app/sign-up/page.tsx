'use client'

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';


const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        });

        if (error) {
            console.log("Error:", error);
            return;
        }

        if (data) {
            router.push("/");
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data);
    }

    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
        console.log(data);
    }

    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <form className="bg-base-200 border border-base-300 rounded-xl p-6 space-y-4 shadow-sm" onSubmit={onSubmit}>

                <div>
                    <label className="label text-sm font-medium">Name</label>
                    <input
                        name="name"
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter Your Name"
                        required
                    />
                </div>

                <div>
                    <label className="label text-sm font-medium">Image URL (Optional)</label>
                    <input
                        name="image"
                        type="url"
                        className="input input-bordered w-full"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label className="label text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        required
                    />
                </div>

                <div>
                    <label className="label text-sm font-medium">Password</label>
                    <input
                        name="password"
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Sign Up
                </button>

            </form>

            <button onClick={handleGoogleSignIn} className="btn btn-neutral bg-red-700 text-shadow-white mt-4">Google Sign</button>
            <button onClick={handleGithubSignIn} className="btn btn-neutral bg-red-700 text-shadow-white mt-4">Github Sign</button>

        </div>
    );
};

export default SignUpPage;