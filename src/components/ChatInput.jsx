import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [message]);

    return (
        <div className="relative">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-end w-full gap-2 p-2 glass-panel rounded-2xl"
            >
                <button
                    type="button"
                    className="p-3 text-gray-400 transition-colors rounded-xl hover:text-cosmic-glow hover:bg-white/5"
                    disabled={disabled}
                >
                    <Upload size={20} />
                </button>

                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me about the cosmos..."
                    disabled={disabled}
                    rows={1}
                    className="flex-1 max-h-[120px] py-3 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-white placeholder-gray-400/70"
                />

                <AnimatePresence>
                    {message.trim() && (
                        <motion.button
                            type="submit"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={disabled}
                            className="p-3 text-white transition-shadow rounded-xl bg-gradient-to-r from-cosmic-glow to-blue-500 hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </form>

            <p className="mt-2 text-xs text-center text-gray-500">
                Cosmic Companion can make mistakes. Consider verifying celestial facts.
            </p>
        </div>
    );
};

export default ChatInput;
