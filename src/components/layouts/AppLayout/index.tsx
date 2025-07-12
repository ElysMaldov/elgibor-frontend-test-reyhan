import AppNavbar from "@/components/ui/navigation/AppNavbar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <main className="flex flex-col gap-y-4">
      <AppNavbar />
      <section className="px-4">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
