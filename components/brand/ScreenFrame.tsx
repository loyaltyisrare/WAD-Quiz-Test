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
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto pb-12">
      {showLogo && (
        <header className="p-6 flex justify-center">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-32 h-10"
            >
              <Image
                src="/brand/logo/wad-logo.png"
                alt="WAD"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>
        </header>
      )}
      
      <div className="flex-grow flex flex-col justify-center">
        {children}
      </div>

      <footer className="mt-8 px-6 text-center">
        <div className="relative w-24 h-8 mx-auto opacity-30 grayscale hover:opacity-100 transition-opacity">
          <Image
            src="/brand/footer logo/wad-meaningv2w.png"
            alt="Meaning"
            fill
            className="object-contain"
          />
        </div>
      </footer>
    </div>
  );
};
