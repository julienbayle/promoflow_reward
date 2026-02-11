import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader2, AlertCircle, Download, ArrowLeft, Calendar,
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

    // --- STATE ---
    const [formUserEmail, setFormUserEmail] = useState('test@kelcom.fr');
    const [contactEmail, setContactEmail] = useState('');
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

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

    // Load recommendations on mount or when email changes
    React.useEffect(() => {
        const allRecs: Recommendation[] = JSON.parse(localStorage.getItem('kelcom_recommendations') || '[]');
        const filteredRecs = allRecs.filter(rec => rec.userEmail === formUserEmail);
        setRecommendations(filteredRecs);
    }, [formUserEmail]);

    // --- FORM LOGIC ---
    const handleValidateForm = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!formUserEmail || !contactEmail) return;
        setIsSubmitting(true);

        setTimeout(() => {
            const existing: Recommendation[] = JSON.parse(localStorage.getItem('kelcom_recommendations') || '[]');

            if (existing.some(rec => rec.contactEmail === contactEmail)) {
                setFormError("Desolé ce contact est deja recommander, veuillez en choisir un autre");
                setIsSubmitting(false);
                return;
            }

            const userRecs = existing.filter(r => r.userEmail === formUserEmail);
            if (userRecs.length >= 1) {
                setFormError("Desolé, chaque apporteur d'affaire a droit a recommander 1 seul contact n'etant pas encore recommandé.");
                setIsSubmitting(false);
                return;
            }

            const newRec: Recommendation = {
                id: Math.random().toString(36).substr(2, 9),
                userEmail: formUserEmail,
                contactEmail: contactEmail,
                status: 'WAITING_FOR_CONTACT',
                date: new Date().toISOString().split('T')[0],
                lastUpdate: new Date().toISOString().split('T')[0]
            };

            existing.push(newRec);
            localStorage.setItem('kelcom_recommendations', JSON.stringify(existing));

            // Update table
            const filtered = existing.filter(rec => rec.userEmail === formUserEmail);
            setRecommendations(filtered);

            setIsSubmitting(false);
            setIsSubmitted(true);
            setIsValidated(false); // Do not activate wheel automatically
            setContactEmail(''); // Reset field
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

            // Check if we are updating an existing recommendation (e.g. from the table)
            const existingIndex = existing.findIndex(rec => rec.userEmail === formUserEmail && rec.contactEmail === contactEmail);

            if (existingIndex !== -1) {
                existing[existingIndex] = {
                    ...existing[existingIndex],
                    rewardName: prizeLabel,
                    lastUpdate: new Date().toISOString().split('T')[0]
                };
            } else {
                const newRec: Recommendation = {
                    id: Math.random().toString(36).substr(2, 9),
                    userEmail: formUserEmail,
                    contactEmail: contactEmail,
                    status: 'WAITING_FOR_CONTACT',
                    rewardName: prizeLabel,
                    date: new Date().toISOString().split('T')[0],
                    lastUpdate: new Date().toISOString().split('T')[0]
                };
                existing.push(newRec);
            }

            localStorage.setItem('kelcom_recommendations', JSON.stringify(existing));

            // Force table update
            const filtered = existing.filter(rec => rec.userEmail === formUserEmail);
            setRecommendations(filtered);
        }, 4000);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'OK_REWARDED':
            case 'OK_TO_BE_REWARDED': return 'bg-green-100 text-green-700 border-green-200';
            case 'FAILED': return 'bg-red-100 text-red-700 border-red-200';
            case 'FAILED_TO_CONTACT': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'TO_BE_QUALIFED': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'IN_CONTACT': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'WAITING_FOR_CONTACT': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-x-hidden bg-background-main">
            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Consolidated Festive Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center mb-16 relative px-10 py-24 self-center mx-auto w-full max-w-5xl rounded-[4rem] overflow-hidden shadow-sm"
                >
                    {/* Background Gift Image and Overlays */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=1200"
                            className="w-full h-full object-cover opacity-15"
                            alt="Festive gifts"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background-main/80 via-transparent to-background-main/80"></div>
                    </div>

                    {/* Festive Elements */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <div className="absolute top-10 left-[15%] text-6xl animate-bounce">🎁</div>
                        <div className="absolute top-16 right-[15%] text-5xl animate-pulse">🎉</div>
                        <div className="absolute bottom-16 left-[20%] text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
                        <div className="absolute bottom-10 right-[20%] text-6xl animate-pulse" style={{ animationDelay: '0.2s' }}>🎁</div>

                        {/* Dense Festive Confetti */}
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 rounded-sm rotate-45 opacity-40"
                                style={{
                                    backgroundColor: i % 3 === 0 ? '#1F8083' : i % 3 === 1 ? '#EF7359' : '#11C5A2',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    transform: `scale(${Math.random()}) rotate(${Math.random() * 360}deg)`
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center relative z-20 w-full">
                        <div className="relative">
                            {/* The "Doublé Transparent" Header Effect */}
                            <h2
                                className="text-6xl md:text-[6.5rem] font-black text-transparent italic tracking-tighter text-center leading-none"
                                style={{
                                    WebkitTextStroke: '3px #1F8083',
                                    WebkitBackgroundClip: 'text',
                                    backgroundImage: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)',
                                    filter: 'drop-shadow(0 10px 20px rgba(31, 128, 131, 0.2))'
                                }}
                            >
                                20 ANS D'EXISTENCE
                            </h2>
                            {/* The shadow layer for "doublé" effect */}
                            <div
                                className="absolute inset-0 translate-x-1.5 translate-y-1.5 opacity-40 select-none pointer-events-none text-6xl md:text-[6.5rem] font-black italic tracking-tighter text-center leading-none"
                                style={{
                                    WebkitTextStroke: '2px #1F8083',
                                    color: 'transparent'
                                }}
                            >
                                20 ANS D'EXISTENCE
                            </div>
                        </div>

                        <div className="mt-12 flex items-center gap-5 text-[#1F2A44] font-black uppercase tracking-[0.4em] text-[15px] bg-white/70 backdrop-blur-xl px-12 py-5 rounded-full shadow-xl border border-white/40 ring-1 ring-black/5">
                            <Sparkles size={20} className="animate-spin-slow text-kelcom-cta" />
                            Partenariat & Réussite Kelcom
                            <Sparkles size={20} className="animate-spin-slow text-kelcom-cta" />
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

                        {/* FORM SECTION */}
                        <div className="w-full h-full">
                            <AnimatePresence mode="wait">
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

                                    <form onSubmit={handleValidateForm} className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-normal uppercase tracking-[0.2em] text-white/50 ml-1">
                                                    {t('rewardsPage.form.yourEmail')}
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formUserEmail}
                                                    onChange={(e) => setFormUserEmail(e.target.value)}
                                                    required
                                                    placeholder="votre@email.com"
                                                    className="w-full px-6 py-5 bg-white/10 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all disabled:opacity-50 font-normal text-lg"
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
                                                    placeholder="le-contact@email.com"
                                                    className="w-full px-6 py-5 bg-white/10 border-2 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/20 focus:outline-none transition-all disabled:opacity-50 font-normal text-lg"
                                                />
                                            </div>
                                        </div>

                                        {formError && (
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 text-red-100 font-bold text-sm bg-red-600/40 p-5 rounded-2xl border border-red-400/30 shadow-lg" role="alert">
                                                <AlertCircle size={20} className="flex-shrink-0" />
                                                <span>{formError}</span>
                                            </motion.div>
                                        )}

                                        {isSubmitted && !isValidated && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-green-100 font-medium text-sm bg-green-500/20 p-5 rounded-2xl border border-green-500/30 shadow-lg">
                                                <CheckCircle size={20} className="flex-shrink-0" />
                                                <span>Recommandation enregistrée ! Cliquez sur "Tourner la roue" dans le tableau ci-dessous pour gagner votre cadeau.</span>
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formUserEmail || !contactEmail}
                                            className={`w-full h-20 rounded-[2rem] font-normal uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-4 shadow-2xl bg-kelcom-cta text-white hover:bg-[#d6654e] hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed`}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin" size={24} />
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <Send size={24} />
                                                    <span>{t('dashboard.form.submit')}</span>
                                                </div>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </section>

                {/* TRACKING SECTION - Table only, no search form */}
                <section className="space-y-12">


                    <AnimatePresence mode="wait">
                        {(isSubmitted || (recommendations && recommendations.length > 0)) && (
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
                                                <th className="px-8 py-10 uppercase tracking-widest">Email du contact recommandé</th>
                                                <th className="px-8 py-10 uppercase tracking-widest">Statut</th>
                                                <th className="px-8 py-10 uppercase tracking-widest hidden md:table-cell">Date de la recommandation</th>
                                                <th className="px-8 py-10 uppercase tracking-widest hidden lg:table-cell">Date de la dernière mise à jour</th>
                                                <th className="px-8 py-10 text-center uppercase tracking-widest">Telechargement de l'envoi du cadeau</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5">
                                            {recommendations && recommendations.length > 0 ? recommendations.map((rec) => (
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
                                                    <td className="px-8 py-10 text-center">
                                                        {!rec.rewardName ? (
                                                            <button
                                                                onClick={() => {
                                                                    setFormUserEmail(rec.userEmail);
                                                                    setContactEmail(rec.contactEmail);
                                                                    setIsValidated(true); // Exclusively enable wheel via table button
                                                                    setHasSpun(false);
                                                                    setWonPrize(null);
                                                                    setTimeout(() => {
                                                                        const element = document.getElementById('wheel-section');
                                                                        if (element) {
                                                                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                                        }
                                                                    }, 100);
                                                                }}
                                                                className="px-6 py-3 bg-kelcom-cta text-white rounded-full text-[10px] font-normal uppercase tracking-widest hover:scale-105 transition-all shadow-lg animate-bounce"
                                                            >
                                                                Tourner la roue
                                                            </button>
                                                        ) : rec.status === 'OK_REWARDED' ? (
                                                            <button
                                                                className="w-12 h-12 bg-green-500 text-white rounded-[1.25rem] shadow-xl shadow-green-500/20 hover:scale-110 active:scale-95 transition-all flex items-center justify-center mx-auto hover:bg-green-600"
                                                                title="Télécharger votre cadeau"
                                                            >
                                                                <Download size={22} />
                                                            </button>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1 group/item">
                                                                <div className="w-12 h-12 bg-gray-100 text-gray-300 rounded-[1.25rem] flex items-center justify-center mx-auto opacity-40">
                                                                    <Download size={22} />
                                                                </div>
                                                                <span className="text-[9px] uppercase tracking-tighter text-gray-400 group-hover/item:text-kelcom-cta transition-colors">En attente</span>
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

                {/* THE GIFT WHEEL SECTION (NOW BELOW) */}
                {(isValidated || hasSpun) && (
                    <section id="wheel-section" className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden text-white border border-white/10"
                            style={{ background: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)' }}
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />

                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                                {/* LEFT: SUCCESS MESSAGE OR WHEEL TITLE */}
                                <div className="w-full lg:w-1/2">
                                    <AnimatePresence mode="wait">
                                        {hasSpun ? (
                                            <motion.div
                                                key="success-message"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
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
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="wheel-intro"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left"
                                            >
                                                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                                    <Gamepad2 size={40} />
                                                </div>
                                                <h2 className="text-4xl font-normal text-white uppercase tracking-tight leading-tight">
                                                    Tournez la roue des cadeaux !
                                                </h2>
                                                <p className="text-white/80 text-xl font-normal max-w-md">
                                                    Vous avez débloqué un tour de roue. Cliquez sur le bouton central pour découvrir votre récompense.
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* RIGHT: THE WHEEL */}
                                <div className="w-full lg:w-1/2 flex justify-center perspective-1000">
                                    <div className="relative w-full max-w-[500px] aspect-square transition-all duration-1000 scale-100 drop-shadow-[0_45px_65px_rgba(0,0,0,0.5)]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[25%] w-16 h-24 bg-[#cf0617] z-30 shadow-2xl"
                                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />

                                        <motion.div
                                            animate={{ rotate: rotation }}
                                            transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
                                            className="relative w-full h-full rounded-full border-[18px] border-white shadow-[0_0_80px_rgba(255,255,255,0.3)] overflow-hidden"
                                        >
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

                                        <button
                                            onClick={spinWheel}
                                            disabled={isSpinning || hasSpun}
                                            className={`absolute w-44 h-44 rounded-full border-[10px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-[#00767a] transition-all transform hover:scale-110 active:scale-90 ${hasSpun ? 'bg-green-500 text-white' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]'} group`}
                                            style={{
                                                background: hasSpun ? '#22c55e' : 'linear-gradient(90deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)'
                                            }}
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
                                                        touner<br />la roue
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* Return Button */}
                <div className="mt-20 flex justify-center pb-20">
                    <Link to="/" className="h-16 bg-kelcom-cta text-white flex items-center justify-center gap-4 rounded-full font-normal uppercase tracking-widest shadow-2xl shadow-kelcom-cta/40 hover:bg-[#d6654e] hover:scale-[1.02] active:scale-95 transition-all px-12 min-w-[320px]">
                        <ArrowLeft size={18} />
                        {t('nav.back')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
