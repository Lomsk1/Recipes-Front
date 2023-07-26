"use client";

import PopupForm from "@/components/popup/form";
import PopupMiddle from "@/components/popup/middle";
import UserTable from "@/components/table/forUsers";
import Table from "@/components/table/table";
import { UsersTypes, UserTypes } from "@/components/types/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  role: string;
}

async function getUserData() {
  const token = Cookies.get("jwt");
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.json();
}

function UserAdminTable() {
  /* States  */
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [userData, setUserData] = useState<UsersTypes | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [userRoleEditorIsOpen, setUserRoleEditorIsOpen] =
    useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  /* Get User*/
  const getData = async () => {
    setUserData(await getUserData());
  };

  useEffect(() => {
    getData();
    setDomLoaded(true);
  }, []);

  /* Search Functions */
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = Cookies.get("jwt");

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/searchByEmail`,
      {
        email: data.name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (result.status !== 200) {
      setStatusMessage(
        "შეცდომა მოხდა მომხმარებლის ძებნისას, გთხოვთ სცადოთ თავიდან!"
      );
    }

    setUserData(result.data);

    if (result.data.result === 0) {
      setStatusMessage("მომხმარებელი ვერ მოიძებნა");
    }
    reset();
  };

  /* Role Handler */

  const roleHandler = (id: string) => {
    setUserID(id);
    setUserRoleEditorIsOpen(true);
  };

  /* User Change Form Submit */
  const onSubmitUserRoleChange: SubmitHandler<FormValues> = async (data) => {
    const token = Cookies.get("jwt");
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/v1/users/${userID}`,
      {
        role: data.role,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (result.status !== 200) {
      setStatusMessage(
        "შეცდომა მოხდა როლის ცვლილებისას, გთხოვთ სცადოთ თავიდან!"
      );
    }
    if (result.status === 200) {
      setUserRoleEditorIsOpen(false);
      reset();
      getData()
    }
  };

  return (
    <>
      {domLoaded && userData && (
        <>
          {/* With Search */}
          <div className="search_">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="search" {...register("name")} placeholder="" />
              <button type="submit">მოძებნა</button>
            </form>
          </div>

          <div className="table_container">
            {userData?.status === "success" && (
              <UserTable
                header={["სახელი", "გვარი", "იმეილი", "როლი"]}
                data={userData}
                roleHandler={roleHandler}
              />
            )}
          </div>
          {/* Status Response */}
          {statusMessage && (
            <PopupMiddle
              statusResponse={statusMessage}
              buttonFunction={() => {
                setStatusMessage(null);
              }}
              buttonName="დახურვა"
            />
          )}

          {/* User Role Edit */}
          {userRoleEditorIsOpen && (
            <PopupForm
              closeFunction={() => {
                setUserRoleEditorIsOpen(false);
              }}
            >
              <form onSubmit={handleSubmit(onSubmitUserRoleChange)}>
                <select {...register("role")}>
                  <option value="user">მომხმარებელი</option>
                  <option value="editor">ედითორი</option>
                  <option value="admin">ადმინი</option>
                </select>
                <button type="submit">ცვლილება</button>
              </form>
            </PopupForm>
          )}
        </>
      )}
    </>
  );
}

export default UserAdminTable;
