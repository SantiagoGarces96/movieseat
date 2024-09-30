import { ISessionFormInput } from "@/interfaces/session";

export default function FormInput({
  label,
  type,
  options,
  disabled,
  colSpan = 12,
  autofocus,
}: ISessionFormInput) {
  return (
    <label
      className={`form-control col-span-12 grid w-full lg:col-span-${colSpan}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {type === "select" ? (
        <select
          className="select select-bordered select-sm w-full"
          disabled={disabled}
          autoFocus={autofocus}
        >
          <option>Seleccione uno</option>
          {options?.map(({ opt, value }, index) => (
            <option key={opt + index} value={value}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="input input-sm input-bordered w-full"
          disabled={disabled}
          autoFocus={autofocus}
        />
      )}
    </label>
  );
}
