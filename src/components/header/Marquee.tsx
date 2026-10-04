import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css";


interface NewsItem {
    title: string;
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
    // console.log(Items);

    return (
        <div className="sticky top-33 z-40 bg-red-600 text-white shadow-md ">

            <div className="flex max-width-7x1 mx-auto px-4 sm:px-6 lg:px-8 h-10 items-center justify-between gap-2 md:gap-4">
                <div className="bg-red-700 py-1 px-5">
                    সর্বশেষ
                </div>
                <MarqueeText className="py-1" direction="right" duration={10}>
                    {Items.map((item: NewsItem, index: number) => <span key={index}>
                        <span>{item.title}</span>
                        <span className="mx-5">•</span>
                    </span>

                    )}
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marquee;