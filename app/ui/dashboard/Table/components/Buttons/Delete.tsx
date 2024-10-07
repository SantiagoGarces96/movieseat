import { HiOutlineTrash } from "react-icons/hi2";

function Delete({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ message: string }>;
}) {
  const deleteAction = action.bind(null, id);
  return (
    <form action={deleteAction}>
      <button type="submit" className="btn btn-circle btn-ghost btn-sm">
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </form>
  );
}

export default Delete;
