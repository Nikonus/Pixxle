"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Header() {
  const pathname = usePathname();

  if (pathname.includes("/editor")) return null;

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4">
      <div className="w-full max-w-6xl backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo6.png"
            alt="Pixxel Logo"
            width={96}
            height={32}
            className="object-contain"
            priority
          />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          {pathname === "/" && (
            <>
              <Link href="#features" className="text-white font-medium hover:text-cyan-400 transition">
                Features
              </Link>
              <Link href="#pricing" className="text-white font-medium hover:text-cyan-400 transition">
                Pricing
              </Link>
              <Link href="#contact" className="text-white font-medium hover:text-cyan-400 transition">
                Contact
              </Link>
            </>
          )}

          {/* Dashboard appears like normal nav link */}
          <SignedIn>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </SignedIn>

        </nav>

        {/* Right Side Auth */}
        <div className="flex items-center gap-3">

          <SignedOut>
            <SignInButton>
              <Button variant="glass" className="hidden sm:flex">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button variant="primary">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 rounded-full border border-white/20 hover:scale-105 transition",
                  userButtonPopoverCard:
                    "shadow-xl backdrop-blur-md bg-slate-900/90 border border-white/20",
                  userPreviewMainIdentifier: "font-semibold text-white",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

        </div>
      </div>
    </header>
  );
}