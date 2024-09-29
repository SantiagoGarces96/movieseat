"use client";
import { recentSearchSaver } from "@/utils/localStorage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RefObject, useCallback, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";
import RecentSearch from "../DataDisplay/RecentSearch";
import ResultsSearchs from "../DataDisplay/ResultsSearch";

function Input({
  inputRef,
  kbd,
}: {
  inputRef?: RefObject<HTMLInputElement>;
  kbd?: boolean;
}) {
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

  const focusInput = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const closeModal = useCallback(() => {
    const modal = document.getElementById(
      "modal_search",
    ) as HTMLDialogElement | null;
    if (modal?.open) {
      modal.close();
      focusInput();
    }
  }, [focusInput]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        closeModal();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeModal]);

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
  }, [focusInput]);

  return (
    <label
      tabIndex={0}
      role="button"
      className="input input-sm input-bordered flex items-center gap-2"
    >
      <HiMagnifyingGlass className="h-5 w-5 lg:hidden" />
      <input
        ref={inputRef}
        type="text"
        className="grow"
        placeholder="Buscar"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      {kbd && (
        <>
          <kbd className="kbd kbd-sm">CTRL</kbd> +{" "}
          <kbd className="kbd kbd-sm">K</kbd>
        </>
      )}
    </label>
  );
}

export default function SearchInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <div>
      <div className="hidden lg:flex">
        <div className="dropdown dropdown-end">
          <Input inputRef={inputRef} kbd />
          <div
            tabIndex={1}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-full rounded-box bg-base-100 p-2 shadow"
          >
            <RecentSearch />
            <ResultsSearchs />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <Input />
      </div>
    </div>
  );
}
