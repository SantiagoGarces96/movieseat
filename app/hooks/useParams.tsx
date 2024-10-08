import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useParams() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const getParam = (name: string): string => {
    const param = params.get(name);
    return param?.toString() || "";
  };

  const updateParam = (name: string, value: string) => {
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const deleteParam = (name: string) => {
    params.delete(name);
    replace(`${pathname}?${params.toString()}`);
  };

  return { getParam, updateParam, deleteParam };
}
