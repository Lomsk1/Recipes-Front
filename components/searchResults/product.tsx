import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

interface ReduxTypes {
  slugRecipeIsLoading: boolean;
  slugRecipe: {
    data: {
      _id: string;
      image: {
        url: string;
      };
      name: string;
    }[];
    status: string;
    result: number;
  };
}

function SearchProductBox() {
  let { slugRecipeIsLoading, slugRecipe }: ReduxTypes = useAppSelector(
    (state) => state.recipeAPI
  );
  return (
    <>
      {!slugRecipeIsLoading &&
        slugRecipe.status === "success" &&
        slugRecipe.data.map((data) => (
          <Link
            href={`/all-receipts/${data._id}`}
            className="search_product_result"
            key={data._id}
          >
            <div className="image">
              <Image
                src={data.image && data.image.url}
                alt={data.name && data.name}
                width={50}
                height={50}
              />
            </div>
            <div className="title">
              <p>{data.name && data.name}</p>
            </div>
          </Link>
        ))}
    </>
  );
}

export default SearchProductBox;
