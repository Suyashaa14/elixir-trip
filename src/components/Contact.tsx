import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message Received",
        description:
          "Thank you for your interest! We'll curate a personalized journey for you and be in touch soon.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-gradient-to-br from-[#F8FFFD] via-[#F9FAFB] to-[#FFFFFF] relative overflow-hidden"
    >
      {/* Glow accents */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#062E2E] mb-4">
            Let's Curate Your Experience
          </h2>
          <p className="text-lg md:text-xl text-[#3A4D47]/80">
            Begin your transformation journey — share your vision, and we’ll
            craft a personalized wellness experience just for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-800">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="rounded-xl border-gray-200 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="rounded-xl border-gray-200 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retreat" className="text-gray-800">
                  Preferred Retreat
                </Label>
                <select
                  id="retreat"
                  name="retreat"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a retreat type</option>
                  <option value="weightloss">Weight Loss Retreat</option>
                  <option value="vegan">Vegan Wellness</option>
                  <option value="mindfulness">Mindfulness Retreat</option>
                  <option value="detox">Digital Detox</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-800">
                  Your Vision
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us what kind of transformation you're seeking..."
                  rows={5}
                  className="rounded-xl border-gray-200 focus:ring-primary resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-90 text-white rounded-full py-5 text-lg font-semibold shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Begin My Journey"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
              <h3 className="text-2xl font-serif font-semibold text-[#062E2E] mb-6">
                Connect With Us
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Email</p>
                    <a
                      href="mailto:hello@elixirtrips.com"
                      className="text-gray-600 hover:text-primary"
                    >
                      hello@elixirtrips.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-600 hover:text-primary"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Locations</p>
                    <p className="text-gray-600">
                      Bali · Tuscany · Costa Rica <br />
                      Swiss Alps · Maldives
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.04)]">
              <h4 className="text-xl font-serif font-semibold text-[#062E2E] mb-4">
                Why Choose Elixir Trips?
              </h4>
              <ul className="space-y-3 text-gray-600">
                {[
                  "Curated luxury wellness experiences",
                  "Expert guides & wellness practitioners",
                  "Personalized transformation journeys",
                  "Sustainable & mindful practices",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✦</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
