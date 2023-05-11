"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export default function UserProfilePage() {
  const [d, setD] = useState<string[]>([]);
  useEffectOnce(() => {
    fetch("http://127.0.0.1:3000/api/v1/users")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setD(data.data);
      });
  });
  return (
    <>
      {d &&
        d.map((data: any) => (
          <Image
            key={data._id}
            src={`${process.env.NEXT_PUBLIC_DB_HOST}/${data.avatar}`}
            alt={data.avatar}
            width={100}
            height={100}
            style={{ background: "white" }}
          />
        ))}
    </>
  );
}
