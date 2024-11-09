"use client";
import { HiMiniXMark } from "react-icons/hi2";
import { ILanguagesMovies } from "@/interfaces/movie";
import { MovieCreateFormState } from "@/types/movie";

export default function LanguageInput({
  state,
  setState,
  languageData,
}: {
  state: MovieCreateFormState;
  setState: React.Dispatch<React.SetStateAction<MovieCreateFormState>>;
  languageData: ILanguagesMovies[];
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setState({
      ...state,
      language: [...state.language, value],
    });
  };

  const handleDelete = (languageName: string) => {
    const language = state.language.filter((el) => el != languageName);
    setState({ ...state, language });
  };

  return (
    <div className="col-span-12 grid lg:col-span-6">
      <label className="form-control w-full">
        <div className="label text-lg font-bold">
          <span className="label-text">Idioma</span>
        </div>
        <select
          id="genre"
          name="genre"
          className="select select-bordered select-sm w-full"
          defaultValue=""
          onChange={handleChange}
        >
          <option value="" disabled>
            Seleccione un idioma
          </option>
          {languageData.map(({ iso, name }) => (
            <option key={"language-" + iso} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-3 flex min-h-9 w-full flex-wrap items-center justify-center gap-3 p-2">
        {state.language.map((laeguageName, index) => (
          <div
            key={"language-" + laeguageName + index}
            className="badge badge-outline"
          >
            {laeguageName}{" "}
            <HiMiniXMark
              className="cursor-pointer"
              onClick={() => handleDelete(laeguageName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
