"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const options = [5, 10, 15, 20];

export default function TableSelectInput() {
  const [value, setValue] = useState(5);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      params.set("limit", value);
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const limit = params.get("limit");
    if (limit) {
      const closest = options.reduce((prev, curr) =>
        Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
          ? curr
          : prev,
      );
      setValue(closest);
    }
  }, [params, replace, pathname]);

  return (
    <select
      className="select select-bordered select-sm w-full max-w-44"
      onChange={handleSelect}
      value={value}
    >
      {options.map((opt, index) => (
        <option key={"option_" + opt + "_" + index}>{opt}</option>
      ))}
    </select>
  );
}
