import OverviewCard from "@/app/ui/dashboard/OverviewCard";
import BarChartOverviewSkeleton from "@/app/ui/dashboard/Skeleton/BarChart";
import PieChartOverviewSkeleton from "@/app/ui/dashboard/Skeleton/PieChart";
import StatOverviewSkeleton from "@/app/ui/dashboard/Skeleton/Stat";

export default function Loading() {
  return (
    <section className="w-full px-2 py-9">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold">Bienvenido</h2>
        <p className="text-base text-gray-400">
          Administra peliculas, sesiones, salas, comidas y usuarios; para
          mantener a tu audiencia satiisfecha.
        </p>
      </div>
      <div className="my-8 flex flex-col gap-4">
        <div className="flex h-full w-full flex-col gap-4 lg:flex-row">
          <OverviewCard title="Películas por Género">
            <BarChartOverviewSkeleton />
            <StatOverviewSkeleton />
          </OverviewCard>
          <OverviewCard title="Ventas de Comida por Categoría">
            <PieChartOverviewSkeleton />
          </OverviewCard>
        </div>
        <OverviewCard title="Ingresos por Mes">
          <BarChartOverviewSkeleton />
        </OverviewCard>
        <div className="flex flex-col gap-4 lg:flex-row">
          <OverviewCard title="Disponibilidad de Asientos">
            <BarChartOverviewSkeleton />
          </OverviewCard>
          <OverviewCard title="Ventas de Boletos por Día">
            <BarChartOverviewSkeleton />
          </OverviewCard>
        </div>
      </div>
    </section>
  );
}
