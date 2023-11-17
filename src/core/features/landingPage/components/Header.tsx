import SearchInput from "@/components/global/SearchInput";
import BouncingArrow from "@/components/global/bouncing arrow/BouncingArrow";
import SideBar from "./SideBar";
import Image from "next/image";

function Header() {
  return (
    <div className="bg-[#2a0316] w-full   flex justify-center items-center text-white flex-col text-center relative pt-[250px] pb-[50px]">
      <div className="w-[40%] flex flex-col gap-8 ">
        <div className="font-extrabold text-5xl">Let&apos;s Study Together</div>
        <div className="text-xl w-2/3 font-medium m-auto">
          Find top-rated study notes from students taking the same courses as
          you.
        </div>
        <SearchInput padding="p-5" />
        <div className="relative mt-16">
          <BouncingArrow />
        </div>
      </div>

        <SideBar/>
        <Image alt="shape1" src={"/shape1.png"} height={1000} width={1000} className="shape1"/>
        {/* <Image alt="shape1" src={"/shape2.png"} height={1000} width={1000} className="shape2"/>
        <Image alt="shape1" src={"/shape3.png"} height={1000} width={1000} className="shape3"/>
        <Image alt="shape1" src={"/shape4.png"} height={1000} width={1000} className="shape4"/> */}
    </div>
  );
}

export default Header;
