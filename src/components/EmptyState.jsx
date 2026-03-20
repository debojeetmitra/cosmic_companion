import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Orbit } from 'lucide-react';

const EmptyState = ({ onSuggestionClick }) => {
    const suggestions = [
        { text: "Tell me about black holes 🕳️", icon: <Orbit size={18} /> },
        { text: "How fast is the speed of light? ✨", icon: <Sparkles size={18} /> },
        { text: "Interesting facts about Mars 🪐", icon: <Rocket size={18} /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center h-full max-w-2xl px-6 mx-auto text-center"
        >
            <div className="p-4 mb-6 rounded-full bg-white/5 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <Rocket size={48} className="text-cosmic-glow drop-shadow-lg" />
            </div>

            <h2 className="mb-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cosmic-glow to-blue-400">
                Cosmic Companion
            </h2>

            <p className="max-w-md mb-8 leading-relaxed text-gray-300/80">
                Your personal guide to the universe. Ask me anything about space, astronomy, and the great unknown.
            </p>

            <div className="grid w-full gap-3 sm:grid-cols-1 md:grid-cols-1">
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSuggestionClick(suggestion.text)}
                        className="flex items-center gap-3 p-4 text-left transition-colors border rounded-xl glass-button text-gray-200"
                    >
                        <span className="p-2 rounded-lg bg-cosmic-glow/20 text-cosmic-glow">
                            {suggestion.icon}
                        </span>
                        <span className="font-medium">{suggestion.text}</span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default EmptyState;
