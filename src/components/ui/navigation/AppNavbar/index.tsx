import AppLogo from "@/components/ui/logo/AppLogo";
import { Button } from "@/components/ui/shadcn/button";
import { Heart } from "lucide-react";
import { Link } from "react-router";

const AppNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex flex-row justify-center border-b bg-background py-3">
      <section className="flex w-full max-w-5xl flex-row justify-between px-5">
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
      </section>
    </nav>
  );
};

export default AppNavbar;
