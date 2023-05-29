import { useAppDispatch } from "@/store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import searchIcon from "../../../assets/icons/search-white.png";
import { getRecipeBySlug } from "@/API/receipt/action";

type FormValues = {
  slug: string;
};

function FirstPageSearchForm() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    dispatch(getRecipeBySlug({ slug: data.slug }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search_all_recipe"></label>
      <input
        type="search"
        id="search_all_recipe"
        placeholder="შეიყვანეთ რეცეპტის სახელი"
        {...register("slug")}
      />
      <button type="submit">
        <Image src={searchIcon} alt="search" width={25} height={25} />
      </button>
    </form>
  );
}

export default FirstPageSearchForm;
