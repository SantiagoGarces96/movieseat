"use client";
import Link from "next/link";

import { Button } from "../../../../Button";
import { SpanishMovieStatus } from "@/types/movie";

import { useState } from "react";
import CastInput from "./Input/CastInput";
import { IGenresMovies, ILanguagesMovies } from "@/interfaces/movie";
import GenreInput from "./Input/GenreInput";
import LanguageInput from "./Input/LanguageInput";

export type IntialState = {
  cast: string[];
  genre: string[];
  language: string[];
};

export default function MovieCreateForm({
  genres,
  languages,
}: {
  genres: IGenresMovies[];
  languages: ILanguagesMovies[];
}) {
  const [initialState, setInitialState] = useState<IntialState>({
    cast: [],
    genre: [],
    language: [],
  });

  return (
    <form className="grid w-full grid-cols-12 gap-4 rounded-xl border px-8 py-8 lg:px-10 xl:px-16 2xl:w-3/4">
      <div className="col-span-12 grid w-full lg:col-span-6">
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">IMDB ID</span>
          </div>
          <input
            id="imdb_id"
            name="imdb_id"
            type="number"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Titulo</span>
          </div>
          <input
            id="title"
            name="title"
            type="text"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Director</span>
          </div>
          <input
            id="director"
            name="director"
            type="text"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Fecha de estreno</span>
          </div>
          <input
            id="releaseDate"
            name="releaseDate"
            type="date"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
      </div>

      <div className="col-span-12 grid w-full lg:col-span-6">
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Descripcion</span>
          </div>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered textarea-sm w-full"
            required
            rows={8}
          />
        </label>
      </div>

      <CastInput
        initialState={initialState}
        setInitialState={setInitialState}
      />

      <GenreInput
        initialState={initialState}
        setInitialState={setInitialState}
        genresData={genres}
      />

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label text-lg font-bold">
          <span className="label-text">Trailer</span>
        </div>
        <input
          id="trailer"
          name="trailer"
          type="url"
          className="input input-sm input-bordered w-full"
        />
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label text-lg font-bold">
          <span className="label-text">Portada</span>
        </div>
        <input
          id="poster"
          name="poster"
          type="url"
          className="input input-sm input-bordered w-full"
        />
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label text-lg font-bold">
          <span className="label-text">Contraportada</span>
        </div>
        <input
          id="backdrop"
          name="backdrop"
          type="url"
          className="input input-sm input-bordered w-full"
        />
      </label>

      <div className="form-control col-span-12 grid w-full lg:col-span-6">
        <div className="label text-lg font-bold">
          <span className="label-text">Estado</span>
        </div>
        <label className="label cursor-pointer">
          <span className="label-text capitalize">
            {SpanishMovieStatus.UPCOMING}
          </span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-accent"
            defaultChecked
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text capitalize">
            {SpanishMovieStatus.PRE_SALE}
          </span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-accent"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text capitalize">
            {SpanishMovieStatus.BILLBOARD}
          </span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-accent"
          />
        </label>
      </div>
      <div className="col-span-12 grid lg:col-span-6">
        <LanguageInput
          initialState={initialState}
          setInitialState={setInitialState}
          languageData={languages}
        />
        <div className="flex w-full gap-3">
          <label className="form-control w-full">
            <div className="label text-lg font-bold">
              <span className="label-text">Duración</span>
            </div>
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                id="duration"
                name="duration"
                type="number"
                className="w-full grow"
                required
              />
              <span className="font-bold text-gray-400">Min</span>
            </label>
          </label>
          <label className="flex w-full items-center justify-center gap-3">
            <div className="label text-lg font-bold">
              <span className="label-text">Subtitulos</span>
            </div>
            <input
              id="subtitles"
              name="subtitles"
              type="checkbox"
              className="toggle toggle-accent toggle-sm"
            />
          </label>
        </div>
      </div>

      <div className="col-span-12 mt-6 grid w-full">
        <div className="flex w-full items-center justify-center gap-4">
          <Link
            href="/dashboard/movies"
            className="btn btn-error btn-sm min-w-28 text-primary"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear</Button>
        </div>
      </div>
    </form>
  );
}
