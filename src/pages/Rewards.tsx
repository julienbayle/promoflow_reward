import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Star, Trophy, LayoutDashboard,
    Smartphone, Gamepad2
} from 'lucide-react';

const ExplainerVideo = () => {
    const { t, i18n } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            // Force video reload when src changes
            videoRef.current.load();

            const tracks = videoRef.current.textTracks;
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].language === i18n.language) {
                    tracks[i].mode = 'showing';
                } else {
                    tracks[i].mode = 'disabled';
                }
            }
        }
    }, [i18n.language]);

    return (
        <div className="w-full aspect-video bg-black rounded-[3rem] overflow-hidden relative shadow-2xl border-[6px] border-white/20">
            <video
                ref={videoRef}
                src={i18n.language === 'fr' ? "/explainer.mp4" : "/explainer_en.mp4"}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
            >
                <track
                    src="/subtitles_fr.vtt"
                    kind="subtitles"
                    srcLang="fr"
                    label="Français"
                    default={i18n.language === 'fr'}
                />
                <track
                    src="/subtitles_en.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                    default={i18n.language !== 'fr'}
                />
                {t('rewardsPage.videoError')}
            </video>

            {/* "Video" Label */}
            <div className="absolute top-8 right-8 bg-kelcom-red text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 pointer-events-none shadow-xl">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {t('rewardsPage.videoLabel')}
            </div>
        </div>
    );
};



const Rewards = () => {
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-x-hidden" style={{ background: 'linear-gradient(90deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)' }}>
            {/* Background elements removed as per "fond blanc" request */}

            <div className="max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 3, delay: 0.5 }}
                        className="text-4xl md:text-6xl font-bold text-[#1F2A44] mb-6 uppercase tracking-tighter whitespace-nowrap"
                    >
                        {t('rewardsPage.title')}
                    </motion.h1>
                    <p className="text-[#2A2A2A] max-w-2xl mx-auto font-normal">
                        {t('rewardsPage.subtitle')}
                    </p>
                </div>

                {/* Reward Details Grid - MD Lines 188-192 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}

                        className="space-y-6"
                    >
                        <section
                            className="p-10 rounded-[3rem] shadow-2xl border border-gray-100"
                            style={{ background: 'linear-gradient(90deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)' }}
                        >
                            <div className="flex items-center gap-5 mb-10">
                                <div className="p-4 bg-kelcom-cta text-white rounded-2xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                                    <Star size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-[#1F2A44] uppercase tracking-tighter">{t('rewardsPage.forYou.title')}</h2>
                            </div>
                            <ul className="space-y-5">
                                {[
                                    { text: t('rewardsPage.forYou.discount'), emoji: '💸' },
                                    { text: t('rewardsPage.forYou.vouchers'), emoji: '🎁' },
                                    { text: t('rewardsPage.forYou.donations'), emoji: '🤝' }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-5 p-5 bg-white/40 backdrop-blur-md rounded-[2rem] shadow-sm border border-black/5 hover:translate-x-2 transition-transform cursor-default">
                                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-inner border border-black/5 flex-shrink-0">
                                            {item.emoji}
                                        </div>
                                        <span className="font-normal text-[#2A2A2A]">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="p-10 rounded-[3rem] text-[#1F2A44] shadow-2xl border border-gray-100 relative overflow-hidden group"
                            style={{ background: 'linear-gradient(90deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)' }}
                        >
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                                <Trophy size={200} />
                            </div>
                            <div className="relative z-10 flex flex-col gap-3">
                                <h2 className="text-xl font-bold uppercase tracking-widest opacity-60">{t('rewardsPage.forContact.title')}</h2>
                                <p className="text-5xl font-bold tracking-tighter">{t('rewardsPage.forContact.discount')}</p>
                            </div>
                        </section>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}

                    >
                        <section
                            className="p-10 rounded-[3rem] shadow-2xl h-full flex flex-col border border-gray-100 relative overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)' }}
                        >
                            {/* Decorative background elements */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <motion.div
                                    animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute -top-4 -left-4 text-6xl opacity-10"
                                >
                                    🎈
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
                                    transition={{ duration: 7, repeat: Infinity }}
                                    className="absolute bottom-10 right-4 text-4xl opacity-10"
                                >
                                    ✨
                                </motion.div>
                            </div>

                            <div className="flex items-center gap-5 mb-10 relative z-10">
                                <div className="p-4 bg-kelcom-blue text-white rounded-2xl shadow-lg -rotate-3 relative">
                                    <Trophy size={32} />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-2 -right-2 text-xl"
                                    >
                                        ✨
                                    </motion.div>
                                </div>
                                <div className="relative">
                                    <h2 className="text-3xl font-bold text-[#1F2A44] uppercase tracking-tighter">{t('rewardsPage.draw.title')}</h2>
                                    <motion.span
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute -top-6 -right-8 text-2xl hidden sm:block"
                                    >
                                        🎉
                                    </motion.span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-8 relative z-10">
                                <p className="text-[#2A2A2A] font-normal">
                                    "{t('rewardsPage.draw.text')}"
                                </p>
                                <div className="bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-gray-100 shadow-inner relative overflow-hidden group">
                                    {/* Small floating gift inside the box */}
                                    <motion.div
                                        animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="absolute top-2 right-4 text-2xl opacity-20 pointer-events-none group-hover:opacity-50 transition-opacity"
                                    >
                                        🎁
                                    </motion.div>

                                    <p className="text-sm font-normal text-[#2A2A2A]/50 uppercase tracking-[0.3em] mb-8 text-center">Lots exceptionnels cette année :</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl shadow-lg group">
                                            <Gamepad2 className="text-kelcom-blue group-hover:scale-110 transition-transform" size={40} />
                                            <span className="font-normal text-xs uppercase text-center">{t('rewards.prizes.ps5')}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl shadow-lg group">
                                            <Smartphone className="text-kelcom-red group-hover:scale-110 transition-transform" size={40} />
                                            <span className="font-normal text-xs uppercase text-center">{t('rewards.prizes.scooter')}</span>
                                        </div>
                                    </div>
                                    <p className="mt-8 text-center text-xs font-normal text-kelcom-cta uppercase tracking-widest animate-pulse">
                                        + 10 autres cadeaux de prestige !
                                    </p>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                </div>



                {/* Video Explainer Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <span className="px-4 py-1.5 bg-gray-100 text-[#2A2A2A] rounded-full text-[10px] font-normal uppercase tracking-widest mb-4 inline-block">
                            {t('rewardsPage.videoSectionBadge')}
                        </span>
                        <h2 className="text-3xl font-bold text-[#1F2A44] uppercase tracking-tighter">{t('rewardsPage.videoSectionTitle')}</h2>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <ExplainerVideo />
                    </div>
                </div>

                {/* Final CTA - MD Line 210 */}
                <div className="flex justify-center pb-12">
                    <Link
                        to="/dashboard"
                        className="h-16 bg-kelcom-cta text-white flex items-center justify-center gap-4 rounded-full font-normal uppercase tracking-widest shadow-2xl shadow-kelcom-cta/40 hover:bg-[#d6654e] hover:scale-[1.02] active:scale-95 transition-all px-12 min-w-[320px]"
                    >
                        <LayoutDashboard size={20} />
                        {t('rewardsPage.ctaDashboard')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
