"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ISessionFormInput } from "@/interfaces/session";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );
  const [value, setValue] = useState<string>(currentValue?.toString() || "");

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setValue(value);
    if (type === "select") {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      replace(`${pathname}?${params.toString()}`);
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
