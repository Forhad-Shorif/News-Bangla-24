'use client'
import React from 'react';
import { authClient } from '@/lib/auth-client';

const SignInPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();


        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/"
        });
        if (error) {
            console.log("Error:", error);
            return;
        }

        if (data) {
            console.log("Data:", data);
            return;
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
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
            <h2 className="text-3xl font-bold text-center">Sign In</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name='password' type="password" className="input" placeholder="Password" />

                    <button className="btn btn-neutral bg-blue-600 text-shadow-white mt-4">Sign In</button>

                </fieldset>
            </form>

            <button onClick={handleGoogleSignIn} className="btn btn-neutral bg-red-700 text-shadow-white mt-4">Google Sign</button>
            <button onClick={handleGithubSignIn} className="btn btn-neutral bg-red-700 text-shadow-white mt-4">Github Sign</button>
        </div>
    );
};

export default SignInPage;