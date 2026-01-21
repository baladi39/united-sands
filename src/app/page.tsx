import ElectricBackground from "@/components/ElectricBackground";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="City skyline background"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Electric Particle Animation */}
      <ElectricBackground />

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-12 md:px-12 lg:px-24">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo.png"
              alt="United Sands Logo"
              width={180}
              height={220}
              priority
            />
          </div>

          {/* Under Renovation Text */}
          <p
            className="mb-4 text-sm tracking-[0.3em] text-white/80 font-(--font-oswald)"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            UNDER RENOVATION
          </p>

          {/* Main Headline */}
          <h1
            className="mb-6 text-2xl tracking-[0.2em] md:text-3xl lg:text-4xl"
            style={{
              fontFamily: "var(--font-oswald)",
              fontWeight: 300,
              background:
                "linear-gradient(90deg, #c792ea 0%, #9b59b6 50%, #c792ea 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            LET&apos;S SHAPE THE FUTURE TOGETHER
          </h1>

          {/* Subtitle */}
          <p
            className="mb-12 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
            data-electric-safezone
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            We are currently working on something amazing. Enter your email
            below to be the first to know when we launch.
          </p>

          {/* Email Form (ignore client-only attributes/extensions during hydration) */}
          <form
            className="flex w-full max-w-md flex-col gap-4 sm:flex-row"
            suppressHydrationWarning
          >
            <input
              type="email"
              placeholder="Enter your email here"
              className="flex-1 border-b-2 border-purple-400/50 bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-purple-400"
              data-electric-mute
              style={{ fontFamily: "var(--font-roboto)" }}
              required
              autoComplete="email"
            />
            <button
              type="submit"
              className="px-8 py-3 text-sm font-medium tracking-wider text-white transition-all hover:brightness-110"
              style={{
                fontFamily: "var(--font-oswald)",
                background: "#9b59b6",
              }}
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="flex w-full flex-col items-center gap-6 pt-12">
          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a
              href="#"
              className="opacity-70 transition-opacity hover:opacity-100"
              aria-label="Facebook"
            >
              <Image
                src="/images/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="opacity-70 transition-opacity hover:opacity-100"
              aria-label="Twitter"
            >
              <Image
                src="/images/twitter.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="opacity-70 transition-opacity hover:opacity-100"
              aria-label="Instagram"
            >
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="opacity-70 transition-opacity hover:opacity-100"
              aria-label="LinkedIn"
            >
              <Image
                src="/images/linkedin.png"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
          </div>

          {/* Copyright */}
          <p
            className="text-xs text-white/50"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            &copy; {new Date().getFullYear()} United Sands. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
