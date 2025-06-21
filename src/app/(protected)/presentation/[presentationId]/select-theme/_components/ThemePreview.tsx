"use client";
import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { Theme } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeCard from "./ThemeCard";
import ThemePicker from "./ThemePicker";
import { themes } from "@/lib/constants";

const ThemePreview = () => {
  const params = useParams();
  const router = useRouter();
  const controls = useAnimation();
  const { project, setCurrentTheme, currentTheme } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [project, params.presentationId]);

  useEffect(() => {
    controls.start("visible");
  }, [controls, selectedTheme]);

  const leftCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: selectedTheme.accentColor }}
        >
          Quick Start Guide
        </h3>
        <ol
          className="list-decimal list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Chose a Theme</li>
          <li>Customize Colors and Fonts </li>
          <li>Add your Content</li>
          <li>Preview and Publish</li>
        </ol>
      </div>
      <Button
        className="w-full h-12 text-lg font-medium"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.accentColor,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  const mainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            This is a Big Brain Layout 🧠💡 Basically, a text box but cooler 😎
          </p>
        </div>
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            You can get these by typing smart
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          className="h-12 px-6 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Primary Button
        </Button>
        <Button
          variant="outline"
          className="h-12 px-6 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Secondary Button
        </Button>
      </div>
    </div>
  );

  const rightCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: selectedTheme.accentColor }}
        >
          Theme Features
        </h3>
        <ul
          className="list-disc list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Responsive Design</li>
          <li>Dark and Light Modes</li>
          <li>Custom Color Schemes</li>
          <li>Accessibility Optimized</li>
        </ul>
      </div>

      <Button
        variant="outline"
        className="h-12 w-full text-lg font-medium"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Explore Features
      </Button>
    </div>
  );

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div
      className="h-screen w-full flex "
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="p-12 flex flex-col items-center min-h-screen">
          <Button
            variant="outline"
            className="mb-12 self-start"
            size="lg"
            style={{
              backgroundColor: selectedTheme.accentColor + "10",
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + "20",
            }}
            onClick={() => router.push("/create-page")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <div className="w-full flex justify-center items-center relative flex-grow">
            <ThemeCard
              title="Jump In"
              description="Get your vibe on with chill templates."
              content={leftCardContent}
              variant="left"
              theme={selectedTheme}
              controls={controls}
              image="/Theme_Card_Left.png"
            />
            <ThemeCard
              title="Glow Up"
              description="Make your slides pop and flex your style."
              content={mainCardContent}
              variant="main"
              theme={selectedTheme}
              controls={controls}
              image="/Theme_Card_Main.png"
            />
            <ThemeCard
              title="Show Off"
              description="Drop your work and stunt on 'em."
              content={rightCardContent}
              variant="right"
              theme={selectedTheme}
              controls={controls}
              image="/Theme_Card_Right.png"
            />
          </div>
        </div>
      </div>

      <ThemePicker
        selectedThemes={selectedTheme}
        themes={themes}
        onThemeSelect={applyTheme}
      />
    </div>
  );
};

export default ThemePreview;

// "use client";
// import { useSlideStore } from "@/store/useSlideStore";
// import { redirect, useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState, useRef } from "react";
// import { useAnimation } from "framer-motion";
// import { Theme } from "@/lib/types";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import ThemeCard from "./ThemeCard";
// import ThemePicker from "./ThemePicker";
// import { themes } from "@/lib/constants";

// const ThemePreview = () => {
//   const params = useParams();
//   const router = useRouter();
//   const controls = useAnimation();
//   const { project, setCurrentTheme, currentTheme } = useSlideStore();
//   const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (project?.slides) {
//       redirect(`/presentation/${params.presentationId}`);
//     }
//   }, [project]);

//   useEffect(() => {
//     controls.start("visible");
//   }, [controls, selectedTheme]);

//   // Adjust content for responsiveness
//   const leftCardContent = (
//     <div className="space-y-2 sm:space-y-3 md:space-y-4">
//       <div
//         className="rounded-xl p-2 sm:p-3 md:p-4 lg:p-6"
//         style={{ backgroundColor: selectedTheme.accentColor + "10" }}
//       >
//         <h3
//           className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           Quick Start Guide
//         </h3>
//         <ol
//           className="list-decimal list-inside space-y-0.5 sm:space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           <li>Chose a Theme</li>
//           <li>Customize Colors and Fonts </li>
//           <li>Add your Content</li>
//           <li>Preview and Publish</li>
//         </ol>
//       </div>
//       <Button
//         className="w-full h-8 sm:h-9 md:h-10 lg:h-12 text-xs sm:text-sm md:text-base lg:text-lg font-medium"
//         style={{
//           backgroundColor: selectedTheme.accentColor,
//           color: selectedTheme.fontColor,
//         }}
//       >
//         Get Started
//       </Button>
//     </div>
//   );

