export default function loading() {
  const skeletonHeaderArray = Array(8).fill(null);
  const skeletonBodyArray = Array(10).fill(null);
  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-3xl font-bold">Sesiones</h2>
        <div className="skeleton h-8 w-32 rounded-md" />
      </div>
      <div className="p-5">
        <div className="h-full overflow-x-auto">
          <div className="flex w-full items-center justify-between px-1 py-5">
            <div className="skeleton h-8 w-44 rounded-md" />
            <div className="skeleton h-8 w-60 rounded-md" />
          </div>
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                {skeletonHeaderArray.map((_) => (
                  <th key={Math.random()}>
                    <div className="flex justify-between">
                      <div className="skeleton h-3 w-20 rounded-md" />
                      <div className="skeleton h-3 w-3 rounded-none" />
                    </div>
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {skeletonBodyArray.map((_) => (
                <tr key={Math.random()}>
                  <th>
                    <div className="skeleton h-3 w-3 rounded-none" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th>
                    <div className="skeleton h-8 w-36 rounded-md" />
                  </th>
                  <th className="flex items-center justify-center gap-3">
                    <div className="skeleton h-6 w-6 rounded-none" />
                    <div className="skeleton h-6 w-6 rounded-none" />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-1 py-5">
            <div className="skeleton h-7 w-24 rounded-md" />
            <div className="skeleton h-12 w-80 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
