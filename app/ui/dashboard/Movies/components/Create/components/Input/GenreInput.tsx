"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { IntialState } from "../CreateForm";
import { IGenresMovies } from "@/interfaces/movie";

export default function GenreInput({
  initialState,
  setInitialState,
  genresData,
}: {
  initialState: IntialState;
  setInitialState: React.Dispatch<React.SetStateAction<IntialState>>;
  genresData: IGenresMovies[];
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setInitialState({
      ...initialState,
      genre: [...initialState.genre, value],
    });
  };

  const handleDelete = (genreName: string) => {
    const genre = initialState.genre.filter((el) => el != genreName);
    setInitialState({ ...initialState, genre });
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
        {initialState.genre.map((genreName, index) => (
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
