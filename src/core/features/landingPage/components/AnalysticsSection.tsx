import Document from "@/components/SVGs/Document";
import HandHoldingPhone from "@/components/SVGs/HandHoldingPhone";
import User from "@/components/SVGs/User";

function AnalysticsSection({
  documentsCount,
  usersCount,
}: {
  documentsCount: number;
  usersCount: number;
}) {
  return (
    <div className="bg-white py-24 flex flex-col justify-center text-center gap-16 max-sm:gap-12">
      <h1 className="text-4xl font-extrabold max-sm:text-2xl">
        {usersCount} students saved, and counting
      </h1>
      <p className="text-[22px] w-1/3 m-auto max-sm:w-[90%] max-sm:text-base">
        {documentsCount} new study notes added every day, from one of the
        world&apos;s most active student communities
      </p>
      <div className="flex items-center justify-end m-auto w-[50%] gap-8 relative max-sm:flex-col">
        <div className="w-32 max-sm:w-52 ">
          <h1 className="text-6xl font-bold">{documentsCount}</h1>
          <p className="text-sm flex justify-center items-center gap-3">
            <Document size={16} fill="var(--hint)" /> Study Resource
          </p>
        </div>
        <div className="w-32 max-sm:w-52">
          <h1 className="text-6xl font-bold">{usersCount}</h1>
          <p className="text-sm">
            <User size={15} fill="var(--hint)" /> Users
          </p>
        </div>
        <div className="absolute left-0 max-sm:hidden">
          <HandHoldingPhone className="w-[20rem] " />
        </div>
      </div>
    </div>
  );
}

export default AnalysticsSection;
