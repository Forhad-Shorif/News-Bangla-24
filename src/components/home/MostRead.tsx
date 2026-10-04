import Link from "next/link";

const FetchData = async () => {
    try {
        const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read', {
            next: { revalidate: 20 } 
        });
        const Data = await res.json();

        if (!Data.data) {
            return [];
        }
        return Data.data;
    } catch (error) {
        console.error("Error fetching most read news:", error);
        return [];
    }
}

interface NewsItem {
    title: string;
    id: string;
}

const MostRead = async () => {
    const MostReadNews: NewsItem[] = await FetchData();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">

            {/* Title */}
            <div className="flex items-center gap-2.5 border-b-2 border-red-600 pb-3 mb-4">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse inline-block" />
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    সর্বাধিক পঠিত
                </h2>
            </div>

            {/* News List */}
            <div className="divide-y divide-gray-100">
                {MostReadNews.map((item: NewsItem, index: number) => (
                    <Link 
                        key={item.id || index} 
                        href={`/details/${item.id}`}
                        className="group flex items-start gap-4 py-3.5 first:pt-1 last:pb-1 transition-all duration-200"
                    >
                        {/* News Rank */}
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 font-bold text-lg group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                            {index + 1}
                        </span>

                        {/* News Title */}
                        <h3 className="text-base font-medium text-gray-800 group-hover:text-red-600 leading-snug line-clamp-2 transition-colors duration-200 flex-1">
                            {item.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MostRead;