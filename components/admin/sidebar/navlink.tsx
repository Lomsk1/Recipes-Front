import NavLink from "@/components/navLink";

function AdminNavLink({ userID }: { userID: string }) {
  return (
    <>
      <NavLink
        navLinks={[
          { href: `/auth/adminpanel/${userID}`, name: "მიმოხილვა" },
          {
            href: `/auth/adminpanel/${userID}/ingredient-category`,
            name: "ინგრედიენტის კატეგორია",
          },
          {
            href: `/auth/adminpanel/${userID}/ingredients`,
            name: "ინგრედიენტები",
          },
          {
            href: `/auth/adminpanel/${userID}/recipe-category`,
            name: "რეცეპტის კატეგორია",
          },
          { href: `/auth/adminpanel/${userID}/recipes`, name: "რეცეპტები" },
          { href: `/auth/adminpanel/${userID}/users`, name: "მომხმარებლები" },
        ]}
      />
    </>
  );
}

export default AdminNavLink;
