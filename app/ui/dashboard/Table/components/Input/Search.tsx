"use client";
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiMiniXMark } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";

export default function TableSearchInput() {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      params.set("tableQuery", value);
    } else {
      params.delete("tableQuery");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    handleSearch(value);
  };

  const handleClearInput = () => {
    params.delete("tableQuery");
    setValue("");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="input input-sm input-bordered flex items-center gap-2">
      <input
        type="text"
        placeholder="Nombre de la pelicula"
        onChange={handleChange}
        value={value}
      />
      {!!value && (
        <HiMiniXMark className="cursor-pointer" onClick={handleClearInput} />
      )}
    </label>
  );
}
