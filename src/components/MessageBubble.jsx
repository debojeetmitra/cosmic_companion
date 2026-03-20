import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const MessageBubble = ({ message, isBot }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            className={clsx(
                "flex w-full mb-6",
                isBot ? "justify-start" : "justify-end"
            )}
        >
            <div className={clsx(
                "flex gap-4 max-w-[85%] md:max-w-[75%]",
                isBot ? "flex-row" : "flex-row-reverse"
            )}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {isBot ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-glow to-blue-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                            <Sparkles size={16} className="text-white" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <User size={16} className="text-gray-300" />
                        </div>
                    )}
                </div>

                {/* Message Content */}
                <div className={clsx(
                    "px-5 py-3.5 rounded-2xl shadow-lg leading-relaxed text-sm md:text-base whitespace-pre-wrap",
                    isBot
                        ? "glass-panel text-gray-100 rounded-tl-sm border-white/10"
                        : "bg-gradient-to-r from-cosmic-accent to-blue-600 text-white rounded-tr-sm border-none"
                )}>
                    {message}
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
