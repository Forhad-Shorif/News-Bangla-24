import Image from 'next/image';
import NavLink from '@/components/header/NavLink'
import UserInfo from './UserInfo';

const Header = () => {

    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    // console.log(date);

    return (
        <header className="sticky top-[-140px] z-100 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 md:gap-4">

                {/* Left Side Spacer (Keeps the middle section centered) */}
                <div className="w-1/4 hidden md:block"></div>

                {/* Center Side Logo */}
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 w-full md:w-2/4 group cursor-pointer min-w-0">
                    <div className="relative shrink-0 overflow-hidden rounded-xl p-1 bg-gradient-to-tr from-red-500 to-orange-400 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-red-500/20">
                        <Image
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg bg-white p-0.5"
                            width={50}
                            height={50}
                            src="/logo.webp"
                            alt="logo"
                        />
                    </div>
                    <div className="text-left leading-tight truncate">
                        <h1 className="text-base sm:text-xl md:text-2xl text-red-500 font-black tracking-tight transition-colors truncate">
                            Bangla News <span> 24</span>
                        </h1>
                        <p className="text-[10px] sm:text-xs font-medium text-gray-500 tracking-wide truncate">
                            {date}
                        </p>
                    </div>
                </div>

                {/* Sing Buttons */}
               <UserInfo/>

            </div>

            <NavLink />

        </header>
    );
};

export default Header;