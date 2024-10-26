"use client";
import { MovieCreateFormState } from "@/types/movie";
import { useState } from "react";
import { HiMiniPlus, HiMiniXMark } from "react-icons/hi2";

export default function CastInput({
  state,
  setState,
}: {
  state: MovieCreateFormState;
  setState: React.Dispatch<React.SetStateAction<MovieCreateFormState>>;
}) {
  const [actor, setActor] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setActor(value);
  };

  const handleAdd = () => {
    const clearActor = actor.trim();
    if (clearActor) {
      setState({
        ...state,
        cast: [...state.cast, clearActor],
      });
    }
    setActor("");
  };

  const handleDelete = (actorName: string) => {
    const cast = state.cast.filter((el) => el != actorName);
    setState({ ...state, cast });
  };

  return (
    <div className="col-span-12 grid lg:col-span-6">
      <label className="form-control w-full">
        <div className="label text-lg font-bold">
          <span className="label-text">Elenco</span>
        </div>
        <label className="input input-sm input-bordered flex items-center gap-2">
          <input
            id="cast"
            name="cast"
            value={actor}
            type="text"
            className="grow"
            onChange={handleChange}
          />
          {actor.length > 3 && (
            <HiMiniPlus className="cursor-pointer" onClick={handleAdd} />
          )}
        </label>
      </label>
      <div className="mt-3 flex min-h-9 w-full flex-wrap items-center justify-center gap-3 p-2">
        {state.cast.map((actorName, index) => (
          <div
            key={"person-" + actorName + index}
            className="badge badge-outline"
          >
            {actorName}{" "}
            <HiMiniXMark
              className="cursor-pointer"
              onClick={() => handleDelete(actorName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
