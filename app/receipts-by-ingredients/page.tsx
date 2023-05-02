"use client";

import ChosenInformation from "@/components/byIngredients/chosenInformation";
import MainPageHeader from "@/components/byIngredients/header";
import ReceiptsBox from "@/components/byIngredients/receipts";
import SidebarBurger from "@/components/sidebar/burger";
import MainSideBar from "@/components/sidebar/main";
import ReceptSide from "@/components/sideRecept";
import { setSideReceiptToggle } from "@/redux/client/receipts/slice";
import { setSidebarToggle } from "@/redux/client/sidebar/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function ChooseIngredients() {
  const redux: any = useAppSelector((state) => state.receipt);

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const handleClickOutside = () => {
    dispatch(setSideReceiptToggle(false));
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <main className="main_page">
      {/* Header && NAvigation */}
      <MainPageHeader />

      {/* User Choose Information */}
      <ChosenInformation />

      {/* Receipts */}

      <section className="receipts_container">
        <ReceiptsBox />
        <ReceiptsBox />
        <ReceiptsBox />
        <ReceiptsBox />
      </section>

      {/* Side Detailed Recept */}
      <section
        className="receipt_side_detailed"
        style={{ right: redux.sideReceiptIsOpen ? "0" : "-100%" }}
        ref={ref}
      >
        <ReceptSide />
      </section>
      {/* Burger bar */}
      <SidebarBurger />
    </main>
  );
}
