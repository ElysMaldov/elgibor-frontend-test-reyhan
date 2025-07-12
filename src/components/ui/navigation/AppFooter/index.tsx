import AppLogo from "@/components/ui/logo/AppLogo";
import {
  DribbbleIcon,
  GithubIcon,
  Globe,
  LinkedinIcon,
  Mail,
} from "lucide-react";
import { Link } from "react-router";

const footerLinks = [
  {
    title: "Catalogue",
    href: "/",
  },
  {
    title: "Wishlist",
    href: "/wishlist",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

const AppFooter = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-start py-12">
          <AppLogo />

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 px-4">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link
                  to={href}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              to="/"
              target="_blank"
            >
              Chqred
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link
              to="https://github.com/ElysMaldov"
              target="_blank"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link
              to="https://elysmaldov.com/"
              target="_blank"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              to="https://dribbble.com/ElysMaldov"
              target="_blank"
            >
              <DribbbleIcon className="h-5 w-5" />
            </Link>
            <Link
              to="https://linkedin.com/in/mreyhanapw"
              target="_blank"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link
              to="mailto:maldovelys@gmail.com"
              target="_blank"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
