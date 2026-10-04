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
        <div className=" grid md:grid-cols-3 grid-cols-1 max-w-7xl mx-auto py-1 gap-2 px-4 sm:px-6 lg:px-8 ">
            <div className="col-span-2 p-2">
                <HomePageNews News={MainSection} />
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
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
            <div className=" col-span-1 p-2">
            <MostRead/>
            </div>
        </div>
    );
};

export default HomePage;