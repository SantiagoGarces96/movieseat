export default function loading() {
  const skeletonHeaderArray = Array(8).fill(null);
  const skeletonBodyArray = Array(10).fill(null);
  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <div className="skeleton h-9 w-36 rounded-md" />
        <div className="skeleton h-8 w-32 rounded-md" />
      </div>
      <div className="p-5">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex w-full items-center justify-between px-1 py-5">
            <div className="skeleton h-8 w-44 rounded-md" />
            <div className="skeleton h-8 w-60 rounded-md" />
          </div>
          <div className="h-full max-h-[75vh] w-full overflow-auto 2xl:hidden">
            {skeletonBodyArray.map((data, index) => (
              <div
                key={Math.random()}
                className="mb-2 w-full rounded-md border p-4"
              >
                <div className="flex w-full items-center justify-between pb-4 text-sm">
                  <div className="skeleton h-3 w-28 rounded-md" />
                  <div className="skeleton h-6 w-36 rounded-md" />
                </div>
                <div className="flex w-full items-center justify-between border-b py-5">
                  <div className="flex w-1/3 flex-col gap-2">
                    <div className="skeleton h-3 w-24 rounded-md" />
                    <div className="skeleton h-6 w-28 rounded-md" />
                  </div>
                  <div className="flex w-1/3 flex-col gap-2">
                    <div className="skeleton h-3 w-24 rounded-md" />
                    <div className="skeleton h-6 w-28 rounded-md" />
                  </div>
                  <div className="flex w-1/3 flex-col gap-2">
                    <div className="skeleton h-3 w-24 rounded-md" />
                    <div className="skeleton h-6 w-28 rounded-md" />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4 text-sm">
                  <div>
                    <div className="skeleton h-3 w-24" />
                  </div>
                  <div className="flex items-end justify-center gap-3">
                    <div className="skeleton h-6 w-6 rounded-none" />
                    <div className="skeleton h-6 w-6 rounded-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-full max-h-[75vh] w-full overflow-auto">
            <table className="table table-xs hidden 2xl:table">
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
          </div>
          <div className="flex w-full items-center justify-between px-1 py-5">
            <div className="skeleton h-7 w-24 rounded-md" />
            <div className="skeleton h-9 w-80 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
