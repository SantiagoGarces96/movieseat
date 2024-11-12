"use client";
import Link from "next/link";
import { Button } from "../../../../Button";
import { useFormState } from "react-dom";
import { initialState } from "@/constants/dashboard/form";
import Alert from "@/app/ui/dashboard/Alert";
import useAlert from "@/app/hooks/useAlert";
import {
  FoodCategory,
  FoodSize,
  FoodType,
  SpanishFoodSize,
  SpanishFoodType,
  SpanishhFoodCategory,
} from "@/types/food";
import { createFood } from "@/services/food";

export default function FoodCreateForm() {
  const [stateAction, formAction] = useFormState(createFood, initialState);

  const { showAlert } = useAlert(stateAction);

  return (
    <form
      action={formAction}
      className="grid w-full grid-cols-12 gap-4 rounded-xl border px-8 py-8 lg:px-10 xl:px-16 2xl:w-3/4"
    >
      {showAlert && <Alert {...stateAction} />}
      <div className="col-span-12 grid w-full lg:col-span-6">
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Nombre</span>
          </div>
          <input
            id="name"
            name="name"
            type="text"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
      </div>

      <div className="col-span-12 grid w-full lg:col-span-6">
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Imagen</span>
          </div>
          <input
            id="image"
            name="image"
            type="url"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
      </div>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label text-lg font-bold">
          <span className="label-text">Categoria</span>
        </div>
        <select
          id="category"
          name="category"
          className="select select-bordered select-sm w-full capitalize"
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione una categoria
          </option>
          {Object.entries(FoodCategory).map(([_, value], index) => (
            <option key={value + index} value={value}>
              {
                SpanishhFoodCategory[
                  value.toUpperCase() as keyof typeof SpanishhFoodCategory
                ]
              }
            </option>
          ))}
        </select>
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label text-lg font-bold">
          <span className="label-text">Tipo</span>
        </div>
        <select
          id="type"
          name="type"
          className="select select-bordered select-sm w-full capitalize"
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione un tipo
          </option>
          {Object.entries(FoodType).map(([_, value], index) => (
            <option key={value + index} value={value}>
              {
                SpanishFoodType[
                  value.toUpperCase() as keyof typeof SpanishFoodType
                ]
              }
            </option>
          ))}
        </select>
      </label>

      <label className="form-control col-span-12 grid w-full lg:col-span-4">
        <div className="label text-lg font-bold">
          <span className="label-text">Tamaño</span>
        </div>
        <select
          id="size"
          name="size"
          className="select select-bordered select-sm w-full capitalize"
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione un tamaño
          </option>
          {Object.entries(FoodSize).map(([_, value], index) => (
            <option key={value + index} value={value}>
              {
                SpanishFoodSize[
                  value.toUpperCase() as keyof typeof SpanishFoodSize
                ]
              }
            </option>
          ))}
        </select>
      </label>

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
            rows={4}
          />
        </label>
      </div>

      <div className="col-span-12 grid w-full lg:col-span-6">
        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Precio</span>
          </div>
          <input
            id="price"
            name="price"
            type="number"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label text-lg font-bold">
            <span className="label-text">Cantidad disponible</span>
          </div>
          <input
            id="availableAmount"
            name="availableAmount"
            type="number"
            className="input input-sm input-bordered w-full"
            required
          />
        </label>
      </div>

      <div className="col-span-12 mt-6 grid w-full">
        <div className="flex w-full items-center justify-center gap-4">
          <Link
            href="/dashboard/food"
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
