"use client";
import { recentSearchSaver } from "@/utils/localStorage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";
import ResultsSearchs from "../DataDisplay/ResultsSearch";
import RecentSearch from "../DataDisplay/RecentSearch";

export default function SearchIcon() {
  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      recentSearchSaver(term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const openModal = (): void => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        focusInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="hidden lg:flex">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            role="button"
            className="input input-sm input-bordered flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("query")?.toString()}
            />
            <kbd className="kbd kbd-sm">CTRL</kbd>+
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
          <div
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-full rounded-box bg-base-100 p-2 shadow"
          >
            <RecentSearch />
            <ResultsSearchs />
          </div>
        </div>
      </div>
      <button
        className="btn btn-circle btn-ghost btn-sm lg:hidden"
        onClick={openModal}
      >
        <HiMagnifyingGlass className="h-4 w-4" />
      </button>
    </div>
  );
}
