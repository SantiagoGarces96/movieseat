import EditSession from "@/app/ui/dashboard/Sessions/components/Edit";

export default async function Page({
  params,
}: {
  params: { section: string; id: string };
}) {
  const { section, id } = params;

  return <EditSession id={id} />;
}
