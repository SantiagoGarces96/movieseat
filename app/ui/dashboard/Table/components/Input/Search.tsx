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

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("tableQuery", value);
        setValue(value);
      } else {
        params.delete("tableQuery");
        setValue("");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  return (
    <label className="input input-sm input-bordered flex items-center gap-2">
      <input type="text" placeholder="Type here" onChange={handleSearch} />
      {!!value && <HiMiniXMark className="cursor-pointer" />}
    </label>
  );
}
