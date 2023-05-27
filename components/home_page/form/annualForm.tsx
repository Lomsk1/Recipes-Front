"use client";

import { getRecipesAnnuallyStats } from "@/API/receipt/action";
import { useAppDispatch } from "@/store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  year: string;
};

function AnnualStatsForm() {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) =>
    dispatch(
      getRecipesAnnuallyStats({
        year: data.year,
      })
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("year")}>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
      <button type="submit">არჩევა</button>
    </form>
  );
}

export default AnnualStatsForm;
