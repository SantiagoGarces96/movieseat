import Delete from "./Buttons/Delete";
import Edit from "./Buttons/Edit";

function Element({
  data,
  dataIndex,
}: {
  data: { [key: string]: string };
  dataIndex: number;
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
        <Delete id={id} />
        <Edit id={id} />
      </th>
    </tr>
  );
}

function Body({
  body,
  currentPage,
  limit,
}: {
  body: { [key: string]: string }[];
  currentPage: number;
  limit: number;
}) {
  return (
    <tbody>
      {body.map((data, index) => (
        <Element
          key={"element" + index}
          data={data}
          dataIndex={(currentPage - 1) * limit + index + 1}
        />
      ))}
    </tbody>
  );
}

export default Body;
