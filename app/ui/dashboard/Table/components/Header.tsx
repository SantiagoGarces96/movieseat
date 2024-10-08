"use client";
import { useEffect, useState } from "react";
import {
  HiArrowsUpDown,
  HiBarsArrowDown,
  HiBarsArrowUp,
} from "react-icons/hi2";
import useParams from "@/app/hooks/useParams";

function SortableHeader({ title, value }: { title: string; value: string }) {
  const { getParam, updateParam } = useParams();
  const [sort, setSort] = useState("");
  const [icon, setIcon] = useState(<HiArrowsUpDown />);

  const handleSort = (order: string) => {
    updateParam("sortBy", value);
    updateParam("order", order);
  };

  const handleClick = () => {
    let currentOrder: string = "asc";
    switch (sort) {
      case "desc":
        setSort(currentOrder);
        setIcon(<HiBarsArrowUp />);
        break;

      case "asc":
        currentOrder = "desc";
        setSort(currentOrder);
        setIcon(<HiBarsArrowDown />);
        break;

      default:
        setSort(currentOrder);
        setIcon(<HiBarsArrowUp />);
        break;
    }
    handleSort(currentOrder);
  };

  useEffect(() => {
    const currentSort = getParam("sortBy");
    const currentOrder = getParam("order");
    if (currentSort && currentOrder) {
      setSort(currentSort !== value ? "" : currentOrder);
    }
  }, [getParam, value]);

  return (
    <th
      className={`cursor-pointer ${sort && "text-accent"}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        {title}
        {icon}
      </div>
    </th>
  );
}

function Header({ headers }: { headers: { [key: string]: string }[] }) {
  return (
    <thead>
      <tr>
        <th></th>
        {headers.map(({ label, value }, index) => (
          <SortableHeader key={value + index} title={label} value={value} />
        ))}
        <th></th>
      </tr>
    </thead>
  );
}

export default Header;
