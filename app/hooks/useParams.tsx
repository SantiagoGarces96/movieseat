import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

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

  const updateParam = useCallback(
    (name: string, value: string) => {
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, replace],
  );

  const deleteParam = useCallback(
    (name: string) => {
      params.delete(name);
      replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, replace],
  );

  return { getParam, updateParam, deleteParam };
}
