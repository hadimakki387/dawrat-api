"use client";
import Card from "@/components/global/Card";
import TabsSwitch from "@/components/global/TabsSwitch";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDispatch } from "react-redux";
import { setTabs } from "../redux/homePage-slice";
import Button from "@/components/global/Button";

function ItemsSection() {
  const { tabs } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const data = Array(10).fill(0);

  return (
    <div className="flex flex-col justify-center text-center mt-12 w-1/2 m-auto gap-8" >
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
          <div className="flex flex-wrap gap-2">
            {data.map((_, i) => (
              <Button
                label={`University ${i}`}
                key={i}
                fullRounded
                className="border border-neutral-300 p-2 font-medium text-lg"
              />
            ))}
          </div>
        )}
        {tabs === 1 && (
          <div className="flex flex-wrap gap-2">
            {data.map((_, i) => (
              <Button
                label={`Document ${i}`}
                key={i}
                fullRounded
                className="border border-neutral-300 p-2 font-medium text-lg"
              />
            ))}
          </div>
        )}
        <Button
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
