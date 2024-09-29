"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  HiArrowsUpDown,
  HiBarsArrowDown,
  HiBarsArrowUp,
} from "react-icons/hi2";

function SortableHeader({ title, value }: { title: string; value: string }) {
  const [sort, setSort] = useState("");
  const [icon, setIcon] = useState(<HiArrowsUpDown />);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleSort = (order: string) => {
    params.set("sortBy", value);
    params.set("order", order);
    replace(`${pathname}?${params.toString()}`);
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
    const currentSort = params.get("sortBy");
    const currentOrder = params.get("order");
    if (currentSort && currentOrder) {
      setSort(currentSort !== value ? "" : currentOrder);
    }
  }, [params, value]);

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
