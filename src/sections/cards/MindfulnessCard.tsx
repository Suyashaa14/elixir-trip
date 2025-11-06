import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  onExplore: () => void;
};

export default function MindfulnessCard({ title, subtitle, onExplore }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] shadow-sm hover:shadow-md transition-all bg-white">
      {/* Top animated GIF area */}
      <div className="relative h-[320px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-rose-50 to-white">
        <motion.img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG9pbzBpaHJhYjJ3NHVwOWp5eHA4enk3emhoZ2wwbnExYno3cTZwMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/82va27KArDpk9nS97u/giphy.gif"
          alt="Mindfulness Animation"
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />
      </div>

      {/* Text section */}
      <div className="flex flex-col justify-center p-7 text-center">
        <h3 className="text-2xl font-serif font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">{subtitle}</p>

        <button
          onClick={onExplore}
          className="mt-5 inline-flex items-center gap-2 text-gray-900 font-medium tracking-[-0.01em] hover:text-gray-700"
        >
          <span className="underline underline-offset-4 decoration-gray-400 hover:decoration-gray-800">
            Explore Programs
          </span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </button>
      </div>
    </div>
  );
}
