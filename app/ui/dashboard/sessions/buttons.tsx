import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi2";

export function CreateSession() {
  return (
    <Link
      href="/dashboard/sessions/create"
      className="btn btn-secondary btn-sm text-primary"
    >
      Crear sesión
    </Link>
  );
}

export function UpdateSession({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/sessions/${id}`}
      className="btn btn-circle btn-ghost btn-sm"
    >
      <HiOutlinePencil className="h-4 w-4" />
    </Link>
  );
}

// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);

//   return (
//     <form action={deleteInvoiceWithId}>
//       <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
