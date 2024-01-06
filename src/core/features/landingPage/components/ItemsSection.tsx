"use client";
import Card from "@/components/global/Card";
import DaButton from "@/components/global/DaButton";
import TabsSwitch from "@/components/global/TabsSwitch";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDispatch } from "react-redux";
import { setSignIn, setTabs } from "../redux/homePage-slice";
import { useGetItemsQuery } from "@/core/rtk-query/landingPage";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";

function ItemsSection({
  universities,
  documents,
}:{
  universities: UniversityInterface[];
  documents: DocumentInterface[];
}) {
  const { tabs } = useAppSelector((state) => state.homePage);
  const { user } = useAppSelector((state) => state.global);
  const dispatch = useDispatch();

  

  return (
    <div className="flex flex-col justify-center text-center mt-12 w-1/2 m-auto gap-8 p-16 max-sm:w-full max-sm:p-4" >
      <h1 className="font-extrabold text-4xl ">Only the best for the best</h1>
      <h2 className="text-lg text-subTitleText">
        Find the best study documents to ace your way through education.
      </h2>

      <Card>
        <TabsSwitch
          tabs={["Universities", "Documents"]}
          value={tabs}
          onChange={(e) => dispatch(setTabs(e as number))}
          sx={{ marginBottom: "1rem" ,justifyContent:'center'}}
          tabSx={{justifyContent:'center'}}
        />
        {tabs === 0 && (
          <div className="flex flex-wrap gap-2 max-md:flex-col max-md:flex-auto max-md:items-center ">
            {universities.map((university, i) => (
              <DaButton
                label={`${university?.title}`}
                key={i}
                fullRounded
                className="border border-neutral-300 p-2 font-medium text-lg max-md:text-[15px]"
                onClick={()=>{
                  if(!user){
                    dispatch(setSignIn(true))
                  }
                }}
              />
            ))}
          </div>
        )}
        {tabs === 1 && (
          <div className="flex flex-wrap gap-2 max-md:flex-col max-md:flex-auto max-md:items-center ">
            {documents.map((document, i) => (
              <DaButton
                label={`${document?.title}`}
                key={i}
                fullRounded
                className="border border-neutral-300 p-2 font-medium text-lg max-md:text-[15px]"
                onClick={()=>{
                  if(!user){
                    dispatch(setSignIn(true))
                  }
                }}
              />
            ))}
          </div>
        )}
        <DaButton
        id="mostPopular"
          label="View All"
          className="border border-neutral-300 p-2 w-full text-primary font-semibold mt-8 hover:bg-blue-100 transition-all duration-300"
          fullRounded
        />
      </Card>
    </div>
  );
}

export default ItemsSection;
