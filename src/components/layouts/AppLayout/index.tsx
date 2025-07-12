import AppFooter from "@/components/ui/navigation/AppFooter";
import AppNavbar from "@/components/ui/navigation/AppNavbar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <main className="flex flex-col gap-y-4">
      <AppNavbar />
      <section className="mx-auto h-fit min-h-[65vh] max-w-5xl px-4">
        <Outlet />
      </section>
      <AppFooter />
    </main>
  );
};

export default AppLayout;
