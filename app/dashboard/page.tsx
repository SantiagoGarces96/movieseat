import { getUsersByQuery } from "@/services/users";
import ModalSearch from "../ui/dashboard/NavBar/Modals/ModalSearch";
import { getMoviesByQuery } from "@/services/movies";
import { getFoodByQuery } from "@/services/food";
import { getRoomsByQuery } from "@/services/rooms";

export default async function DashBoard({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const users = await getUsersByQuery(query);
  const movies = await getMoviesByQuery(query);
  const food = await getFoodByQuery(query);
  const rooms = await getRoomsByQuery(query);

  return (
    <div>
      <ModalSearch
        usersData={users}
        moviesData={movies}
        foodData={food}
        roomsData={rooms}
      />
    </div>
  );
}
