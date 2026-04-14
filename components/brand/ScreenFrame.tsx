"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ScreenFrameProps {
  children: React.ReactNode;
  showLogo?: boolean;
}

export const ScreenFrame: React.FC<ScreenFrameProps> = ({ children, showLogo = true }) => {
  return (
    <div className="page-shell">
      {showLogo && (
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <Image
                src="/brand/logo/wad-logo2.png"
                alt="WAD"
                width={320}
                height={80}
                className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                priority
              />
            </motion.div>
          </Link>
        </div>
      )}
      
      {children}
    </div>
  );
};
