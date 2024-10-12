import Delete from "./Buttons/Delete";
import Edit from "./Buttons/Edit";

function Element({
  data,
  dataIndex,
  deleteAction,
}: {
  data: { [key: string]: string };
  dataIndex: number;
  deleteAction: (id: string) => Promise<{
    success: boolean;
  }>;
}) {
  const id = data._id;
  return (
    <tr>
      {Object.entries(data).map(([key, value], index) => {
        return key === "_id" ? (
          <th key={value + index}>{dataIndex}</th>
        ) : (
          <th key={value + index}>{value}</th>
        );
      })}
      <th className="flex items-center justify-center">
        <Delete id={id} action={deleteAction} />
        <Edit id={id} />
      </th>
    </tr>
  );
}

function Body({
  body,
  currentPage,
  limit,
  handle,
}: {
  body: { [key: string]: string }[];
  currentPage: number;
  limit: number;
  handle: (id: string) => Promise<{
    success: boolean;
  }>;
}) {
  return (
    <tbody>
      {body.map((data, index) => (
        <Element
          key={"element" + index}
          data={data}
          dataIndex={(currentPage - 1) * limit + index + 1}
          deleteAction={handle}
        />
      ))}
    </tbody>
  );
}

export default Body;