//   const mainCardContent = (
//     <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//         <div
//           className="rounded-xl p-2 sm:p-3 md:p-4 lg:p-6"
//           style={{ backgroundColor: selectedTheme.accentColor + "10" }}
//         >
//           <p
//             className="text-xs sm:text-sm md:text-base"
//             style={{ color: selectedTheme.accentColor }}
//           >
//             This is a Big Brain Layout 🧠💡 Basically, a text box but cooler 😎
//           </p>
//         </div>
//         <div
//           className="rounded-xl p-2 sm:p-3 md:p-4 lg:p-6"
//           style={{ backgroundColor: selectedTheme.accentColor + "10" }}
//         >
//           <p
//             className="text-xs sm:text-sm md:text-base"
//             style={{ color: selectedTheme.accentColor }}
//           >
//             You can get these by typing smart
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-wrap gap-2 md:gap-4">
//         <Button
//           className="h-6 sm:h-7 md:h-8 lg:h-10 px-2 sm:px-3 md:px-4 lg:px-6 text-xs sm:text-sm md:text-base lg:text-lg font-medium"
//           style={{
//             backgroundColor: selectedTheme.accentColor,
//             color: selectedTheme.fontColor,
//           }}
//         >
//           Primary Button
//         </Button>
//         <Button
//           variant="outline"
//           className="h-6 sm:h-7 md:h-8 lg:h-10 px-2 sm:px-3 md:px-4 lg:px-6 text-xs sm:text-sm md:text-base lg:text-lg font-medium"
//           style={{
//             backgroundColor: selectedTheme.accentColor,
//             color: selectedTheme.fontColor,
//           }}
//         >
//           Secondary Button
//         </Button>
//       </div>
//     </div>
//   );

//   const rightCardContent = (
//     <div className="space-y-2 sm:space-y-3 md:space-y-4">
//       <div
//         className="rounded-xl p-2 sm:p-3 md:p-4 lg:p-6"
//         style={{ backgroundColor: selectedTheme.accentColor + "10" }}
//       >
//         <h3
//           className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           Theme Features
//         </h3>
//         <ul
//           className="list-disc list-inside space-y-0.5 sm:space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base"
//           style={{ color: selectedTheme.accentColor }}
//         >
//           <li>Responsive Design</li>
//           <li>Dark and Light Modes</li>
//           <li>Custom Color Schemes</li>
//           <li>Accessibility Optimized</li>
//         </ul>
//       </div>

//       <Button
//         variant="outline"
//         className="h-8 sm:h-9 md:h-10 lg:h-12 w-full text-xs sm:text-sm md:text-base lg:text-lg font-medium"
//         style={{
//           backgroundColor: selectedTheme.accentColor,
//           color: selectedTheme.fontColor,
//         }}
//       >
//         Explore Features
//       </Button>
//     </div>
//   );

//   const applyTheme = (theme: Theme) => {
//     setSelectedTheme(theme);
//     setCurrentTheme(theme);
//   };

//   return (
//     <div
//       className="h-screen w-full flex flex-col md:flex-row"
//       style={{
//         backgroundColor: selectedTheme.backgroundColor,
//         color: selectedTheme.accentColor,
//         fontFamily: selectedTheme.fontFamily,
//       }}
//     >
//       {/* Main content area */}
//       <div className="flex-grow overflow-hidden">
//         <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center h-full">
//           <div className="w-full pr-8 sm:pr-4 md:pr-6 lg:pr-8 sm:pb-4 md:pb-6 lg:pb-4">
//             <Button
//               variant="outline"
//               className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 self-start"
//               size="sm"
//               style={{
//                 backgroundColor: selectedTheme.accentColor + "10",
//                 color: selectedTheme.accentColor,
//                 borderColor: selectedTheme.accentColor + "20",
//               }}
//               onClick={() => router.push("/create-page")}
//             >
//               <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
//               Back
//             </Button>
//           </div>

//           {/* Card display area */}
//           <div
//             ref={containerRef}
//             className="w-full flex justify-center items-center relative"
//             style={{
//               height: "calc(100vh - 150px)",
//               transform: "scale(0.9)",
//             }}
//           >
//             <ThemeCard
//               title="Jump In"
//               description="Get your vibe on with chill templates."
//               content={leftCardContent}
//               variant="left"
//               theme={selectedTheme}
//               controls={controls}
//               image="/Theme_Card_Left.png"
//             />
//             <ThemeCard
//               title="Glow Up"
//               description="Make your slides pop and flex your style."
//               content={mainCardContent}
//               variant="main"
//               theme={selectedTheme}
//               controls={controls}
//               image="/Theme_Card_Main.png"
//             />
//             <ThemeCard
//               title="Show Off"
//               description="Drop your work and stunt on 'em."
//               content={rightCardContent}
//               variant="right"
//               theme={selectedTheme}
//               controls={controls}
//               image="/Theme_Card_Right.png"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Theme picker */}
//       <ThemePicker
//         selectedThemes={selectedTheme}
//         themes={themes}
//         onThemeSelect={applyTheme}
//       />
//     </div>
//   );
// };

// export default ThemePreview;
