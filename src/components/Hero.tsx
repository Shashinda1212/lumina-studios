import { ArrowRight, Menu } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="h-screen w-full relative flex flex-col overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

            {/* Viewfinder Frame Overlays (Decorative) */}
            <div className="absolute top-6 md:top-8 left-6 md:left-8 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-white/20 pointer-events-none z-0"></div>
            <div className="absolute top-6 md:top-8 right-6 md:right-8 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-white/20 pointer-events-none z-0"></div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-white/20 pointer-events-none z-0"></div>
            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-white/20 pointer-events-none z-0"></div>

            {/* Vertical Sidebar Labels */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center space-y-12 opacity-20 hidden lg:flex pointer-events-none z-0">
                <span className="rotate-90 text-[10px] uppercase tracking-[0.8em] origin-center whitespace-nowrap">ISO 400</span>
                <span className="rotate-90 text-[10px] uppercase tracking-[0.8em] origin-center whitespace-nowrap">F/2.8</span>
                <span className="rotate-90 text-[10px] uppercase tracking-[0.8em] origin-center whitespace-nowrap">24FPS</span>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '4px 4px' }}></div>

            {/* Header */}
            <nav className="flex justify-between items-center px-6 md:px-16 py-8 md:py-10 relative z-30">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <div className="flex select-none items-center">
                        <span className="text-xl md:text-2xl font-bold tracking-tighter leading-none uppercase text-white">
                            KANISHKA WIDURANGA
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-3 ml-8 pl-8 border-l border-white/10">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#FF3B30] rounded-full animate-pulse"></div>
                        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-medium opacity-60">Live Preview</span>
                    </div>
                </div>

                <button className="flex items-center gap-3 text-xs md:text-[10px] font-medium tracking-[0.4em] uppercase opacity-60 hover:opacity-100 transition-opacity duration-300 group">
                    <span className="hidden sm:inline">Menu</span>
                    <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                </button>
            </nav>

            {/* Main Hero Content */}
            <main className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-32 relative z-10 w-full overflow-y-auto lg:overflow-visible pb-20 lg:pb-0 items-start">
                <div className="flex flex-col space-y-2 max-w-5xl animate-fade-in-up w-full">
                    <h1 className="flex flex-col mx-auto lg:mx-0 w-full max-w-4xl">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[4.5rem] leading-[0.95] font-black tracking-tighter block text-[#E5E5E5] wrap-break-words">WE DON'T SHOOT VIDEOS</span>
                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] font-black tracking-tighter block italic text-transparent outline-text mt-2 sm:mt-4 wrap-break-words" style={{ WebkitTextStroke: '1px #E5E5E5' }}>
                            WE CREATE VISUALS THAT MOVE CULTURE
                        </span>
                    </h1>

                    <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-3xl border-l border-neutral-800 pl-6 md:pl-8">
                        <button className="w-full sm:w-auto bg-white text-[#0A0A0A] px-8 py-3.5 md:py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#F27D26] hover:text-white transition-all duration-300">
                            Start Your Project
                        </button>
                        <button className="w-full sm:w-auto group px-6 py-3.5 md:py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 hover:opacity-70 transition-all duration-300">
                            View Our Reel
                            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                            </div>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer / Specializations */}
            <footer className="px-8 md:px-16 lg:px-32 py-10 md:py-12 border-t border-white/5 relative z-20 mt-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 md:gap-12 w-full">
                    {[
                        { tag: "01", label: "Music Videos" },
                        { tag: "02", label: "Visual Direction" },
                        { tag: "03", label: "Creative Production" },
                    ].map((item, i) => (
                        <div
                            key={item.label}
                            className="flex flex-col gap-2 group cursor-pointer animate-fade-in-up flex-1 w-full"
                            style={{ animationDelay: `${500 + i * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-neutral-500 font-mono group-hover:text-[#F27D26] transition-colors">{item.tag}</span>
                                <div className="h-px bg-white/20 w-8 md:w-16 lg:w-32 group-hover:w-full transition-all duration-700 ease-out group-hover:bg-[#F27D26]"></div>
                            </div>
                            <span className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.2em] text-[#E5E5E5] group-hover:translate-x-2 transition-transform duration-300 ease-out">{item.label}</span>
                        </div>
                    ))}
                </div>
            </footer>
        </section>
    );
};