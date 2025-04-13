import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  return <nav>Navbar</nav>;
};

export default Navbar;
