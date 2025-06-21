import React from "react";

const Page = async () => {
  return (
    <div className="felx justify-between items-center">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
          Settings
        </h1>
        <p className="text-base font-normal dark:text-secondary">
          All your Settings
        </p>
      </div>
    </div>
  );
};

export default Page;
