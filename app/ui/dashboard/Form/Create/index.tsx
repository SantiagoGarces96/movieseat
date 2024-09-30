import { ISessionFormInput } from "@/interfaces/session";
import FormInput from "../components/FormInput";

export default function CreateForm({
  title,
  inputData,
}: {
  title: string;
  inputData: ISessionFormInput[];
}) {
  return (
    <dialog id="modal_create" className="modal">
      <div className="modal-box !max-w-full lg:w-1/2">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">{title}</h3>
        <form className="grid grid-cols-12 gap-4 py-4">
          {inputData.map((input, index) => (
            <FormInput
              key={title + "_form" + index}
              {...input}
              autofocus={index === 0 ? true : false}
            />
          ))}
          <div className="col-span-12 grid">
            <div className="flex w-full items-center justify-center gap-4 lg:justify-end">
              <button
                className="btn btn-secondary btn-sm text-primary"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
