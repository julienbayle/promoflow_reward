import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, LayoutDashboard, Sparkles } from 'lucide-react';

const ExplainerVideo = () => {
    const { t, i18n } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                const tracks = videoRef.current.textTracks;
                const currentLang = i18n.language.split('-')[0];

                for (let i = 0; i < tracks.length; i++) {
                    if (tracks[i].language.startsWith(currentLang)) {
                        tracks[i].mode = 'showing';
                    } else {
                        tracks[i].mode = 'disabled';
                    }
                }
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [i18n.language]);

    return (
        <div className="w-full aspect-video bg-black rounded-[3rem] overflow-hidden relative shadow-2xl border-[6px] border-white/20 flex items-center justify-center">
            <video
                key={i18n.language}
                ref={videoRef}
                src={`${import.meta.env.BASE_URL}${t('rewardsPage.videoSrc')}`}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            >
                <track
                    src={`${import.meta.env.BASE_URL}subtitles_fr.vtt`}
                    kind="subtitles"
                    srcLang="fr"
                    label="Français"
                    default={i18n.language.startsWith('fr')}
                />
                <track
                    src={`${import.meta.env.BASE_URL}subtitles_en.vtt`}
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                    default={!i18n.language.startsWith('fr')}
                />
                <p className="text-white p-4">{t('rewardsPage.videoError')}</p>
            </video>

            {/* "Video" Label */}
            <div className="absolute top-8 right-8 bg-kelcom-red text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 pointer-events-none shadow-xl">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {t('rewardsPage.videoLabel')}
            </div>
        </div>
    );
};


