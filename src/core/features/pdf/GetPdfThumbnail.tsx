// use react pdf to view pdf

import { Document, Thumbnail, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// import { useResizeObserver } from "@wojtekmaj/react-hooks";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

function GetPdfThumbnail({
  width,
  height,
  className,
  url = "",
  getNumPages,
}: {
  width: number;
  height: number;
  className?: string;
  url: string;
  getNumPages?: (numPages: number) => any;
}) {
  // const [numPages, setNumPages] = useState<number>();
  // const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  // const [containerWidth, setContainerWidth] = useState<number>();

  // const onResize = useCallback<ResizeObserverCallback>((entries) => {
  //   const [entry] = entries;

  //   if (entry) {
  //     setContainerWidth(entry.contentRect.width);
  //   }
  // }, []);

  // useResizeObserver(containerRef, resizeObserverOptions, onResize);

  // function onDocumentLoadSuccess({numPages: nextNumPages}: PDFDocumentProxy): void {
  //   setNumPages(nextNumPages);
  // }

  return (
    <div>
      {url?<div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={url}
            options={{ ...options }}
            loading=""
            onLoadSuccess={({ numPages: nextNumPages }) => {
              if (getNumPages && nextNumPages) getNumPages(nextNumPages);
            }}
          >
            {/* i want render the custom renderer as png */}
            <Thumbnail
              pageNumber={1}
              width={width}
              height={height}
              className={className}
            />
          </Document>
        </div>
      </div>:null}

      {/* <iframe src={url} width="100%" height="600px" /> */}
    </div>
  );
}

export default GetPdfThumbnail;
