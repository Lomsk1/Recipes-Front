import Image from "next/image";
import Link from "next/link";
import { IngredientCategoryTypes, UsersTypes, UserTypes } from "../types/types";

function UserTable({
  header,
  data,
  roleHandler,
}: {
  header: any;
  data: UsersTypes;
  roleHandler?: any;
}) {
  return (
    <>
      {data.status === "success" && (
        <>
          {header && data && (
            <table className="table_for_admin">
              <thead>
                <tr>
                  {header.map((data: any, i: number) => (
                    <th key={i}>{data}</th>
                  ))}
                  <th>მოქმედება</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((data) => (
                  <tr key={data._id}>
                    {/* {data._id && <th>{data._id}</th>} */}
                    {data.firstName && <td>{data.firstName}</td>}
                    {data.lastName && <td>{data.lastName}</td>}
                    {data.email && <td>{data.email}</td>}
                    {data.role && <td>{data.role}</td>}

                    {/* Actions */}

                    <td className="actions">
                      <button
                        className="delete"
                        onClick={() => roleHandler(data._id)}
                      >
                        როლი
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
}

export default UserTable;
