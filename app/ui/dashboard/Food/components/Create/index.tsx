import { getGenres, getLanguages } from "@/services/movies";
import DashboardLayout from "../../../DashboardLayout";
import MovieCreateForm from "./components/CreateForm";

export default async function CreateMovie() {
  const genresData = await getGenres();
  const languagesData = await getLanguages();

  return (
    <DashboardLayout title="Crear película">
      <MovieCreateForm genres={genresData} languages={languagesData} />
    </DashboardLayout>
  );
}
