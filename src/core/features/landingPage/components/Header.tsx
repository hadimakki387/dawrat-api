import SearchInput from "@/components/global/SearchInput";
import BouncingArrow from "@/components/global/bouncing arrow/BouncingArrow";
import SideBar from "./SideBar";
import Image from "next/image";
import Link from "next/link";
import DaSearch from "@/components/global/DaSearch/DaSearch";

function Header() {
  return (
    <div className="bg-[#38071f] w-full   flex justify-center items-center text-white flex-col text-center relative pt-[250px] max-sm:pt-[150px] pb-[50px]">
      <div className="w-[40%] flex flex-col gap-8 max-lg:w-[60%] max-md:w-[80%] z-10">
        <div className="font-extrabold text-5xl">Let&apos;s Study Together</div>
        <div className="text-xl w-2/3 font-medium m-auto">
          Find top-rated study notes from students taking the same courses as
          you.
        </div>
        <DaSearch padding="p-4 max-sm:p-2" placeholder="Search for courses, books or documents"/>
        <Link href={"#mostPopular"} className="relative mt-16">
          <BouncingArrow />
        </Link>
      </div>

      <SideBar />
      <Image
        alt="shape1"
        src={"/shape1.png"}
        height={1000}
        width={1000}
        className="shape1"
      />
      <Image
        alt="shape2"
        src={"/shape2.png"}
        height={1000}
        width={1000}
        className="shape2"
      />
      <Image
        alt="shape3"
        src={"/shape3.png"}
        height={1000}
        width={1000}
        className="shape3"
      />
      <Image
        alt="shape4"
        src={"/shape4.png"}
        height={1000}
        width={1000}
        className="shape4"
      />
      <Image
        alt="shape5"
        src={"/shape5.png"}
        height={1000}
        width={1000}
        className="shape5"
      />
      <Image
        alt="shape6"
        src={"/shape6.png"}
        height={1000}
        width={1000}
        className="shape6"
      />
    </div>
  );
}

export default Header;
