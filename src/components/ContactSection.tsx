import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, ArrowRight, Facebook, Linkedin } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().trim().min(1, { message: 'Subject is required.' }).max(100, { message: 'Subject must be less than 100 characters.' }),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters.' }).max(1000, { message: 'Message must be less than 1000 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    if (!turnstileToken) {
      setTurnstileError(true);
      return;
    }
    setTurnstileError(false);
    setIsSubmitting(true);
    // Simulate API request using sanitized data
    console.log("Sanitized Form Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#080504] text-white py-24 px-6 md:px-16 lg:px-32 xl:px-48 border-t border-white/5 overflow-hidden flex flex-col justify-center">
      {/* Self-contained styling for background dust particles and slow-drifting glow meshes */}
      <style>{`
        @keyframes float-bokeh-contact {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);    opacity: 0; }
          8%   { opacity: 0.45; }
          50%  { transform: translateY(-75px) translateX(22px) scale(1.25); opacity: 0.6; }
          92%  { opacity: 0.15; }
          100% { transform: translateY(-150px) translateX(0px) scale(0.85); opacity: 0; }
        }
        @keyframes orb-drift-contact-1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(35px, -45px) scale(1.08); }
          66%  { transform: translate(-25px, 25px) scale(0.92); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes orb-drift-contact-2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-45px, 35px) scale(1.12); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes orb-drift-contact-3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(45px, -35px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes scanline-scroll-contact {
          0%   { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes wave-float-1 {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(-12px) scaleY(1.03); }
        }
        @keyframes wave-float-2 {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(8px) scaleY(0.97); }
        }
        @media (max-width: 768px) {
          .mobile-reduce-motion {
            animation: none !important;
          }
        }
      `}</style>

      {/* Cinematic Live Background Effects (Hidden on mobile for maximum performance) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
        {/* Subtle base radial gradient glow behind the contact form */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.035)_0%,transparent_70%)] pointer-events-none z-0"
        />

        {/* Dynamic Glow Mesh Orbs matching site theme & uploaded image colors */}
        {/* Left Side: Warm Red/Amber Glow */}
        <div
          style={{ animation: 'orb-drift-contact-1 30s ease-in-out infinite' }}
          className="absolute left-[-10%] top-[15%] w-[650px] h-[650px] bg-[#b91c1c]/8 rounded-full blur-[150px] opacity-75 mobile-reduce-motion"
        />

        {/* Right Side: Warm Orange/Amber Glow */}
        <div
          style={{ animation: 'orb-drift-contact-2 25s ease-in-out infinite' }}
          className="absolute right-[-5%] bottom-[10%] w-[600px] h-[600px] bg-[#F27D26]/12 rounded-full blur-[140px] opacity-80 mobile-reduce-motion"
        />

        {/* Center/Right: Premium Gold Accent Glow */}
        <div
          style={{ animation: 'orb-drift-contact-3 28s ease-in-out infinite 3s' }}
          className="absolute right-[10%] bottom-[20%] w-[500px] h-[500px] bg-[#C6904E]/10 rounded-full blur-[130px] opacity-70 mobile-reduce-motion"
        />

        {/* Right Upper: Deep Red highlight */}
        <div
          style={{ animation: 'orb-drift-contact-1 35s ease-in-out infinite 1s' }}
          className="absolute right-[5%] bottom-[40%] w-[450px] h-[450px] bg-[#b91c1c]/5 rounded-full blur-[120px] opacity-60 mobile-reduce-motion"
        />

        {/* Premium Cinematic Wave Lines (Matching uploaded image) */}
        <div className="absolute inset-0 opacity-40">
          <svg
            viewBox="0 0 1440 900"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#F27D26" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#C6904E" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="wave-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b91c1c" stopOpacity="0" />
                <stop offset="25%" stopColor="#ef4444" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#F27D26" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#C6904E" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F27D26" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wave-grad-3" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                <stop offset="50%" stopColor="#F27D26" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#C6904E" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* broad blurred glow backings */}
            <g style={{ animation: 'wave-float-1 22s ease-in-out infinite' }} className="opacity-40">
              <path
                d="M -100 820 C 400 960, 900 780, 1540 350"
                fill="none"
                stroke="url(#wave-grad-1)"
                strokeWidth="9"
                className="blur-[8px]"
              />
              <path
                d="M -50 880 C 450 980, 950 750, 1540 300"
                fill="none"
                stroke="url(#wave-grad-2)"
                strokeWidth="11"
                className="blur-[10px]"
              />
              <path
                d="M -150 780 C 300 900, 800 700, 1540 450"
                fill="none"
                stroke="url(#wave-grad-3)"
                strokeWidth="7"
                className="blur-[6px]"
              />
            </g>

            {/* sharp cores */}
            <g style={{ animation: 'wave-float-2 25s ease-in-out infinite' }} className="opacity-80">
              <path
                d="M -100 820 C 400 960, 900 780, 1540 350"
                fill="none"
                stroke="url(#wave-grad-1)"
                strokeWidth="2"
              />
              <path
                d="M -100 860 C 350 920, 850 820, 1540 400"
                fill="none"
                stroke="url(#wave-grad-2)"
                strokeWidth="1.2"
              />
              <path
                d="M -50 880 C 450 980, 950 750, 1540 300"
                fill="none"
                stroke="url(#wave-grad-2)"
                strokeWidth="1.8"
              />
              <path
                d="M -150 780 C 300 900, 800 700, 1540 450"
                fill="none"
                stroke="url(#wave-grad-3)"
                strokeWidth="1.2"
              />
              <path
                d="M -80 840 C 500 990, 1000 680, 1540 250"
                fill="none"
                stroke="url(#wave-grad-1)"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>

        {/* Floating Bokeh Particles using theme orange & gold */}
        {[
          { left: '10%', top: '80%', size: 3.5, delay: 0, dur: 17 },
          { left: '25%', top: '60%', size: 2.0, delay: 4, dur: 21 },
          { left: '40%', top: '75%', size: 4.0, delay: 1, dur: 15 },
          { left: '60%', top: '85%', size: 2.5, delay: 6, dur: 23 },
          { left: '75%', top: '65%', size: 3.0, delay: 2, dur: 19 },
          { left: '90%', top: '70%', size: 2.0, delay: 8, dur: 18 },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-0 blur-[0.5px] ${i % 2 === 0 ? 'bg-[#F27D26]' : 'bg-[#C6904E]'}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: i % 2 === 0 ? '0 0 6px rgba(242,125,38,0.45)' : '0 0 6px rgba(198,144,78,0.4)',
              animation: `float-bokeh-contact ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Cinematic Scanline Grain */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)',
            backgroundSize: '100% 4px',
            animation: 'scanline-scroll-contact 0.2s steps(1) infinite',
          }}
        />

        {/* Radial vignette to keep the edges completely black */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#000000_98%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Contact Info & Brand Message */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Tag / Badge */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-1.5 bg-[#F27D26] rounded-full shadow-[0_0_8px_rgba(242,125,38,0.8)]"></div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-semibold">
                  Get In Touch
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest leading-[1.05] mb-8 font-sans">
                Let's <br />
                Create <br />
                <span className="bg-gradient-to-r from-[#F27D26] via-[#C6904E] to-[#F27D26] bg-clip-text text-transparent">
                  Together.
                </span>
              </h2>

              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-12 max-w-md font-light">
                Have a concept in mind or want to collaborate on an upcoming production? Drop me a message and let's craft something unforgettable.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-neutral-400 group-hover:text-[#F27D26] group-hover:border-[#F27D26]/30 group-hover:bg-[linear-gradient(rgba(242,125,38,0.05),rgba(242,125,38,0.05))] transition-all duration-300">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Email</h4>
                  <a
                    href="mailto:hello@luminastudios.com"
                    className="text-sm font-medium tracking-wide text-white hover:text-[#F27D26] transition-colors duration-300"
                  >
                    hello@luminastudios.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-neutral-400 group-hover:text-[#F27D26] group-hover:border-[#F27D26]/30 group-hover:bg-[linear-gradient(rgba(242,125,38,0.05),rgba(242,125,38,0.05))] transition-all duration-300">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Phone</h4>
                  <a
                    href="tel:+94766004462"
                    className="text-sm font-medium tracking-wide text-white hover:text-[#F27D26] transition-colors duration-300"
                  >
                    +94 76 600 4462
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-neutral-400 group-hover:text-[#F27D26] group-hover:border-[#F27D26]/30 group-hover:bg-[linear-gradient(rgba(242,125,38,0.05),rgba(242,125,38,0.05))] transition-all duration-300">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Location</h4>
                  <p className="text-sm font-medium tracking-wide text-white">
                    Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="block md:flex md:flex-row md:gap-12 border-t border-white/5 pt-8">
              <div className="space-y-3 mb-10 md:mb-0 relative z-30">
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
                  Studio Accounts
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.linkedin.com/in/kanishka-viduranga-a36990376/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Studio LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.facebook.com/film.by.kv.1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Personal Facebook"
                  >
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.youtube.com/@Film_bykv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Personal YouTube"
                  >
                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.instagram.com/kv___production/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Studio Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>

                </div>
              </div>

              <div className="space-y-3 relative z-20 bg-transparent">
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
                  Personal Accounts
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.youtube.com/@Film_BY_KV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Personal YouTube"
                  >
                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.facebook.com/kanishka.vidurangak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Personal Facebook"
                  >
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@film_by_kv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center shrink-0 w-10 h-10 border border-white/10 rounded-full bg-[linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))] text-white/80 hover:text-[#F27D26] hover:bg-[linear-gradient(rgba(242,125,38,0.1),rgba(242,125,38,0.1))] hover:border-[#F27D26]/40 transition-all duration-300 group"
                    aria-label="Personal TikTok"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 group-hover:scale-110 transition-transform"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 flex flex-col justify-center mt-8 lg:mt-0">
            <form
              onSubmit={handleFormSubmit(onSubmit)}
              className="space-y-5 md:space-y-6 px-5 py-6 pt-4 md:p-10 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl relative shadow-2xl overflow-hidden group/form transform-gpu [backface-visibility:hidden]"
            >
              {/* Form border glow effect */}
              <div className="absolute inset-0 border border-[#F27D26]/0 group-hover/form:border-[#F27D26]/15 rounded-2xl pointer-events-none transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] lg:shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover/form:shadow-[0_0_50px_rgba(242,125,38,0.03)]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26] focus:shadow-[0_0_15px_rgba(242,125,38,0.1)] transition-all duration-300"
                  />
                  {errors.name && <p className="text-red-500 text-xs tracking-wider mt-1">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26] focus:shadow-[0_0_15px_rgba(242,125,38,0.1)] transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-500 text-xs tracking-wider mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  placeholder="Project Collaboration / Music Video shoot"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26] focus:shadow-[0_0_15px_rgba(242,125,38,0.1)] transition-all duration-300"
                />
                {errors.subject && <p className="text-red-500 text-xs tracking-wider mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  placeholder="Tell me about your project, timeline, and vision..."
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#F27D26] focus:ring-1 focus:ring-[#F27D26] focus:shadow-[0_0_15px_rgba(242,125,38,0.1)] transition-all duration-300 resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs tracking-wider mt-1">{errors.message.message}</p>}
              </div>

              {/* Turnstile Widget */}
              <div className="flex flex-col gap-2 pt-2 pb-2">
                <Turnstile
                  siteKey={import.meta.env.VITE_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  options={{ theme: 'dark' }}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError(false);
                  }}
                />
                {turnstileError && (
                 <p className="text-red-500 text-xs tracking-wider">Please complete the security check to continue.</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-[#F27D26] to-[#C6904E] text-white py-4 px-6 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 disabled:bg-neutral-800 disabled:text-neutral-500 transition-all duration-300 flex items-center justify-center gap-3 group/btn cursor-pointer shadow-[0_4px_20px_rgba(242,125,38,0.25)] hover:shadow-[0_4px_30px_rgba(242,125,38,0.45)]"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

              {/* Success Notification */}
              {isSuccess && (
                <div
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-center text-xs tracking-wider"
                >
                  Thank you! Your message has been sent successfully. I'll get back to you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
