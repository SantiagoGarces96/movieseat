export default function loading() {
  return (
    <section className="h-[100vh] w-full divide-y">
      <div className="flex items-center justify-between p-5">
        <div className="skeleton h-9 w-48 rounded-md" />
      </div>
      <div className="flex h-full w-full items-start justify-center p-8">
        <div className="grid w-full grid-cols-12 gap-4 rounded-xl border px-8 py-8 lg:px-10 xl:px-16 2xl:w-3/4">
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <label className="form-control col-span-12 grid w-full lg:col-span-6">
            <div className="label">
              <div className="skeleton h-4 w-28 rounded-md" />
            </div>
            <div className="skeleton h-8 w-full rounded-md" />
          </label>
          <div className="col-span-12 mt-6 grid w-full">
            <div className="flex w-full items-center justify-center gap-4">
              <div className="skeleton min-h-8 min-w-28 rounded-md" />
              <div className="skeleton min-h-8 min-w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
