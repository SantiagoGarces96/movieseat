import DashboardLayout from "../../../DashboardLayout";
import FoodCreateForm from "./components/CreateForm";

export default async function CreateFood() {
  return (
    <DashboardLayout title="Crear comida">
      <FoodCreateForm />
    </DashboardLayout>
  );
}
