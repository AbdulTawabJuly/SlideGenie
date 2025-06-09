"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const 
UserButton = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded || !user?.id) return null;

  const name = user.fullName || user.username || "User";
  const email = user?.primaryEmailAddress?.emailAddress || "";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center py-2 rounded-xl transition focus:outline-none">
          <Image
            src={user.imageUrl}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={8}
        className="z-50 w-64 rounded-xl border border-gray-700 bg-[#1f1f1f] p-4 text-white shadow-2xl"
      >
        <div className="mb-4">
          <p className="font-semibold truncate">{name}</p>
          <p className="text-sm text-gray-400 truncate">{email}</p>
        </div>
        <DropdownMenu.Separator className="h-px bg-gray-600 my-2" />
        <DropdownMenu.Item asChild>
          <button
            onClick={() => signOut(() => router.push("/"))}
            className="w-full text-left text-sm text-red-400 hover:text-red-500 transition hover:outline-none"
          >
            Sign Out
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
