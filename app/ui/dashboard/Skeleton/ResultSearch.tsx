export default function ResultSearchSkeleton() {
  const elements = [1, 2, 3];
  return (
    <>
      <div className="flex flex-col gap-3 border-t p-5">
        <div className="skeleton h-4 w-1/3" />
        <ul className="menu menu-sm w-full rounded-box bg-base-100">
          {elements.map((_, index) => (
            <li key={index} className="">
              <div>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <div className="skeleton h-full w-full shrink-0 rounded-full" />
                  </div>
                </div>
                <div className="skeleton h-4 w-full" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3 border-t p-5">
        <div className="skeleton h-4 w-1/3" />
        <ul className="menu menu-sm w-full rounded-box bg-base-100">
          {elements.map((_, index) => (
            <li key={index} className="">
              <div>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <div className="skeleton h-full w-full shrink-0 rounded-full" />
                  </div>
                </div>
                <div className="skeleton h-4 w-full" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
