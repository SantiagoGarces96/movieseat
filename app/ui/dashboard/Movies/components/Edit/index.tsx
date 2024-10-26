import DashboardLayout from "../../../DashboardLayout";
import { notFound } from "next/navigation";
import { getGenres, getLanguages, getMovieById } from "@/services/movies";
import MovieEditForm from "./components/EditForm";

export default async function EditMovie({ id }: { id: string }) {
  const movie = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  const genresData = await getGenres();
  const languagesData = await getLanguages();

  return (
    <DashboardLayout title="Editar sesión">
      <MovieEditForm
        genres={genresData}
        languages={languagesData}
        movieData={JSON.parse(JSON.stringify(movie))}
      />
    </DashboardLayout>
  );
}
