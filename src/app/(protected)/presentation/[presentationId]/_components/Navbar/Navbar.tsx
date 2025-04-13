import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  return <div>Navbar</div>;
};

export default Navbar;
