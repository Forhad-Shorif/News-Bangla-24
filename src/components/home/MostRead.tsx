const FetchData = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
    const Data = await res.json();

    if (!Data.data) {
        return [];
    }
    return Data.data;
}

interface NewsItem {
    title: string;
}

const MostRead = async () => {
    const MostReadNews: NewsItem[] = await FetchData();
    console.log(MostReadNews);
    return (
        <div>
            <h1 className="text-red-600 font-semibold">Most Read</h1>
            <div>
                {MostReadNews.map((item: NewsItem, index: number) =>
                    <div key={index} className=" flex bg-base-100 mt-2 gap-2 shadow-sm px-1 py-1">
                        <p className="font-semibold text-[20px] text-red-500 ">{index + 1}</p>
                        <h2 className="text-lg">{item.title}</h2>
                    </div>)}
            </div>
        </div>
    );
};

export default MostRead;