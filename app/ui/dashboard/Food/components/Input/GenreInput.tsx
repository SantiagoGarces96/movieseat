"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IGenresMovies } from "@/interfaces/movie";
import { MovieCreateFormState } from "@/types/movie";

export default function GenreInput({
  state,
  setState,
  genresData,
}: {
  state: MovieCreateFormState;
  setState: React.Dispatch<React.SetStateAction<MovieCreateFormState>>;
  genresData: IGenresMovies[];
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setState({
      ...state,
      genre: [...state.genre, value],
    });
  };

  const handleDelete = (genreName: string) => {
    const genre = state.genre.filter((el) => el != genreName);
    setState({ ...state, genre });
  };

  return (
    <div className="col-span-12 grid lg:col-span-6">
      <label className="form-control w-full">
        <div className="label text-lg font-bold">
          <span className="label-text">Género</span>
        </div>
        <select
          id="genre"
          name="genre"
          className="select select-bordered select-sm w-full"
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccione un género
          </option>
          {genresData.map(({ id, name }) => (
            <option key={"genre" + id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-3 flex min-h-9 w-full flex-wrap items-center justify-center gap-3 p-2">
        {state.genre.map((genreName, index) => (
          <div
            key={"person-" + genreName + index}
            className="badge badge-outline"
          >
            {genreName}{" "}
            <HiMiniXMark
              className="cursor-pointer"
              onClick={() => handleDelete(genreName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
