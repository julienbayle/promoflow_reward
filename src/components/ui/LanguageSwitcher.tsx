import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(l => l.code === i18n.language.split('-')[0]) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-navbar-text/10 shadow-sm hover:border-kelcom-cta/30 transition-all group"
            >
                <div className="text-[11px] font-black text-navbar-text flex items-center gap-2">
                    <span className="uppercase">{currentLang.label}</span>
                </div>
                <ChevronDown size={12} className={`text-navbar-text/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay to ensure smooth interaction */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/5 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 5, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-navbar-text/5 overflow-hidden z-50"
                        >
                            <div className="p-1.5 space-y-0.5">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${currentLang.code === lang.code
                                            ? 'bg-kelcom-cta/5 text-kelcom-cta'
                                            : 'text-navbar-text hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="text-left">
                                                <p className="font-black leading-tight uppercase text-[11px]">{lang.label}</p>
                                            </div>
                                        </div>
                                        {currentLang.code === lang.code && <Check size={12} strokeWidth={3} />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
