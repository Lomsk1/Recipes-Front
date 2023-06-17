import EachReceiptDescription from "@/components/eachReceiptPage/description";
import EachReceiptHeader from "@/components/eachReceiptPage/header";
import { cookies } from "next/headers";

async function getData({ recipeID }: { recipeID: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe/${recipeID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
}
async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  return result.json();
}

export default async function EachReceipt({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData({ recipeID: params.id });

  // console.log(process.env.NEXT_PUBLIC_DB_HOST);

  const userData = await getUserData();
  return (
    <>
      {data.status === "success" && (
        <>
          <EachReceiptHeader
            author={data.data.author}
            name={data.data.name}
            createdAt={data.data.createdAt}
            image={data.data.image}
            _id={data.data._id}
            ratingsAverage={data.data.ratingsAverage}
            ratingsQuantity={data.data.ratingsQuantity}
            review={data.data.review}
            userData={userData.status === "success" ? userData.data : null}
          />
          <EachReceiptDescription
            cookingProcess={data.data.cookingProcess}
            shortDescription={data.data.shortDescription}
            ingredients={data.data.ingredients}
            necessaryIngredients={data.data.necessaryIngredients}
            difficulty={data.data.difficulty}
            nutrition={data.data.nutrition}
            cookingTime={data.data.cookingTime}
            portion={data.data.portion}
            _id={data.data._id}
            userData={userData.status === "success" ? userData.data : null}
          />
        </>
      )}
    </>
  );
}
