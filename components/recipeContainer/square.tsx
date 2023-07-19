import Link from "next/link";
import Image from "next/image";

interface RecipeTypes {
  id?: string;
  imageUrl?: string;
  name?: string;
  difficulty?: string;
  cookingTime?: string;
}

function RecipeContainerSquare({
  id,
  imageUrl,
  name,
  cookingTime,
  difficulty,
}: RecipeTypes) {
  return (
    <Link href={`/all-receipts/${id}`} className="recipe_container_square">
      <div className="image">
        <Image src={imageUrl ? imageUrl : ''} alt="recipe" width={500} height={500} />
      </div>
      <div className="title">
        <p>{name && name}</p>
      </div>
      <div className="otherInfo">
        <div>
          <p>მომზადების დრო:</p>
          <p> {cookingTime && cookingTime}</p>
        </div>
        <div>
          <p>სირთულე:</p>
          <p> {difficulty && difficulty}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeContainerSquare;
