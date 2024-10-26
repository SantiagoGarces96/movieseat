import AreaChartOverview from "@/app/ui/dashboard/Chart/AreaChart";
import BarChartOverview from "@/app/ui/dashboard/Chart/BarChart";
import LineChartOverview from "@/app/ui/dashboard/Chart/LineChart";
import PieChartOverview from "@/app/ui/dashboard/Chart/PieChart";
import OverviewCard from "@/app/ui/dashboard/OverviewCard";
import StatOverview from "@/app/ui/dashboard/Stat";
import { getMoviesByGenre, getMoviesByStatus } from "@/services/movies";
import { getAvailableSeatsByRoom } from "@/services/sessions";
import { getDailyTicketSales } from "@/services/tickets";
import { getFoodSells, getMonthlyRevenue } from "@/services/transactions";

export default async function OverviewPage() {
  const moviesData = await getMoviesByGenre();
  const moviesByStatus = await getMoviesByStatus();
  const foodSellsData = await getFoodSells();
  const monthlyRevenue = await getMonthlyRevenue();
  const availableSeats = await getAvailableSeatsByRoom();
  const dailyTicketSales = await getDailyTicketSales();

  return (
    <section className="w-full px-2 py-9 2xl:max-w-[90rem]">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold">Bienvenido</h2>
        <p className="text-base text-gray-400">
          Administra peliculas, sesiones, salas, comidas y usuarios; para
          mantener a tu audiencia satiisfecha.
        </p>
      </div>
      <div className="my-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <OverviewCard title="Películas por Género">
            <div className="min-h-[300px]">
              <BarChartOverview data={moviesData} dataKey="count" />
            </div>
            <StatOverview data={moviesByStatus} />
          </OverviewCard>
          <OverviewCard title="Ventas de Comida por Categoría">
            <div className="min-h-[300px]">
              <PieChartOverview data={foodSellsData} />
            </div>
          </OverviewCard>
        </div>
        <OverviewCard title="Ingresos por Mes">
          <div className="min-h-[300px]">
            <LineChartOverview data={monthlyRevenue} />
          </div>
        </OverviewCard>
        <div className="flex flex-col gap-4 lg:flex-row">
          <OverviewCard title="Disponibilidad de Asientos">
            <div className="min-h-[300px]">
              <BarChartOverview
                data={availableSeats}
                dataKey="availableSeats"
              />
            </div>
          </OverviewCard>
          <OverviewCard title="Ventas de Boletos por Día">
            <div className="min-h-[300px]">
              <AreaChartOverview data={dailyTicketSales} />
            </div>
          </OverviewCard>
        </div>
      </div>
    </section>
  );
}
