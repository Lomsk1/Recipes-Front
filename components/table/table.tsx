import Image from "next/image";
import Link from "next/link";
import { IngredientCategoryTypes } from "../types/types";

interface DataTypes {
  _id?: string;
  name?: string;
  author?: {
    avatar: {
      public_id: string;
      url: string;
    };
    firstName?: string;
    _id?: string;
    lastName?: string;
    createdAt?: Date;
  };
}

function Table({
  header,
  data,
  deleteHandler,
  changeHandler,
}: {
  header: any;
  data: DataTypes[];
  deleteHandler: any;
  changeHandler?: any;
}) {
  return (
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
            {data.map((data) => (
              <tr key={data._id}>
                {/* {data._id && <th>{data._id}</th>} */}
                {data.name && <td>{data.name}</td>}
                {data.author && (
                  <td>
                    {data.author.firstName} {data.author.lastName}
                  </td>
                )}
                {header.includes("ლინკი") && (
                  <td>
                    <Link href={`/all-receipts/${data._id}`}>ლინკი</Link>
                  </td>
                )}

                {/* Actions */}
                {/* <TableActions
                  deleteHandler={deleteHandler(data._id)}
                  changeHandler={changeHandler}
                /> */}
                <td className="actions">
                  <button
                    className="delete"
                    onClick={() => deleteHandler(data._id)}
                  >
                    წაშლა
                  </button>
                  {changeHandler && (
                    <button
                      className="change"
                      onClick={() => changeHandler(data._id)}
                    >
                      ცვლილება
                    </button>
                  )}
                  {/* <button
                    className="change"
                    onClick={() => changeHandler(data._id)}
                  >
                    ცვლილება
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