const Landing = () => {
    const { t } = useTranslation();

    const wheelItems = [
        { angle: 36, icon: Gift, label: t('rewardsPage.wheel.genericGift') },
        { angle: 108, icon: Gift, label: t('rewardsPage.wheel.genericGift') },
        { angle: 180, icon: Gift, label: t('rewardsPage.wheel.genericGift') },
        { angle: 252, icon: Gift, label: t('rewardsPage.wheel.genericGift') },
        { angle: 324, icon: Gift, label: t('rewardsPage.wheel.genericGift') }
    ];

    return (
        <div className="relative min-h-screen pt-24 overflow-x-hidden">

            {/* 1. Hero Section */}
            <section className="w-full relative overflow-hidden">
                <div className="w-full p-[20px] flex flex-col items-center relative" style={{ backgroundColor: '#c6d6e9' }}>

                    {/* Festive Decorative Layer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                        {[
                            { e: '🎁', top: '10%', left: '5%', size: 'text-5xl', delay: 0 },
                            { e: '🏆', top: '15%', right: '8%', size: 'text-4xl', delay: 1 },
                            { e: '✨', top: '40%', left: '12%', size: 'text-2xl', delay: 0.5 },
                            { e: '🎉', bottom: '20%', left: '8%', size: 'text-5xl', delay: 1.5 },
                            { e: '🎈', bottom: '15%', right: '10%', size: 'text-4xl', delay: 2 },
                            { e: '✨', top: '5%', right: '25%', size: 'text-3xl', delay: 0.8 },
                            { e: '🎁', bottom: '10%', left: '25%', size: 'text-3xl', delay: 1.2 },
                            { e: '🏆', top: '50%', right: '15%', size: 'text-2xl', delay: 2.5 },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={`absolute ${item.size} opacity-40`}
                                style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.2, 0.6, 0.2],
                                    scale: [0.8, 1.1, 0.8],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: item.delay,
                                    ease: "easeInOut"
                                }}
                            >
                                {item.e}
                            </motion.div>
                        ))}

                        {/* Confetti Particles */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`c-${i}`}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: i % 3 === 0 ? '#cf0617' : i % 3 === 1 ? '#00767a' : '#ffffff',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    opacity: [0, 0.4, 0],
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 4,
                                }}
                            />
                        ))}
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="relative z-10 text-3xl font-black text-[#cf0617] text-center uppercase leading-tight max-w-4xl py-4"
                    >
                        {t('hero.title')}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="relative z-10 text-2xl font-black text-[#cf0617] text-center mb-12 leading-tight max-w-4xl"
                    >
                        {t('hero.subtitle')}
                    </motion.h2>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 items-center justify-items-center gap-12 w-full max-w-7xl">
                        {/* Left CTA */}
                        <div className="order-2 lg:order-1 w-full flex flex-col items-center lg:items-end">
                            <Link to="/start" className="btn-cta gap-3 whitespace-nowrap">
                                <Sparkles size={20} />
                                {t('hero.cta')}
                            </Link>
                        </div>

                        {/* Wheel (Center) */}
                        <div className="relative w-[240px] h-[240px] md:w-[380px] md:h-[380px] flex-shrink-0 order-1 lg:order-2 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-white overflow-hidden"
                                style={{
                                    background: `conic-gradient(
                                        #F4E8E5 0deg 72deg,
                                        #EEF2EF 72deg 144deg,
                                        #DCEDEA 144deg 216deg,
                                        #E9F5F3 216deg 288deg,
                                        #FEF9F3 288deg 360deg
                                    )`
                                }}
                            >
                                {/* Segments */}
                                {wheelItems.map((item, i) => (
                                    <div key={i} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 origin-bottom flex flex-col items-center pt-6 md:pt-10" style={{ transform: `translateX(-50%) rotate(${item.angle}deg)` }}>
                                        <div className="flex flex-col items-center" style={{ transform: `rotate(-${item.angle}deg)` }}>
                                            <div className="p-2 md:p-3 bg-white/40 backdrop-blur-sm rounded-full mb-2 shadow-sm">
                                                <item.icon className="text-[#00767a] drop-shadow-sm" size={28} />
                                            </div>
                                            <span className="text-[#00767a] font-black text-[9px] md:text-[11px] uppercase tracking-tighter drop-shadow-sm w-20 md:w-28 text-center leading-tight">
                                                {item.label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Center Hub */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full shadow-2xl border-4 border-[#c6d6e9] flex items-center justify-center z-10">
                                    <Gift size={32} className="text-[#cf0617] md:scale-125" />
                                </div>
                            </div>

                            {/* Pointer */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-[#cf0617] drop-shadow-lg">
                                <div className="w-8 h-12 bg-current" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
                            </div>
                        </div>

                        {/* Right CTA */}
                        <div className="order-3 w-full flex flex-col items-center lg:items-start">
                            <Link to="/dashboard" className="btn-cta gap-3 whitespace-nowrap">
                                <LayoutDashboard size={20} />
                                {t('hero.secondary')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Pourquoi nous recommander */}
            <section className="px-6 py-12 relative z-10 bg-background-dark">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-[#1F2A44] uppercase tracking-tight">{t('why.title')}</h2>
                    <p className="text-[#2A2A2A] font-normal">
                        "{t('why.text')}"
                    </p>
                </div>
            </section>

            {/* 3. Partage du programme */}
            <section className="px-6 py-20" style={{ background: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)' }}>
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">{t('sharing.title')}</h2>
                    <p className="font-normal opacity-90">
                        "{t('sharing.text')}"
                    </p>
                </div>
            </section>

            {/* 4. Comment ça fonctionne */}
            <section className="px-6 py-20 bg-background-dark">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center text-[#1F2A44] uppercase tracking-tighter">{t('steps.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-kelcom-cta text-white flex items-center justify-center font-normal text-2xl shadow-lg leading-none pt-1">
                                    {num}
                                </div>
                                <p className="font-normal text-[#2A2A2A]">{t(`steps.step${num}`)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link to="/start" className="btn-cta gap-3">
                            <Sparkles size={20} />
                            {t('hero.cta')}
                        </Link>
                    </div>
                </div>
            </section>


            {/* 5. Quelle récompense ? */}
            <section className="px-6 py-20" style={{ backgroundColor: '#D3E3E1' }}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black mb-16 text-[#1F2A44] uppercase tracking-tighter text-center">{t('rewards.title')}</h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-kelcom-cta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-kelcom-cta" size={32} />
                            </div>
                            <span className="font-bold text-[#1F2A44] text-lg">{t('rewards.discount')}</span>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-[#cf0617]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-[#cf0617]" size={32} />
                            </div>
                            <span className="font-bold text-[#1F2A44] text-lg">{t('rewards.donation')}</span>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-white/20 text-center hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-blue-600" size={32} />
                            </div>
                            <span className="font-bold text-[#1F2A44] text-lg">{t('rewards.cards')}</span>
                        </div>
                    </div>

                </div>
            </section>
            {/* 6. Vidéo Explicative */}
            <section className="px-6 py-24 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 bg-gray-100 text-[#2A2A2A] rounded-full text-[10px] font-normal uppercase tracking-widest mb-4 inline-block">
                            {t('rewardsPage.videoSectionBadge')}
                        </span>
                        <h2 className="text-4xl font-black text-[#1F2A44] uppercase tracking-tighter mb-4">
                            {t('rewardsPage.videoSectionTitle')}
                        </h2>
                    </div>
                    <ExplainerVideo />
                    <div className="flex justify-center mt-16">
                        <Link to="/start" className="btn-cta gap-3">
                            <Sparkles size={20} />
                            {t('hero.cta')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Landing;
