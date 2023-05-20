import RecipeCommentSection from "../coments";
import { RecipeTypes } from "../types/types";

interface RecipeProps
  extends Omit<
    RecipeTypes,
    "recipeCategory" | "author" | "createdAt" | "image"  | "name" | ""
  > {
  userData:{
    _id: string
  } | null
}

function EachRecipeDescription({
  shortDescription,
  ingredients,
  cookingProcess,
  necessaryIngredients,
  difficulty,
  nutrition,
  cookingTime,
  portion,
  _id,
  userData
}: RecipeProps) {
  return (
    <>
      <section className="each_receipt_description">
        <div className="description">
          {/* Short Description */}
          <div className="_short">
            <h5>მოკლე აღწერა:</h5>
            <hr />
            <p>{shortDescription && shortDescription}</p>
          </div>
          {/* Ingredients */}
          <div className="ingredients">
            <h5>ინგრედიენტები:</h5>
            <hr />
            <ul>
              {necessaryIngredients &&
                necessaryIngredients.length > 0 &&
                necessaryIngredients.map(
                  (data: { _id: string; name: string }) => (
                    <li key={data._id}>{data.name}</li>
                  )
                )}
              {necessaryIngredients &&
                necessaryIngredients.length === 0 &&
                ingredients.map((data: { _id: string; name: string }) => (
                  <li key={data._id}>{data.name}</li>
                ))}
            </ul>
          </div>
          {/* Making Process */}
          <div className="making_process">
            <h5>მომზადების პროცედურა:</h5>
            <hr />
            {/* Steps */}
            {cookingProcess &&
              cookingProcess.map(
                (data: { _id: string; description: string; step: number }) => (
                  <div className="step" key={data._id}>
                    <h4>ნაბიჯი {data.step}</h4>
                    <p>{data.description}</p>
                  </div>
                )
              )}
          </div>

          {/* Section */}
          <div className="comment">
            <RecipeCommentSection recipeId={_id} userData={userData}/>
          </div>
        </div>

        <aside className="right_side">
          {/* Table */}
          <div className="for_sticky">
            <table>
              <thead>
                <tr>
                  <th>დონე</th>
                  <th>მომზადების დრო</th>
                  <th>პორცია</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{difficulty && difficulty}</td>
                  <td>{cookingTime && cookingTime}</td>
                  <td>{portion && portion}</td>
                </tr>
              </tbody>
            </table>

            {/* Nutrition */}
            <div className="nutrition">
              <h3>საკვები შემადგენლობა:</h3>
              <ul>
                {nutrition && nutrition.length > 0 ? (
                  nutrition.map(
                    (data: { _id: string; name: string; weight: number }) => (
                      <li key={data._id}>
                        <p>{data.name}</p>
                        <span>{data.weight} გ</span>
                      </li>
                    )
                  )
                ) : (
                  <li>
                    <p>ინფორმაცია ვერ მოიძებნა</p>
                    <span>404</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

export default EachRecipeDescription;
