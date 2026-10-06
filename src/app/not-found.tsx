import Image from 'next/image';
import Link from "next/link" // নেক্সট জেএস-এর লিঙ্ক কম্পোনেন্ট ইমপোর্ট করুন
import logo from "@/assets/error-404.png";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-5">
            {/* 404 Image */}
            <Image 
                src={logo}
                alt="404 Page Not Found" 
                width={400} 
                height={400}
                className="w-full max-w-sm h-auto object-contain"
                priority // ইমেজের ফাস্ট লোডিং নিশ্চিত করতে
            />

            {/* Content & Action Button */}
            <div className="space-y-3">
                <h2 className="text-2xl font-bold text-base-content">
                    Oops! Page Not Found
                </h2>
                <p className="text-base-content/70 max-w-md mx-auto text-sm md:text-base">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                
                {/* DaisyUI Button */}
                <div className="pt-2">
                    <Link href="/" className="btn btn-primary px-6">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;