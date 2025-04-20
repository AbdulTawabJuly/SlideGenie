import { ContentItem } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import { useDrop } from "react-dnd";

type DropZoneProps = {
  index: number;
  parentId: string;
  slideId: string;
};

const DropZone = ({ index, parentId, slideId }: DropZoneProps) => {

    const [] = useDrop({
        accept: "CONTENT_ITEM",
        drop:(item : {
            type : string
            componentType : string
            label : string
            component : ContentItem
        })=>{
            if(item.type === "component")
        }
    })
    const {addComponentInSlide} = useSlideStore();
  return <div>DropZone</div>;

};

export default DropZone;
