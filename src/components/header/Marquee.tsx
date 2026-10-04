import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface NewsItem {
    title: string;
    id: string;
}

const FetchData = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const Data = await res.json();

    if (!Data.data) {
        return [];
    }
    return Data.data;
}

const Marquee = async () => {
    const Items: NewsItem[] = await FetchData();

    return (
        <div className=" sticky top-0 z-10 bg-red-600 text-white shadow-md">
            <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 items-center justify-between gap-2 md:gap-4">
                <div className="bg-red-700 py-1 px-5 font-semibold shrink-0">
                    সর্বশেষ
                </div>
                <MarqueeText className="py-1" direction="right" duration={10}>
                    {Items.map((item: NewsItem, index: number) => (
                        <Link 
                            key={item.id || index} 
                            href={`/details/${item.id}`} 
                            className="inline-flex items-center hover:underline"
                        >
                            <span>{item.title}</span>
                            <span className="mx-5 select-none">•</span>
                        </Link>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;