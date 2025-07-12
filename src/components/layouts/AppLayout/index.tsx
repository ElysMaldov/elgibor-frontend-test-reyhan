import AppNavbar from "@/components/ui/navigation/AppNavbar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <main>
      <AppNavbar />
      <Outlet />
    </main>
  );
};

export default AppLayout;
