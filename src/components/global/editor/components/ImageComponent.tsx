// import Image from "next/image";
// import React from "react";
// import UploadImage from "./UploadImage";

// type Props = {
//   src: string;
//   alt: string;
//   className?: string;
//   isPreview?: boolean;
//   contentId: string;
//   onContentChange: (
//     contentId: string,
//     newContent: string | string[] | string[][]
//   ) => void;
//   isEditable?: boolean;
// };

// const CustomImage = ({
//   src,
//   alt,
//   className,
//   isPreview,
//   onContentChange,
//   contentId,
//   isEditable,
// }: Props) => {
//   return (
//     <div className={`relative group w-full h-full rounded-lg`}>
//       <Image
//         src={src}
//         alt={alt}
//         width={isPreview ? 48 : 800}
//         height={isPreview ? 48 : 800}
//         className={`object-cover w-full h-full rounded-lg ${className}`}
//       />

//       {!isPreview && isEditable && (
//         <div className="absolute top-0 left-0 hidden group-hover:block">
//           <UploadImage
//             contentId={contentId}
//             onContentChange={onContentChange}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomImage;


import Image from "next/image";
import React from "react";
import UploadImage from "./UploadImage";

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isEditable?: boolean;
  isPresentationMode?: boolean; // New prop to detect presentation mode
};

const CustomImage = ({
  src,
  alt,
  className,
  isPreview,
  onContentChange,
  contentId,
  isEditable,
  isPresentationMode = false, // Default to false
}: Props) => {
  return (
    <div className={`relative group w-full h-full rounded-lg ${isPresentationMode ? 'max-h-full max-w-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={isPreview ? 48 : isPresentationMode ? 800 : 800} // Keep width but allow scaling
        height={isPreview ? 48 : isPresentationMode ? 600 : 800} // Reduced height for presentation mode
        className={`object-contain w-full h-full rounded-lg ${className} ${isPresentationMode ? 'max-h-full max-w-full' : ''}`} // Use object-contain for presentation mode
      />

      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block">
          <UploadImage
            contentId={contentId}
            onContentChange={onContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomImage;