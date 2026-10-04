import Link from 'next/link';

interface Category {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}

const FetchData = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const Data = await res.json();

    if (!Data.data) {
        return [];
    }
    return Data.data;
}

const NavLink = async () => {

    const Items: Category[] = await FetchData();
    const FilterNews = Items.filter((item: Category) => item.scrapable === true);

    return (
        <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-3 w-full py-2">
          
            <Link
                href="/"
                className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            >
                হোম
            </Link>

            {FilterNews.map((item: Category, index: number) => (
                <Link
                    key={index}
                    href={`/category/${item.slug}`}
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default NavLink;