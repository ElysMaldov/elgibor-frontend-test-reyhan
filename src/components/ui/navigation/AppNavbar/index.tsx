import { ModeToggle } from "@/components/ui/buttons/ModeToggle";
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

        <section className="flex flex-row gap-x-2">
          <ModeToggle />

          <Link
            to="/wishlist"
            data-testid="button-wishlist-menu"
          >
            <Button variant="link">
              <Heart className="size-5.5 fill-current" />
            </Button>
          </Link>
        </section>
      </section>
    </nav>
  );
};

export default AppNavbar;
