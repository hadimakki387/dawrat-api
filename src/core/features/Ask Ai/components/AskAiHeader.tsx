import AI from "@/components/SVGs/AI";



function AskAiHeader() {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-[#fdebfe] flex justify-center items-center rounded-lg">
        <AI fill="#f8b5fd" width="25px" height="25px" />
      </div>
      <div className="flex flex-col ">
        <h1 className="text-3xl font-semibold">Ask AI</h1>
        <p className="text-subTitleText text-sm">
          Ask a study question and get an answer in seconds.
        </p>
      </div>
      
    </div>
  );
}

export default AskAiHeader;
