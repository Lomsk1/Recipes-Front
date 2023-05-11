import EachReceiptDescription from "@/components/eachReceiptPage/description";
import EachReceiptHeader from "@/components/eachReceiptPage/header";

async function getData({ id }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/recipe/${id}`,
    { next: { revalidate: 10 } }
  );

  // Recommendation: handle errors
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function EachReceipt({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData({
    id: params.id,
  });
  console.log(data);

  return (
    <>
      {data.status === "success" && (
        <>
          <EachReceiptHeader
            author={data.data.author}
            name={data.data.name}
            createdAt={data.data.createdAt}
            image={data.data.image}
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
          />
        </>
      )}
    </>
  );
}
