"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ISessionFormInput } from "@/interfaces/session";
import useParams from "@/app/hooks/useParams";

export default function FormInput({
  label,
  name = "",
  type = "text",
  options,
  disabled = false,
  autofocus = false,
  currentValue = "",
  required = false,
}: ISessionFormInput) {
  const { updateParam, deleteParam } = useParams();
  const [value, setValue] = useState<string>(currentValue?.toString() || "");

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setValue(value);
    if (type === "select") {
      if (value) {
        updateParam(name, value);
      } else {
        deleteParam(name);
      }
    }
  };

  useEffect(() => {
    setValue(currentValue?.toString() || "");
  }, [currentValue]);

  return (
    <label className={`form-control col-span-12 grid w-full lg:col-span-6`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {type === "select" ? (
        <select
          className="select select-bordered select-sm w-full"
          disabled={disabled}
          autoFocus={autofocus}
          value={value}
          onChange={handleChange}
          name={name}
          required={disabled ? false : required}
        >
          <option></option>
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
          value={value || ""}
          onChange={handleChange}
          name={name}
          required={disabled ? false : required}
        />
      )}
    </label>
  );
}
