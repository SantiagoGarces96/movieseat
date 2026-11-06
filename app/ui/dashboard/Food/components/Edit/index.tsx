import DashboardLayout from "../../../DashboardLayout";
import { notFound } from "next/navigation";
import MovieEditForm from "./components/EditForm";
import { getFoodById } from "@/services/food";
import FoodEditForm from "./components/EditForm";

export default async function EditFood({ id }: { id: string }) {
  const food = await getFoodById(id);

  if (!food) {
    notFound();
  }

  return (
    <DashboardLayout title="Editar sesión">
      <FoodEditForm foodData={food} />
    </DashboardLayout>
  );
}
