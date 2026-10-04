import Image from 'next/image';
import Link from 'next/link';

interface NewsItem {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    id: string;
}

const HomePageNews = ({ News }: { News: NewsItem[] }) => {
    if (!News || News.length === 0) return null;

    const FirstNews: NewsItem = News[0];

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Featured Main News */}
            <div className=" flex">
                <Link 
                    href={`/details/${FirstNews.id}`} 
                    className="group w-full flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex-shrink-0"
                >
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                        <Image
                            src={FirstNews.imageUrl}
                            alt={FirstNews.imageAlt || FirstNews.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            priority
                        />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                        <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold text-red-600 bg-red-50 mb-2">
                                {FirstNews.category}
                            </span>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                                {FirstNews.title}
                            </h2>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                                {FirstNews.description}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Side News List */}
            <div className=" flex flex-col justify-between space-y-3">
                {News.slice(1, 5).map((news: NewsItem) => (
                    <Link 
                        key={news.id} 
                        href={`/details/${news.id}`}
                        className="group flex-1 bg-white border border-gray-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 hover:border-red-100 flex flex-col justify-center"
                    >
                        <span className="text-xs font-semibold text-red-600 mb-1">
                            {news.category}
                        </span>
                        <h3 className="text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                            {news.title}
                        </h3>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default HomePageNews;