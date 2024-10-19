import { IFormInputData } from "@/interfaces/Form";
import Delete from "./Buttons/Delete";
import Edit from "./Buttons/Edit";

function Body({
  body,
  currentPage,
  limit,
  deleteAction,
  editInputData,
}: {
  body: { [key: string]: string }[];
  currentPage: number;
  limit: number;
  editInputData: IFormInputData[];
  deleteAction: (id: string) => Promise<{
    success: boolean;
  }>;
}) {
  return (
    <tbody>
      {body.map((data, index) => (
        <tr key={"element" + index}>
          {Object.entries(data).map(([key, value]) => {
            return key === "_id" ? (
              <th key={Math.random()}>
                {(currentPage - 1) * limit + index + 1}
              </th>
            ) : (
              <th key={Math.random()}>{value}</th>
            );
          })}
          <th className="flex items-center justify-center">
            <Delete id={data._id} action={deleteAction} />
            <Edit id={data._id} inputData={editInputData} />
          </th>
        </tr>
      ))}
    </tbody>
  );
}

export default Body;
