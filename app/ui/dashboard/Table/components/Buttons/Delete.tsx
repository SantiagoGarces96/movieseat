import { HiOutlineTrash } from "react-icons/hi2";

function Delete({ id }: { id: string }) {
  return (
    <form>
      <button type="submit" className="btn btn-circle btn-ghost btn-sm">
        <HiOutlineTrash className="h-4 w-4" />
      </button>
    </form>
  );
}

export default Delete;
