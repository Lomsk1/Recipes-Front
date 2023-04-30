import ChosenInformation from "@/components/main-page/choosenInformation";
import MainPageHeader from "@/components/main-page/header";
import ReceiptsBox from "@/components/main-page/receipts";
import ReceptSide from "@/components/sideRecept";

export default function ChooseIngredients() {
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
      <section className="receipt_side_detailed">
        {/* <ReceptSide /> */}
      </section>
    </main>
  );
}
