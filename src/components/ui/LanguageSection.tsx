import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'fr', label: 'Français', native: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' }
];

export const LanguageSection = () => {
    const { i18n, t } = useTranslation();
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
        <section className="w-full py-16 px-6 bg-[#f1f5f9] relative z-20">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-3 text-[#563d40] mb-2 text-center">
                        <Globe size={32} className="text-kelcom-cta" />
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                            {t('nav.select_language', 'Choisir votre langue')}
                        </h2>
                    </div>

                    <div className="relative w-full max-w-md" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-kelcom-cta/10 shadow-xl hover:border-kelcom-cta/30 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">{currentLang.flag}</span>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-kelcom-cta uppercase tracking-widest leading-none mb-1">Current Language</p>
                                    <p className="text-xl font-black text-[#563d40]">{currentLang.native}</p>
                                </div>
                            </div>
                            <ChevronDown size={24} className={`text-[#563d40]/40 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 10, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                    className="absolute inset-x-0 top-full bg-white rounded-[2rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border border-[#563d40]/5 overflow-hidden z-50 p-2"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${currentLang.code === lang.code
                                                ? 'bg-kelcom-cta/5 text-kelcom-cta'
                                                : 'text-[#563d40] hover:bg-[#f1f5f9]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl">{lang.flag}</span>
                                                <div className="text-left">
                                                    <p className="font-black leading-tight">{lang.native}</p>
                                                    <p className="text-[10px] uppercase font-bold opacity-50">{lang.label}</p>
                                                </div>
                                            </div>
                                            {currentLang.code === lang.code && (
                                                <div className="w-6 h-6 bg-kelcom-cta rounded-full flex items-center justify-center text-white shadow-sm">
                                                    <Check size={14} strokeWidth={4} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
