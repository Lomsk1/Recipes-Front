import Image from "next/image";
import Link from "next/link";

interface PropsTypes {
  sectionTitle: string;
  recipe: {
    status: string;
    data: {
      image: {
        public_id: string;
        url: string;
      };
      name: string;
      shortDescription: string;
      createdAt: Date;
      _id: string;
    }[];
  };
}

function ClassifiedProducts({ sectionTitle, recipe }: PropsTypes) {
  const options: any = { month: "numeric", day: "numeric", year: "numeric" };
  return (
    <div className="classified_products">
      <header>
        <h2>{sectionTitle && sectionTitle}</h2>
      </header>
      <main>
        {recipe &&
          recipe.status === "success" &&
          recipe.data.map((data) => (
            <Link
              href={`/all-receipts/${data._id}`}
              className="box"
              key={data._id}
            >
              {/* Image */}
              <div className="image">
                <Image
                  src={data.image && data.image.url}
                  alt={data.name}
                  width={50}
                  height={50}
                />
              </div>
              {/* Information */}
              <article>
                <h3>{data.name && data.name}</h3>
                <p>{data.shortDescription && data.shortDescription}</p>
                <span>
                  {data.createdAt &&
                    new Date(data.createdAt).toLocaleDateString(
                      "ka-GE",
                      options
                    )}
                </span>
              </article>
            </Link>
          ))}
      </main>
    </div>
  );
}

export default ClassifiedProducts;
