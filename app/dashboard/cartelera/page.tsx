import type { Metadata } from "next";
import DashboardLayout from "@/app/ui/dashboard/DashboardLayout";
import BillboardManager from "@/app/ui/dashboard/Billboard/BillboardManager";
import { getBillboardList } from "@/services/billboard";

export const metadata: Metadata = { title: "Cartelera | MovieSeat" };

export default async function BillboardPage() {
  const current = await getBillboardList();
  return (
    <DashboardLayout title="Cartelera" button={<span />}>
      <BillboardManager current={current} />
    </DashboardLayout>
  );
}
