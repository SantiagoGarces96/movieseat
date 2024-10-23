import CreateSession from "@/app/ui/dashboard/Sessions/components/Create";

export default async function Page({
  params,
}: {
  params: { section: string };
}) {
  const { section } = params;

  return <CreateSession />;
}
