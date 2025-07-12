import { Button } from "@/components/ui/shadcn/button";
import { Heart, Store } from "lucide-react";
import { Link } from "react-router";

const AppNavbar = () => {
  return (
    <nav className="flex w-full flex-row justify-between border-b px-5 py-3">
      <Link to="/">
        <Button variant="link">
          <h2 className="flex flex-row items-center gap-1.5">
            <Store className="size-5.5" />
            <p className="font-black">Chqred</p>
          </h2>
        </Button>
      </Link>

      <Link to="/wishlist">
        <Button variant="link">
          <Heart className="size-5.5" />
        </Button>
      </Link>
    </nav>
  );
};

export default AppNavbar;
