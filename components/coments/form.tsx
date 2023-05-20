import { createCommentApi, getCommentByRecipe } from "@/API/comment/action";
import { useAppDispatch } from "@/store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormValues {
  comment: string;
}

function CommentSendForm({
  userId,
  recipeId,
}: {
  userId: string | undefined | null;
  recipeId: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (userId)
      dispatch(
        createCommentApi({
          user: userId,
          receipt: recipeId,
          comment: data.comment,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(
            getCommentByRecipe({
              recipeID: recipeId,
            })
          );
          reset();
        });
    else navigate.push("/auth");
  };

  return (
    <form className="main_form" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="დატოვეთ შეტყობინება"
        {...register("comment", { required: userId ? true : false })}
      />
      <button type="submit">
        {userId ? "დამატება" : "ავტორიზაციის გავლა"}
      </button>
    </form>
  );
}

export default CommentSendForm;
