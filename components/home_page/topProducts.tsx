import ClassifiedProducts from "../classifiedProducts";
import TheMostRecipes from "./most";

interface RecipeTypes {
  recentRecipeData: {
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
  favoriteRecipeData: {
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

function TopProducts({ recentRecipeData, favoriteRecipeData }: RecipeTypes) {
  return (
    <>
      <section className="top_products_section">
        <aside className="left_">
          {recentRecipeData.status === "success" ? (
            <ClassifiedProducts
              recipe={recentRecipeData}
              sectionTitle="უახლესი რეცეპტები"
            />
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}

          {recentRecipeData.status === "success" ? (
            <ClassifiedProducts
              recipe={favoriteRecipeData}
              sectionTitle="ფავორიტი რეცეპტები"
            />
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </aside>
        <aside className="right_">
          <TheMostRecipes
            sectionTitle="ყველაზე ნახვადი"
            mostRecipes={favoriteRecipeData}
          />
        </aside>
      </section>
    </>
  );
}

export default TopProducts;
