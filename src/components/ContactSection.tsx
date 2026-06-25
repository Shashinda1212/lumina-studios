import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, ArrowRight, Facebook, Linkedin } from 'lucide-react';

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black text-white py-24 px-6 md:px-16 lg:px-32 xl:px-48 border-t border-white/5 overflow-hidden flex flex-col justify-center">
      {/* Self-contained styling for background dust particles and effects */}
      <style>{`
        @keyframes float-bokeh-contact {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);    opacity: 0; }
          8%   { opacity: 0.45; }
          50%  { transform: translateY(-75px) translateX(22px) scale(1.25); opacity: 0.6; }
          92%  { opacity: 0.15; }
          100% { transform: translateY(-150px) translateX(0px) scale(0.85); opacity: 0; }
        }
        @keyframes orb-drift-contact {
          0%   { transform: translate(0px, 0px) scale(1);   opacity: 0.4; }
          50%  { transform: translate(-40px, 35px) scale(1.08); opacity: 0.6; }
          100% { transform: translate(0px, 0px) scale(1);   opacity: 0.4; }
        }
        @keyframes scanline-scroll-contact {
          0%   { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>

      {/* Cinematic Live Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle central radial gradient glow behind the contact form */}
        <div 
          className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.075)_0%,transparent_65%)] pointer-events-none z-0" 
        />

        {/* Accent Glow Orbs */}
        <div
          style={{ animation: 'orb-drift-contact 20s ease-in-out infinite' }}
          className="absolute right-[5%] top-[15%] w-[450px] h-[450px] bg-[#CE5D01]/5 rounded-full blur-[120px]"
        />
        <div
          style={{ animation: 'orb-drift-contact 25s ease-in-out infinite 3s' }}
          className="absolute left-[5%] bottom-[10%] w-[380px] h-[380px] bg-[#CE5D01]/4 rounded-full blur-[100px]"
        />

        {/* Floating Bokeh Particles */}
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
            className="absolute rounded-full opacity-0 blur-[0.5px] bg-[#CE5D01]"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: '0 0 6px rgba(206,93,1,0.4)',
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          {/* Left Column: Contact Info & Brand Message */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Tag / Badge */}
              <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-1.5 bg-[#CE5D01] rounded-full shadow-[0_0_8px_rgba(206,93,1,0.8)]"></div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#CE5D01] font-semibold">
                  Get In Touch
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest leading-[1.05] mb-8 font-sans"
              >
                Let's <br />
                Create <br />
                <span className="bg-gradient-to-r from-[#CE5D01] via-orange-400 to-[#CE5D01] bg-clip-text text-transparent">
                  Together.
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-neutral-400 text-sm md:text-base leading-relaxed mb-12 max-w-md font-light"
              >
                Have a concept in mind or want to collaborate on an upcoming production? Drop me a message and let's craft something unforgettable.
              </motion.p>
            </div>

            {/* Contact details */}
            <motion.div variants={itemVariants} className="space-y-6 mb-12">
              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 rounded-full bg-white/5 text-neutral-400 group-hover:text-[#CE5D01] group-hover:border-[#CE5D01]/30 group-hover:bg-[#CE5D01]/5 transition-all duration-300">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Email</h4>
                  <a
                    href="mailto:hello@luminastudios.com"
                    className="text-sm font-medium tracking-wide text-white hover:text-[#CE5D01] transition-colors duration-300"
                  >
                    hello@luminastudios.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 rounded-full bg-white/5 text-neutral-400 group-hover:text-[#CE5D01] group-hover:border-[#CE5D01]/30 group-hover:bg-[#CE5D01]/5 transition-all duration-300">
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Phone</h4>
                  <a
                    href="tel:+15550192834"
                    className="text-sm font-medium tracking-wide text-white hover:text-[#CE5D01] transition-colors duration-300"
                  >
                    +1 (555) 019-2834
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 border border-white/10 rounded-full bg-white/5 text-neutral-400 group-hover:text-[#CE5D01] group-hover:border-[#CE5D01]/30 group-hover:bg-[#CE5D01]/5 transition-all duration-300">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Location</h4>
                  <p className="text-sm font-medium tracking-wide text-white">
                    Los Angeles, CA / London, UK
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
                  Studio Accounts
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/80 hover:text-[#CE5D01] hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                    aria-label="Studio Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/80 hover:text-[#CE5D01] hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                    aria-label="Studio Vimeo"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.16 12.93 21 10.97 21c-1.214 0-2.24-1.12-3.08-3.36-.56-2.052-1.119-4.1-1.68-6.15-.653-2.332-1.306-3.498-1.959-3.498-.186 0-.933.653-2.24 1.959L.702 8.547c1.493-1.4 3.08-2.986 4.76-4.76 2.052-1.96 3.64-2.94 4.76-2.94 1.96 0 3.172 1.306 3.64 3.92.373 2.24.653 3.92.84 5.039.466 2.613 1.026 3.92 1.68 3.92.466 0 1.213-.653 2.24-1.959 1.119-1.307 1.772-2.333 1.959-3.08.374-1.306-.093-1.96-1.4-1.96-.56 0-1.12.093-1.68.28 1.12-3.64 3.36-5.46 6.72-5.46 2.425 0 3.545 1.12 3.358 3.36z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/80 hover:text-[#CE5D01] hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                    aria-label="Studio YouTube"
                  >
                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
                  Personal Accounts
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/80 hover:text-[#CE5D01] hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                    aria-label="Personal Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/80 hover:text-[#CE5D01] hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                    aria-label="Personal Facebook"
                  >
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-white/10 rounded-full bg-white/5 text-white/80 hover:text-[#CE5D01] hover:bg-[#CE5D01]/10 hover:border-[#CE5D01]/40 transition-all duration-300 group"
                    aria-label="Personal LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6 p-8 md:p-10 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl relative shadow-2xl overflow-hidden group/form"
            >
              {/* Form border glow effect */}
              <div className="absolute inset-0 border border-[#CE5D01]/0 group-hover/form:border-[#CE5D01]/10 rounded-2xl pointer-events-none transition-colors duration-500" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CE5D01] focus:ring-1 focus:ring-[#CE5D01] focus:shadow-[0_0_15px_rgba(206,93,1,0.1)] transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CE5D01] focus:ring-1 focus:ring-[#CE5D01] focus:shadow-[0_0_15px_rgba(206,93,1,0.1)] transition-all duration-300"
                  />
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
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Music Video shoot"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CE5D01] focus:ring-1 focus:ring-[#CE5D01] focus:shadow-[0_0_15px_rgba(206,93,1,0.1)] transition-all duration-300"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and vision..."
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CE5D01] focus:ring-1 focus:ring-[#CE5D01] focus:shadow-[0_0_15px_rgba(206,93,1,0.1)] transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#CE5D01] text-white py-4 px-6 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#a34a01] disabled:bg-neutral-800 disabled:text-neutral-500 transition-all duration-300 flex items-center justify-center gap-3 group/btn cursor-pointer shadow-[0_4px_20px_rgba(206,93,1,0.2)] hover:shadow-[0_4px_30px_rgba(206,93,1,0.4)]"
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-center text-xs tracking-wider"
                >
                  Thank you! Your message has been sent successfully. I'll get back to you shortly.
                </motion.div>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
