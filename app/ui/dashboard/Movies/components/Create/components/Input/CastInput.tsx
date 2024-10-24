"use client";
import { useState } from "react";
import { HiMiniPlus, HiMiniXMark } from "react-icons/hi2";
import { IntialState } from "../CreateForm";

export default function CastInput({
  initialState,
  setInitialState,
}: {
  initialState: IntialState;
  setInitialState: React.Dispatch<React.SetStateAction<IntialState>>;
}) {
  const [actor, setActor] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setActor(value);
  };

  const handleAdd = () => {
    const clearActor = actor.trim();
    if (clearActor) {
      setInitialState({
        ...initialState,
        cast: [...initialState.cast, clearActor],
      });
    }
    setActor("");
  };

  const handleDelete = (actorName: string) => {
    const cast = initialState.cast.filter((el) => el != actorName);
    setInitialState({ ...initialState, cast });
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
        {initialState.cast.map((actorName, index) => (
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
