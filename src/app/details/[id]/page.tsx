import Image from 'next/image';

interface Category {
    params: Promise<{ id: string }>
}

export interface DescriptionTextBlock {
    model?: {
        text?: string;
        blocks?: Array<{
            model?: {
                text?: string;
            };
        }>;
    };
}

export interface ArticleDescription {
    blocks?: DescriptionTextBlock[];
}

export interface NewsBodyItem {
    type?: string;
    url?: string;
    caption?: string;
    alt?: string;
    text?: string;
    heading?: string;
}

export interface NewsTopic {
    id?: string;
    name: string;
    slug?: string;
}

export interface ArticleDetails {
    id: string;
    title: string;
    description?: ArticleDescription | string;
    byline?: Array<{ name: string; role?: string | null }>;
    lastPublished?: string;
    wordCount?: number;
    body: NewsBodyItem[];
    topics?: NewsTopic[];
}

const NewsDetails = async ({ params }: Category) => {
    const { id } = await params;

    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`, {
        next: { revalidate: 60 }
    });
    const Data = await res.json();
    const Details: ArticleDetails = Data?.data;

    if (!Details) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">
                সংবাদটি পাওয়া যায়নি।
            </div>
        );
    }

    const formattedDate = Details?.lastPublished 
        ? new Date(Details.lastPublished).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    return (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white rounded-2xl shadow-xs border border-gray-100 my-6">

            {/* Top Header Section */}
            <header className="border-b border-gray-100 pb-6 mb-8 space-y-4">
                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight sm:leading-snug">
                    {Details?.title}
                </h1>

                {/* Subtitle */}
                {Details?.description && (
                    <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed border-l-4 border-red-600 pl-4 py-1 bg-red-50/50 rounded-r-lg">
                        {typeof Details.description === 'string'
                            ? Details.description
                            : Details.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text || 
                              Details.description?.blocks?.[0]?.model?.text
                        }
                    </p>
                )}

                {/* Author, Date, Word Count */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-500 pt-2">
                    {Details?.byline?.[0]?.name && (
                        <div className="flex items-center gap-1.5 font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                            <span>✍️</span>
                            <span>{Details.byline[0].name}</span>
                        </div>
                    )}

                    {formattedDate && (
                        <div className="flex items-center gap-1">
                            <span>📅</span>
                            <span>{formattedDate}</span>
                        </div>
                    )}

                    {Details?.wordCount && (
                        <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200/60">
                            <span>📖</span>
                            <span>{Details.wordCount} শব্দ</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Dynamic Body Content Section */}
            <div className="space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed">
                {Details?.body?.map((item: NewsBodyItem, index: number) => {
                    
                    if (item.url) {
                        return (
                            <figure key={index} className="my-8 space-y-2">
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                                    <Image
                                        src={item.url}
                                        fill
                                        alt={item.caption || item.alt || Details.title}
                                        sizes="(max-width: 896px) 100vw, 896px"
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                                {item.caption && (
                                    <figcaption className="text-xs sm:text-sm text-gray-500 italic text-center px-2">
                                        📷 {item.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    }

                    if (item.type === 'heading' || item.heading) {
                        return (
                            <h2 key={index} className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">
                                {item.text || item.heading}
                            </h2>
                        );
                    }

                    if (item.text) {
                        return (
                            <p key={index} className="text-gray-800 leading-relaxed font-normal">
                                {item.text}
                            </p>
                        );
                    }

                    return null;
                })}
            </div>

            {/* Bottom Section */}
            {Details?.topics && Details.topics.length > 0 && (
                <footer className="mt-12 pt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        সম্পর্কিত বিষয়াবলী:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {Details.topics.map((topic: NewsTopic, index: number) => (
                            <span 
                                key={topic.id || index}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer border border-gray-200/50"
                            >
                                #{topic.name}
                            </span>
                        ))}
                    </div>
                </footer>
            )}

        </article>
    );
};

export default NewsDetails;