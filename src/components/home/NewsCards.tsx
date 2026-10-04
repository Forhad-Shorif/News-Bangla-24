import Image from 'next/image';

interface NewsCardsProps {
    imageUrl: string;
    imageAlt: string;
    category: string;
    title: string;
    description: string;
}

const NewsCards = ({Elements}:{Elements:NewsCardsProps}) => {
    console.log(Elements)
    return (
         <div className="card bg-base-100 mt-3 shadow-sm">
                       <figure>
                           <Image
                               src={Elements.imageUrl}
                               alt={Elements.imageAlt}
                               width={600}
                               height={400}
                           />
                       </figure>
                       <div className="card-body">
                           <p className="text-semibold text-red-500">{Elements.category}</p>
                           <h2 className="card-title">{Elements.title}</h2>
                           <p>{Elements.description}</p>
                       </div>
                   </div>
    );
};

export default NewsCards;