import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi2";

function Edit({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/sessions/${id}/edit`}
      className="btn btn-circle btn-ghost btn-sm"
    >
      <HiOutlinePencil className="h-4 w-4" />
    </Link>
  );
}

export default Edit;
