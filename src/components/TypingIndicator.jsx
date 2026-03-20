import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TypingIndicator = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex justify-start w-full mb-6"
        >
            <div className="flex flex-row gap-4 max-w-[85%]">
                <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-glow to-blue-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                        <Sparkles size={16} className="text-white" />
                    </div>
                </div>

                <div className="flex items-center gap-1.5 px-5 py-4 rounded-2xl glass-panel rounded-tl-sm w-24">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-cosmic-glow/80"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-cosmic-glow/80"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-cosmic-glow/80"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default TypingIndicator;
