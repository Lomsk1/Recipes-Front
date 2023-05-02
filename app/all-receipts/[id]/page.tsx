import EachReceiptDescription from "@/components/eachReceiptPage/description";
import EachReceiptHeader from "@/components/eachReceiptPage/header";

export default function EachReceipt({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <EachReceiptHeader />
      <EachReceiptDescription />
    </>
  );
}
