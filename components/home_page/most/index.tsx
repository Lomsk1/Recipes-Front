import Image from "next/image";
import Link from "next/link";

interface PropsTypes {
  sectionTitle: string;
  mostRecipes: {
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

function TheMostRecipes({ mostRecipes, sectionTitle }: PropsTypes) {
  const options: any = { month: "numeric", day: "numeric", year: "numeric" };

  return (
    <div className="the_most_recipes">
      <header>
        <h2>{sectionTitle && sectionTitle}</h2>
      </header>
      <main>
        {mostRecipes &&
          mostRecipes.status === "success" &&
          mostRecipes.data.map((data) => (
            <Link
              href={`/all-receipts/${data._id}`}
              className="box"
              key={data._id}
            >
              <div className="image">
                <Image
                  src={data.image && data.image.url}
                  alt={data.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className="title">
                <p>{data.name && data.name}</p>
              </div>
              <div className="date">
                <p>
                  {data.createdAt &&
                    new Date(data.createdAt).toLocaleDateString(
                      "ka-GE",
                      options
                    )}
                </p>
              </div>
            </Link>
          ))}
      </main>
    </div>
  );
}

export default TheMostRecipes;
