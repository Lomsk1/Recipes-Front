import MainSideBar from "@/components/sidebar/main";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="main_layout">
      <MainSideBar />
      {children}
    </section>
  );
}
