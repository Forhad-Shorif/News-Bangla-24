import NewsCards from '@/components/home/NewsCards';
interface Category {
    params: Promise<{ id: string }>
}

interface NewsCardsProps {
    imageUrl: string;
    imageAlt: string;
    category: string;
    title: string;
    description: string;
    id: string;
}



const CatagoryPage = async ({ params }: Category) => {

    const { id } = await params;

    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`);
    const Data = await res.json();
    const FilterNews = Data.data

    // console.log(FilterNews)

    return (
        <div className=' max-w-7xl mx-auto py-1 gap-2 px-4 sm:px-6 lg:px-8 '>
            <h1 className='font-semibold text-2xl text-red-500 mb-5 border-b-2'>{Data.title}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                  {FilterNews.map((item:NewsCardsProps , index:number) => (
                    <NewsCards key={index} Elements={item} />
                  ))}
            </div>

        </div>
    );
};

export default CatagoryPage;