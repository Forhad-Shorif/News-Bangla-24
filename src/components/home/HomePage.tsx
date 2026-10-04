import MostRead from '@/components/home/MostRead';
import HomePageNews from '@/components/home/HomePageNews';
import NewsCards from './NewsCards';
const FetchData = async () => {
    const response = await fetch('https://news-api-v2.vercel.app/api/news/sections');
    const data = await response.json();

    if (!data.data) {
        return [];
    }
    return data.data;
}

interface NewsCardsProps {
    imageUrl: string;
    imageAlt: string;
    category: string;
    title: string;
    description: string;
    id: string;
}

interface Section {
    curationId: string;
    title: string;
    articles: NewsCardsProps[];
}

const HomePage = async () => {

    const Section = await FetchData();
    const MainSection = Section[0].articles;
    // console.log(MainSection);

    const otherSections = Section.slice(1);
    // console.log(otherSections);

    return (
        <div className=" grid md:grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto py-1 gap-2 px-4 sm:px-6 lg:px-8 ">

            {/* Home page left side News*/}
            <div className="col-span-2 p-2">

                {/* Home page left-left side With Image News*/}
                <div>
                    <HomePageNews News={MainSection} />
                </div>

                {/* Home page left-right side Main News*/}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {otherSections.map((section: Section) =>
                        <div className=' border-red-700' key={section.curationId}>
                            <h1 className='font-bold border-b-2 pb-1'>{section.title}</h1>
                            {section.articles.map((element: NewsCardsProps, index: number) =>
                                <NewsCards key={index} Elements={element}
                                />)}
                        </div>
                    )}
                </div>
            </div>

            {/* Home page right side Most Read News*/}
            <div className=" col-span-1 p-2">
                <MostRead />
            </div>
        </div>
    );
};

export default HomePage;