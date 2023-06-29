interface DataTypes {
  _id: string;
  name: string;
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
  changeHandler: any;
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
                  <button
                    className="change"
                    onClick={() => changeHandler(data._id)}
                  >
                    ცვლილება
                  </button>
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
