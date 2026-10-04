import Image from 'next/image';

interface NewsItem {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
}

const HomePageNews = ({ News }: { News: NewsItem[] }) => {
    const FirstNews: NewsItem = News[0];
    // console.log(FirstNews);
    return (
        <div className= "flex md:flex-row flex-col gap-2">
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <Image
                        src={FirstNews.imageUrl}
                        alt={FirstNews.imageAlt}
                        width={600}
                        height={400}
                    />
                </figure>
                <div className="card-body">
                    <p className="text-semibold text-red-500">{FirstNews.category}</p>
                    <h2 className="card-title">{FirstNews.title}</h2>
                    <p>{FirstNews.description}</p>
                </div>
            </div>
            <div className="grid gap-2">
                {News.slice(1, 5).map((news: NewsItem, index: number) =>
                    <div key={index} className="card bg-base-100 border border-gray-300 py-5 px-2 shadow-sm">
                        <p className="text-semibold text-red-500">{news.category}</p>
                        <div>
                            {news.title}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePageNews;