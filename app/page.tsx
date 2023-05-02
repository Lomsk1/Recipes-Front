import HomeIntroduce from "@/components/home_page/introduce";
import { Noto_Sans_Georgian } from "@next/font/google";

export const metadata = {
  title: "Receptor",
  description: "In this site, you can find all kind of recipes.",
};

const noto = Noto_Sans_Georgian({
  variable: "--font-georgia",
  weight: ["300", "500", "700", "900"],
  subsets: ["georgian"],
});

export default function Home() {
  return (
    <main className={noto.variable}>
        <HomeIntroduce />
    </main>
  );
}
