"use client";
import { ChangeEvent, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";
import useParams from "@/app/hooks/useParams";

interface ResultSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  tooltipText: string;
}

export default function ResultSearch({
  tooltipText,
  ...rest
}: ResultSearchProps) {
  const { updateParam, deleteParam } = useParams();
  const [value, setValue] = useState("");

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      updateParam("tableQuery", value);
    } else {
      deleteParam("tableQuery");
    }
  }, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    handleSearch(value);
  };

  const handleClearInput = () => {
    deleteParam("tableQuery");
    setValue("");
  };

  return (
    <div
      className="!z-50 hover:tooltip hover:tooltip-accent"
      data-tip={tooltipText}
    >
      <label className="input input-sm input-bordered flex items-center gap-2">
        <input {...rest} type="text" onChange={handleChange} value={value} />
        {!!value && (
          <HiMiniXMark className="cursor-pointer" onClick={handleClearInput} />
        )}
      </label>
    </div>
  );
}
