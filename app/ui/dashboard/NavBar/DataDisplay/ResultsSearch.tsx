"use client";
import {
  IResultDataDashboard,
  IResultsSearchsDashboard,
} from "@/interfaces/dasboard";
import ResultCard from "./ResultCard";
import { getUsersByQuery } from "@/services/users";
import { getMoviesByQuery } from "@/services/movies";
import { getFoodByQuery } from "@/services/food";
import { getRoomsByQuery } from "@/services/rooms";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResultSearchSkeleton from "../../Skeleton/ResultSearch";

function ContainResults({ title, resultData }: IResultsSearchsDashboard) {
  if (!resultData.length) {
    return;
  }

  return (
    <div className="flex flex-col gap-3 border-t p-5">
      <span className="text-sm font-medium text-gray-400">{title}</span>
      <ul className="menu menu-sm w-full rounded-box bg-base-100">
        {resultData.map((result, index) => (
          <ResultCard key={result.label + index} {...result} />
        ))}
      </ul>
    </div>
  );
}

export default function ResultsSearchs() {
  const [users, setUsers] = useState<IResultDataDashboard[]>([]);
  const [movies, setMovies] = useState<IResultDataDashboard[]>([]);
  const [food, setFood] = useState<IResultDataDashboard[]>([]);
  const [rooms, setRooms] = useState<IResultDataDashboard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const clearStates = (): void => {
    setUsers([]);
    setMovies([]);
    setFood([]);
    setRooms([]);
  };
  useEffect(() => {
    const getData = async (): Promise<void> => {
      clearStates();
      if (!query) {
        return;
      }
      setLoading(true);
      const usersData = await getUsersByQuery(query);
      const moviesData = await getMoviesByQuery(query);
      const foodData = await getFoodByQuery(query);
      const roomsData = await getRoomsByQuery(query);
      setUsers(usersData);
      setMovies(moviesData);
      setFood(foodData);
      setRooms(roomsData);
      setLoading(false);
    };
    getData();
  }, [query]);
  return (
    <div className="lg:min-h-30 h-[85%] w-full overflow-auto lg:h-full lg:max-h-60">
      {loading && <ResultSearchSkeleton />}
      <ContainResults title="Users" resultData={users} />
      <ContainResults title="Movies" resultData={movies} />
      <ContainResults title="Food" resultData={food} />
      <ContainResults title="Rooms" resultData={rooms} />
    </div>
  );
}
