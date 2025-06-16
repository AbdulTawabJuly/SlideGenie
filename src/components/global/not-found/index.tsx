export const dynamic = "force-dynamic";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function ProjectNotFound({ className }: Props) {
  return (
    <main className={cn("grid place-items-center bg-Auth-0 px-6 py-24 sm:py-32 lg:px-8", className)}>
      <div className="text-center">
        <Image
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
          className="w-36 h-36 mb-3 inline"
          width={36}
          height={36}
        />
        <h1 className="mt-4 text-3xl font-bold font-signature tracking-tight text-gray-500 sm:text-5xl">
          No Project Found
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600"></p>
      </div>
    </main>
  );
}

export default ProjectNotFound;
