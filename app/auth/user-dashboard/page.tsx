"use server";

import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  return result;
}

async function UserDashboardPage() {
  const data = await getData();

  if (!data.ok) {
    return (
      <>
        <p style={{ color: "white" }}>Data not fetch</p>
      </>
    );
  }

  return (
    <>
      <p style={{ color: "white" }}>Dashboard content</p>
    </>
  );
}

export default UserDashboardPage;
