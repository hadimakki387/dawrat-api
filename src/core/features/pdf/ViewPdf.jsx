"use client";
import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/pdfjs-express";
import { useAppSelector } from "@/core/StoreWrapper";
import { useParams } from "next/navigation";

function ViewPdf({ url, LoadSuccess,outerStyle }) {
  const viewer = useRef(null);
  const { user } = useAppSelector((state) => state.global);
  const params = useParams()
  const DocId = params?.id
  console.log("this is the outer style")
  console.log(outerStyle)

  useEffect(() => {
    if (viewer.current && viewer.current.innerHTML === "" && url) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: url,
        },
        viewer.current
      ).then((instance) => {
        const { documentViewer, annotationManager } = instance.Core;
        var docViewer = instance.Core.documentViewer;
        docViewer.on("documentLoaded", async () => {
          LoadSuccess(true);
          instance.UI.setZoomLevel(1.4);
          // Load annotations from Local Storage
          try {
            const storedAnnotations = localStorage.getItem(`DawraAnnonation-${user?.id}-${DocId}`);
            const parsedAnnotations = JSON.parse(storedAnnotations);
            if (storedAnnotations && parsedAnnotations.userId === user?.id && parsedAnnotations.DocId === DocId) {
              await annotationManager.importAnnotations(parsedAnnotations.annonations);
            }
          } catch (error) {
            console.error(
              "Failed to load annotations from Local Storage:",
              error
            );
          }
        });

        // Save annotations to Local Storage on change
        annotationManager.addEventListener(
          "annotationChanged",
          async (annotation) => {
            console.log("Annotation changed:", annotation);
            try {
              localStorage.setItem(
                `DawraAnnonation-${user?.id}-${DocId}`,
                JSON.stringify({
                  annonations:await annotationManager.exportAnnotations(),
                  userId: user?.id,
                  DocId: DocId
                })
              );
            } catch (error) {
              console.error(
                "Failed to save annotations to Local Storage:",
                error
              );
            }
          }
        );
      });
    }
  }, [url]);

  return <div className="webviewer" ref={viewer} style={outerStyle}></div>;
}

export default ViewPdf;
