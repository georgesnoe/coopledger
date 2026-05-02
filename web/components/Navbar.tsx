"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">C</span>
          </div>
          <span className="text-xl font-bold font-sans tracking-tight text-foreground">
            CoopLedger
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Fonctionnalités</Link>
          <Link href="#about" className="hover:text-primary transition-colors">À propos</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">Comment ça marche</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:flex">Connexion</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">S'inscrire</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
