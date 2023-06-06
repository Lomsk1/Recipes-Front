"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  navLinks: {
    name: string;
    href: string;
    onClick?: () => void;
  }[];
}

export function NavLink({ navLinks }: NavLinkProps) {
  const pathname = usePathname() || "";
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname.endsWith(link.href);

        return (
          <Link
            className={isActive ? "active" : ""}
            href={link.href}
            key={link.name}
            onClick={link.onClick}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}

export default NavLink;
