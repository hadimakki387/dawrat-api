import SearchInput from "@/components/global/SearchInput";
import BouncingArrow from "@/components/global/bouncing arrow/BouncingArrow";
import SideBar from "./SideBar";

function Header() {
  return (
    <div className="bg-[#2a0316] h-[80vh] flex justify-center items-center text-white flex-col text-center ">
      <div className="w-[40%] flex flex-col gap-8 mt-24">
        <div className="font-extrabold text-5xl">Let&apos;s Study Together</div>
        <div className="text-xl w-2/3 font-medium m-auto">
          Find top-rated study notes from students taking the same courses as
          you.
        </div>
        <SearchInput padding="p-5" />
        <div className="relative top-24">
          <BouncingArrow />
        </div>
      </div>

        <SideBar/>
   
    </div>
  );
}

export default Header;
