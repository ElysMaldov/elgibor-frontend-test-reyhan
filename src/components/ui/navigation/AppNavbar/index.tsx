import AppLogo from "@/components/ui/logo/AppLogo";
import { Button } from "@/components/ui/shadcn/button";
import { Heart } from "lucide-react";
import { Link } from "react-router";

const AppNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full flex-row justify-between border-b bg-background px-5 py-3">
      <Link to="/">
        <Button variant="link">
          <AppLogo />
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
