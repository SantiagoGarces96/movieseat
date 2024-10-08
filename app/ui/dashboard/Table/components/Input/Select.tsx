"use client";
import useParams from "@/app/hooks/useParams";
import { ChangeEvent, useEffect, useState } from "react";

const options = [5, 10, 15, 20];

export default function TableSelectInput() {
  const { getParam, updateParam, deleteParam } = useParams();
  const [value, setValue] = useState(5);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      updateParam("limit", value);
    } else {
      deleteParam("limit");
    }
  };

  useEffect(() => {
    const limit = getParam("limit");
    if (limit) {
      const closest = options.reduce((prev, curr) =>
        Math.abs(curr - parseInt(limit)) < Math.abs(prev - parseInt(limit))
          ? curr
          : prev,
      );
      setValue(closest);
    }
  }, [getParam]);

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
