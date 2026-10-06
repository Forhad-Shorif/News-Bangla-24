'use client'

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const UserInfo = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user);

    return (
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 w-1/4 shrink-0">

            {
                user ?
                    (
                        <div className="sm:flex-col sm:items-center justify-center  sm:gap-2">

                            <Link href="/profile">
                                <div className="avatar">
                                    <div className="mask mask-hexagon-2 w-24">
                                        <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
                                    </div>
                                </div>
                            </Link>
                            <h2 className=" flex text-sm font-semibold text-gray-500 tracking-wide truncate">
                            {user?.name}
                            </h2>
                           
                        </div>
                    )
                    :
                    (
                        <div>

                            <Link href="/sign-up">
                                <button className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all duration-200 whitespace-nowrap">
                                    সাইন আপ
                                </button>
                            </Link>
                            <Link href="/sign-in">
                                <button className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 transition-all duration-200 whitespace-nowrap">
                                    সাইন ইন
                                </button>
                            </Link>


                        </div>
                    )
            }
        </div>
    );
};

export default UserInfo;
