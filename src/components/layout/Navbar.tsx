
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { href: '/', label: 'nav.home' },
        { href: '/start', label: 'nav.start' },
        { href: '/rewards', label: 'nav.rewards' },
        { href: '/dashboard', label: 'nav.dashboard' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-white py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="relative z-50">
                    <img src="/assets/images/logo.png" alt="Kelcom" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* Navigation Links and Switcher Group */}
                <div className="flex items-center gap-8">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`text-[18px] font-[350] uppercase tracking-wide transition-colors ${location.pathname === link.href ? 'text-kelcom-cta' : 'text-[#2A2A2A] hover:text-kelcom-cta'
                                    }`}
                            >
                                {t(link.label)}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 relative z-50">
                        <LanguageSwitcher />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-[#333]"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-x-0 top-0 h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-[20px] font-[350] uppercase tracking-wide ${location.pathname === link.href ? 'text-kelcom-cta' : 'text-[#333]'
                                    }`}
                            >
                                {t(link.label)}
                            </Link>
                        ))}
                        {/* No need to repeat Switcher here as it's now visible in the header */}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
