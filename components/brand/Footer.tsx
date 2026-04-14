import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 flex flex-col items-center justify-center gap-4 pb-8 z-10 relative opacity-60 hover:opacity-100 transition-opacity">
      <Image 
        src="/brand/footer logo/wad-meaningv2w.png" 
        alt="Women Are Drugs" 
        width={100} 
        height={50} 
        className="object-contain" 
      />
      <div className="flex items-center gap-3 text-[11px] text-brand-muted uppercase tracking-wider text-center flex-wrap justify-center">
        <Link href="https://womenaredrugs.com/" target="_blank" className="hover:text-white transition-colors">
          Shop
        </Link>
        <span>|</span>
        <Link href="#" className="hover:text-white transition-colors">
          Privacy Policy / Terms Of Service
        </Link>
      </div>
    </footer>
  );
}
