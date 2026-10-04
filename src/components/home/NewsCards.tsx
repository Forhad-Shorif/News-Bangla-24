import Image from 'next/image';
import Link from 'next/link';

interface NewsCardsProps {
    imageUrl: string;
    imageAlt: string;
    category: string;
    title: string;
    description: string;
    id: string;
}

const NewsCards = ({ Elements }: { Elements: NewsCardsProps }) => {

    if (!Elements) return null;

    return (
        <Link href={`/details/${Elements.id}`} className="block group my-3">
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-red-100">
                
                {/* Image Section */}
                {Elements.imageUrl && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                        <Image
                            src={Elements.imageUrl}
                            alt={Elements.imageAlt || Elements.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    </div>
                )}

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold text-red-600 bg-red-50 mb-1.5">
                            {Elements.category}
                        </span>

                        <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 leading-snug line-clamp-2">
                            {Elements.title}
                        </h3>

                        {Elements.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                {Elements.description}
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default NewsCards;