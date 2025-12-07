import { motion } from "framer-motion";
import { useState } from "react";

export const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-950/70 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/40">
                        <span className="text-xl text-white">♡</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg font-semibold text-gray-50">MindAid</span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-400">
                            Counselling & Wellbeing Hub
                        </span>
                    </div>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-medium text-gray-200 md:flex">
                    <a href="/" className="relative hover:text-sky-300">
                        <span>Home</span>
                        <span className="absolute left-0 top-full mt-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-200 group-hover:w-full" />
                    </a>
                    <a href="/counsellors" className="hover:text-sky-300">
                        Counsellors
                    </a>
                    <a href="/resources" className="hover:text-sky-300">
                        Resources
                    </a>
                    <a href="/support" className="hover:text-sky-300">
                        Support
                    </a>
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <button className="inline-flex items-center justify-center rounded-full border border-gray-500/70 bg-gray-900/60 px-4 py-1.5 text-sm font-medium text-gray-100 hover:bg-gray-800/80 hover:text-white hover:-translate-y-0.5 transition-all duration-150">
                        Login
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 px-5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40"
                    >
                        Get Started
                    </motion.button>
                </div>

                <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-600/70 bg-gray-900/80 text-gray-100 md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    <span className="sr-only">Toggle navigation</span>
                    <div className="space-y-[3px]">
                        <span className="block h-[2px] w-4 bg-gray-100" />
                        <span className="block h-[2px] w-4 bg-gray-100" />
                        <span className="block h-[2px] w-4 bg-gray-100" />
                    </div>
                </button>
            </div>

            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t border-gray-800/80 bg-gray-950/95 px-4 pb-4 pt-2 md:hidden"
                >
                    <div className="mb-3 flex flex-col gap-2 text-sm font-medium text-gray-200">
                        <a href="/" className="rounded-xl px-3 py-2 hover:bg-gray-800/80">
                            Home
                        </a>
                        <a href="/counsellors" className="rounded-xl px-3 py-2 hover:bg-gray-800/80">
                            Counsellors
                        </a>
                        <a href="/resources" className="rounded-xl px-3 py-2 hover:bg-gray-800/80">
                            Resources
                        </a>
                        <a href="/support" className="rounded-xl px-3 py-2 hover:bg-gray-800/80">
                            Support
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 rounded-full border border-gray-600/80 bg-gray-900/80 px-3 py-2 text-sm font-medium text-gray-100">
                            Login
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/50"
                        >
                            Get Started
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </header>
    );
};
