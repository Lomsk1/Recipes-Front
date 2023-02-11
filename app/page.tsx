import HomeIntroduce from "@/components/home_page/introduce";

export const metadata = {
  title: "Receptor",
  description: "In this site, you can find all kind of recipes.",
};

export default function Home() {
  return (
    <main>
      <HomeIntroduce />
    </main>
  );
}
