import { User } from "@/lib/types";
import Link from "next/link";
import React from "react";

type Props = {
  currentUser?: User["currentUser"];
};

type Link = {
  label: string;
  href: string;
};

const Header = ({ currentUser }: Props) => {
  const links = (
    [
      !currentUser && { label: "Sign Up", href: "/auth/signup" },
      !currentUser && { label: "Sign In", href: "/auth/signin" },
      currentUser && { label: "Sign Out", href: "/auth/signout" },
    ].filter(Boolean) as Link[]
  ).map((link: Link) => {
    return (
      <li key={link.href} className="mx-2">
        <Link href={link.href}>{link.label}</Link>
      </li>
    );
  });

  return (
    <nav className="flex w-full justify-between p-2 bg-primary-foreground">
      <Link href="/">GitTix</Link>
      <div>
        <ul className="flex">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
