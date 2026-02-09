import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Mail, Loader2, AlertCircle, Download, ArrowLeft, Calendar,
    CheckCircle, Send, Gamepad2, Award, Gift, Plane, Smartphone,
    LayoutDashboard, Trophy, Info, Clock, Sparkles
} from 'lucide-react';

interface Recommendation {
    id: string;
    userEmail: string;
    contactEmail: string;
    message?: string;
    status: string;
    rewardName?: string;
    date: string;
    lastUpdate: string;
}

const Dashboard = () => {
    const { t } = useTranslation();

    // --- TRACKING STATE ---
    const [searchEmail, setSearchEmail] = useState('');
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    // --- FORM STATE ---
    const [formUserEmail, setFormUserEmail] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // --- WHEEL STATE ---
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [hasSpun, setHasSpun] = useState(false);
    const [wonPrize, setWonPrize] = useState<string | null>(null);

    const prizes = [
        { Angle: 36, Icon: Gamepad2, Label: t('rewardsPage.wheel.ps5') || "PS5" },
        { Angle: 108, Icon: Award, Label: t('rewardsPage.wheel.scooter') || "Scooter" },
        { Angle: 180, Icon: Gift, Label: t('rewardsPage.wheel.voucher') || "Bon d'achat" },
        { Angle: 252, Icon: Plane, Label: t('rewardsPage.wheel.trip') || "Voyage" },
        { Angle: 324, Icon: Smartphone, Label: t('rewardsPage.wheel.phone') || "Smartphone" }
    ];

    // --- TRACKING LOGIC ---
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearchLoading(true);

        setTimeout(() => {
            const allRecs: Recommendation[] = JSON.parse(localStorage.getItem('kelcom_recommendations') || '[]');
            const filteredRecs = allRecs.filter(rec => rec.userEmail === searchEmail);
            setRecommendations(filteredRecs);
            setIsSearchLoading(false);
        }, 1200);
    };

    // --- FORM LOGIC ---
    const handleValidateForm = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!formUserEmail || !contactEmail || !message) return;
        setIsSubmitting(true);

        setTimeout(() => {
            const existing: Recommendation[] = JSON.parse(localStorage.getItem('kelcom_recommendations') || '[]');

            if (existing.some(rec => rec.contactEmail === contactEmail)) {
                setFormError("Désolé ce contact est déjà recommandé, veuillez en choisir un autre.");
                setIsSubmitting(false);
                return;
            }

            const userRecs = existing.filter(r => r.userEmail === formUserEmail);
            if (userRecs.length >= 1) {
                setFormError("Désolé, chaque apporteur d'affaire a droit à recommander 1 seul contact.");
                setIsSubmitting(false);
                return;
            }

            setIsSubmitting(false);
            setIsValidated(true);
        }, 1500);
    };

    // --- WHEEL LOGIC ---
    const spinWheel = () => {
        if (isSpinning || !isValidated || hasSpun) return;
        setIsSpinning(true);

        const extraDegrees = Math.floor(Math.random() * 360);
        const spinDegrees = (10 + Math.floor(Math.random() * 5)) * 360 + extraDegrees;
        const newRotation = rotation + spinDegrees;
        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setHasSpun(true);

            const normalizedRotation = newRotation % 360;
            const winningAngle = (360 - normalizedRotation) % 360;

            const prize = prizes.find(p => {
                const diff = Math.abs(p.Angle - winningAngle);
                return diff <= 32 || diff >= 328;
            });

            const prizeLabel = prize ? prize.Label : prizes[0].Label;
            setWonPrize(prizeLabel);

            const existing: Recommendation[] = JSON.parse(localStorage.getItem('kelcom_recommendations') || '[]');
            const newRec: Recommendation = {
                id: Math.random().toString(36).substr(2, 9),
                userEmail: formUserEmail,
                contactEmail: contactEmail,
                message: message,
                status: 'WAITING_FOR_CONTACT',
                rewardName: prizeLabel,
                date: new Date().toISOString().split('T')[0],
                lastUpdate: new Date().toISOString().split('T')[0]
            };
            localStorage.setItem('kelcom_recommendations', JSON.stringify([...existing, newRec]));

            if (searchEmail === formUserEmail) {
                setRecommendations([...existing, newRec]);
            }
        }, 4000);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'OK_REWARDED':
            case 'OK_TO_BE_REWARDED': return 'bg-green-100 text-green-700 border-green-200';
            case 'FAILED': return 'bg-red-100 text-red-700 border-red-200';
            case 'FAILED_TO_CONTACT': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-x-hidden bg-background-main">
            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center mb-10"
                >
                    <div className="flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-normal text-[#2A2A2A] uppercase tracking-tighter">
                            {t('dashboard.title')}
                        </h1>
                        <p className="text-[#1F2A44]/60 font-normal uppercase text-xs tracking-widest mt-2 flex items-center gap-2">
                            <LayoutDashboard size={14} /> Gérer & Suivre vos recommandations
                        </p>
                    </div>
                    <Link to="/" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-background-dark shadow-xl hover:scale-110 active:scale-95 transition-all border border-black/5 group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center mb-12 relative px-10 py-10 self-center mx-auto w-full max-w-4xl"
                >
                    {/* Festive Emojis and Icons */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-10 text-5xl animate-bounce">🥳</div>
                        <div className="absolute top-4 right-12 text-4xl animate-pulse">🎁</div>
                        <div className="absolute bottom-10 left-14 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
                        <div className="absolute bottom-8 right-10 text-5xl animate-pulse" style={{ animationDelay: '0.3s' }}>🎁</div>

                        {/* Colored Confetti for white background */}
                        {[...Array(25)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 rounded-full opacity-30"
                                style={{
                                    backgroundColor: i % 3 === 0 ? '#1F8083' : i % 3 === 1 ? '#EF7359' : '#11C5A2',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    transform: `scale(${Math.random()})`
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center relative z-10 w-full">
                        <div className="text-5xl md:text-8xl font-black text-transparent italic tracking-tighter text-center relative leading-tight max-w-4xl"
                            style={{
                                WebkitTextStroke: '2px #1F8083',
                                backgroundImage: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)',
                                WebkitBackgroundClip: 'text'
                            }}>
                            20 ANS D'EXISTENCE
                            <span className="absolute inset-0 translate-x-1 translate-y-1 opacity-30 select-none pointer-events-none" style={{ WebkitTextStroke: '1.5px #1F8083' }}>20 ANS D'EXISTENCE</span>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-[#1F2A44] font-black uppercase tracking-[0.4em] text-[14px] bg-white/80 backdrop-blur-md px-10 py-3 rounded-full shadow-sm border border-gray-100">
                            <Sparkles size={18} className="animate-spin-slow text-kelcom-cta" />
                            Partenariat & Réussite Kelcom
                            <Sparkles size={18} className="animate-spin-slow text-kelcom-cta" />
                        </div>
                    </div>
                </motion.div>


                {/* NEW RECOMMENDATION SECTION (Integrated Form & Wheel) */}
                <section className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full p-8 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden text-white border border-white/10"
                        style={{ background: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)' }}
                    >
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">

                            {/* LEFT: FORM OR SUCCESS */}
                            <div className="w-full lg:w-1/2 h-full">
                                <AnimatePresence mode="wait">
                                    {hasSpun ? (
                                        <motion.div
                                            key="success-message"
                                            initial={{ opacity: 0, scale: 0.9, x: -30 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            className="space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left"
                                        >
                                            <div className="p-6 bg-white/10 rounded-[2.5rem] shadow-xl border border-white/20 backdrop-blur-md">
                                                <Trophy size={64} className="text-white" />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-5xl font-normal text-white uppercase tracking-tight leading-none">
                                                    Bravo !
                                                </h2>
                                                <div className="bg-white px-10 py-6 rounded-[2.5rem] border border-gray-100 inline-block shadow-2xl transform hover:scale-105 transition-transform cursor-default">
                                                    <p className="text-[#2A2A2A]/40 text-[10px] font-normal uppercase tracking-[0.3em] mb-2 text-center">Vous avez remporté :</p>
                                                    <p className="text-4xl md:text-5xl font-normal text-[#1F2A44] uppercase text-center flex items-center gap-4">
                                                        🎁 {wonPrize}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-white/90 text-xl font-normal leading-relaxed max-w-md">
                                                Toute l'équipe Kelcom vous remercie ! Votre cadeau a bien été enregistré et vous sera envoyé dès que votre contact recommandé passera sa première commande.
                                            </p>
                                            <div className="pt-4 flex items-center gap-4">
                                                <div className="bg-white/20 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                                                    <Info size={20} className="text-white/50" />
                                                    <p className="text-white font-black uppercase text-xs tracking-widest">Suivez l'avancement ci-dessous</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="recommendation-form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -30 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-3">
                                                <h2 className="text-3xl md:text-4xl font-normal text-white uppercase tracking-tight leading-tight">
                                                    Recommander un contact
                                                </h2>
                                                <p className="text-white/80 text-lg font-normal max-w-md leading-snug">
                                                    Participez à notre programme et débloquez immédiatement votre cadeau sur la roue.
                                                </p>
                                            </div>

                                            <form onSubmit={handleValidateForm} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-normal uppercase tracking-[0.2em] text-white/50 ml-1">
                                                            {t('rewardsPage.form.yourEmail')}
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={formUserEmail}
                                                            onChange={(e) => setFormUserEmail(e.target.value)}
                                                            required
                                                            disabled={isValidated}
                                                            placeholder="votre@email.com"
                                                            className="w-full px-6 py-4 bg-white/10 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all disabled:opacity-50 font-normal"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-normal uppercase tracking-[0.2em] text-white/50 ml-1">
                                                            {t('rewardsPage.form.contactEmail')}
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={contactEmail}
                                                            onChange={(e) => setContactEmail(e.target.value)}
                                                            required
                                                            disabled={isValidated}
                                                            placeholder="le-contact@email.com"
                                                            className="w-full px-6 py-4 bg-white/10 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all disabled:opacity-50 font-normal"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-normal uppercase tracking-[0.2em] text-white/50 ml-1">
                                                        Votre message d'introduction
                                                    </label>
                                                    <textarea
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        required
                                                        disabled={isValidated}
                                                        rows={4}
                                                        placeholder="Dites à votre contact pourquoi vous nous recommandez..."
                                                        className="w-full px-6 py-4 bg-white/10 border-2 border-white/10 rounded-[2rem] text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all resize-none disabled:opacity-50 font-normal"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-normal uppercase tracking-[0.2em] text-white/50 ml-1">
                                                        Copie carbone (CC)
                                                    </label>
                                                    <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 shadow-inner">
                                                        <Mail size={18} className="text-white/40" />
                                                        <input
                                                            type="text"
                                                            value="recommandation@kelcom.fr"
                                                            readOnly
                                                            className="bg-transparent text-white/90 font-normal outline-none w-full text-sm"
                                                        />
                                                        <div className="px-3 py-1 bg-white/10 rounded-lg text-[9px] uppercase tracking-tighter text-white/40 border border-white/5">
                                                            Automatique
                                                        </div>
                                                    </div>
                                                </div>

                                                {formError && (
                                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 text-red-100 font-bold text-sm bg-red-600/40 p-5 rounded-2xl border border-red-400/30 shadow-lg" role="alert">
                                                        <AlertCircle size={20} className="flex-shrink-0" />
                                                        <span>{formError}</span>
                                                    </motion.div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || isValidated || !formUserEmail || !contactEmail || !message}
                                                    className={`w-full h-20 rounded-[2rem] font-normal uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-4 shadow-2xl ${isValidated
                                                        ? 'bg-green-500 text-white cursor-default scale-95'
                                                        : 'bg-kelcom-cta text-white hover:bg-[#d6654e] hover:scale-[1.02] active:scale-95'
                                                        } disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed`}
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="animate-spin" size={24} />
                                                    ) : isValidated ? (
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle size={24} strokeWidth={3} />
                                                            <span>Validé !</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <Send size={24} />
                                                            <span>Envoyer ma recommandation</span>
                                                        </div>
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* RIGHT: THE GIFT WHEEL SECTION */}
                            <div className="w-full lg:w-1/2 flex justify-center perspective-1000">

                                <div className={`relative w-full max-w-[500px] aspect-square transition-all duration-1000 ${!isValidated && !hasSpun ? 'grayscale blur-lg opacity-40 scale-90 pointer-events-none' : 'scale-100 drop-shadow-[0_45px_65px_rgba(0,0,0,0.5)]'}`}>

                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[25%] w-16 h-24 bg-[#cf0617] z-30 shadow-2xl"
                                        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />

                                    <motion.div
                                        animate={{ rotate: rotation }}
                                        transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative w-full h-full rounded-full border-[18px] border-white shadow-[0_0_80px_rgba(255,255,255,0.3)] overflow-hidden"
                                    >
                                        {/* Wheel Sections - Pastel Palette from MD */}
                                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#F4E8E5_0deg_72deg,#EEF2EF_72deg_144deg,#DCEDEA_144deg_216deg,#F4E8E5_216deg_288deg,#EEF2EF_288deg_360deg)]" />

                                        <div className="absolute inset-0">
                                            {prizes.map((p, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute inset-0 flex items-start justify-center pt-12"
                                                    style={{ transform: `rotate(${p.Angle}deg)` }}
                                                >
                                                    <div className="flex flex-col items-center gap-2" style={{ transform: `rotate(-${p.Angle}deg)` }}>
                                                        <div className="p-4 bg-white/50 backdrop-blur-md rounded-full shadow-lg ring-2 ring-white/10">
                                                            <p.Icon size={32} className="text-[#00767a] drop-shadow-sm" />
                                                        </div>
                                                        <span className="text-[11px] font-black text-[#00767a] uppercase tracking-tighter drop-shadow-sm text-center max-w-[90px] leading-tight">
                                                            {p.Label}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Center Spin Button - Now with Check icon as per MD line 237 */}
                                    <button
                                        onClick={spinWheel}
                                        disabled={isSpinning || hasSpun || !isValidated}
                                        className={`absolute w-44 h-44 rounded-full border-[10px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-[#00767a] transition-all transform hover:scale-110 active:scale-90 ${hasSpun ? 'bg-green-500 text-white' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]'} group ring-0`}
                                        style={!hasSpun ? { background: 'white' } : {}}
                                    >
                                        {hasSpun ? (
                                            <div className="flex flex-col items-center">
                                                <CheckCircle size={64} className="mb-2" />
                                                <span className="text-[10px] font-normal uppercase tracking-widest">Gagné !</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-4 bg-gray-50 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                                    <CheckCircle size={36} />
                                                </div>
                                                <span className="text-[14px] font-normal uppercase tracking-tighter text-center leading-tight">
                                                    Tourner<br />la roue
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </section>

                {/* TRACKING SECTION */}
                <section className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-10 md:p-14 rounded-[4rem] shadow-xl border border-white/10 flex flex-col items-center lg:items-start overflow-hidden relative text-white"
                        style={{ background: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)' }}
                    >
                        {/* Decorative overlay for readability */}
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                        <div className="flex items-center gap-6 mb-12 relative z-10">
                            <div className="p-5 bg-white/10 rounded-3xl shadow-inner border border-white/10 backdrop-blur-md">
                                <Search size={32} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-3xl font-normal uppercase leading-tight">Suivre mes recommandations</h2>
                                <p className="text-white/60 font-normal uppercase text-[10px] tracking-widest">Identifiez-vous pour voir l'avancement de vos parrainages</p>
                            </div>
                        </div>

                        <form onSubmit={handleSearch} className="w-full flex flex-col md:flex-row gap-8 items-end relative z-10">
                            <div className="flex-1 w-full">
                                <label className="block text-[11px] font-normal uppercase tracking-[0.3em] text-white/40 mb-4 ml-1">
                                    {t('dashboard.form.yourEmail')}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={24} />
                                    <input
                                        type="email"
                                        required
                                        value={searchEmail}
                                        onChange={(e) => setSearchEmail(e.target.value)}
                                        placeholder={t('dashboard.form.placeholder')}
                                        className="w-full pl-16 pr-8 py-6 bg-white/10 rounded-[2.5rem] border-2 border-white/10 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all font-normal text-white shadow-inner text-lg placeholder:text-white/20"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSearchLoading}
                                className="w-full md:w-auto px-16 py-6 bg-kelcom-cta text-white rounded-[2.5rem] font-normal uppercase tracking-[0.2em] shadow-2xl hover:bg-[#d6654e] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 text-lg"
                            >
                                {isSearchLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                                {t('dashboard.form.submit')}
                            </button>
                        </form>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {recommendations && (
                            <motion.div
                                key="recommendations-results"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="bg-white rounded-[4rem] shadow-2xl border border-black/5 overflow-hidden"
                            >
                                <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                    <h3 className="text-2xl font-normal text-[#2A2A2A] uppercase tracking-tight flex items-center gap-3">
                                        <LayoutDashboard className="text-kelcom-cta" />
                                        Tableau de bord de parrainage
                                    </h3>
                                    <div className="px-4 py-2 bg-white rounded-full border border-gray-100 text-[10px] font-normal text-[#1F2A44]/40 uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={14} /> Mis à jour en temps réel
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 text-[#1F2A44]/40 uppercase text-[11px] font-normal tracking-[0.3em] border-b border-gray-100">
                                                <th className="px-12 py-10 uppercase tracking-widest">{t('dashboard.table.contact')}</th>
                                                <th className="px-12 py-10 uppercase tracking-widest">{t('dashboard.table.status')}</th>
                                                <th className="px-12 py-10 uppercase tracking-widest hidden md:table-cell">{t('dashboard.table.date')}</th>
                                                <th className="px-12 py-10 uppercase tracking-widest hidden lg:table-cell">{t('dashboard.table.lastUpdate')}</th>
                                                <th className="px-12 py-10 text-center uppercase tracking-widest">{t('dashboard.table.download')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5">
                                            {recommendations.length > 0 ? recommendations.map((rec) => (
                                                <tr key={rec.id} className="hover:bg-background-light/5 transition-colors group">
                                                    <td className="px-12 py-10">
                                                        <div className="flex flex-col gap-2">
                                                            <span className="font-normal text-[#2A2A2A] text-lg group-hover:text-kelcom-cta transition-colors">{rec.contactEmail}</span>
                                                            {rec.rewardName && (
                                                                <span className="w-fit px-3 py-1 bg-kelcom-cta/10 text-kelcom-cta text-[10px] font-normal uppercase rounded-lg flex items-center gap-2 border border-kelcom-cta/20 animate-pulse">
                                                                    <Gift size={12} /> {rec.rewardName}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <div className="flex flex-col" title={t(`dashboard.status.${rec.status}`)}>
                                                            <span className={`w-fit px-5 py-2.5 rounded-full text-[11px] font-normal uppercase border tracking-tight ${getStatusStyle(rec.status)}`}>
                                                                {t(`dashboard.status.${rec.status}`).split(':')[0]}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-10 text-gray-400 font-bold text-sm tracking-wide hidden md:table-cell">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={16} className="text-gray-300" />
                                                            {rec.date}
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-10 text-gray-400 font-bold text-sm tracking-wide hidden lg:table-cell">
                                                        {rec.lastUpdate}
                                                    </td>
                                                    <td className="px-12 py-10 text-center">
                                                        {rec.status === 'OK_REWARDED' ? (
                                                            <button
                                                                className="w-16 h-16 bg-green-500 text-white rounded-[1.75rem] shadow-xl shadow-green-500/20 hover:scale-110 active:scale-95 transition-all flex items-center justify-center mx-auto hover:bg-green-600"
                                                                title="Télécharger votre cadeau"
                                                            >
                                                                <Download size={28} />
                                                            </button>
                                                        ) : (
                                                            <div className="w-16 h-16 bg-gray-100 text-gray-300 rounded-[1.75rem] flex items-center justify-center mx-auto opacity-40 cursor-not-allowed">
                                                                <Download size={28} />
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={5} className="px-12 py-32 text-center">
                                                        <div className="flex flex-col items-center gap-6 max-w-sm mx-auto opacity-20 group">
                                                            <div className="w-32 h-32 bg-background-dark/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                <AlertCircle size={64} />
                                                            </div>
                                                            <p className="font-black uppercase tracking-[0.2em] text-sm leading-relaxed">
                                                                {t('dashboard.status.UNKNOWN')}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Return Button */}
                <div className="mt-20 flex justify-center pb-20">
                    <Link to="/" className="btn-cta border-none shadow-none hover:scale-105 active:scale-95 transition-all flex items-center gap-3 px-14 py-4 h-auto text-lg normal-case">
                        <ArrowLeft size={18} />
                        {t('nav.back')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
