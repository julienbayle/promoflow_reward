import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Star, Trophy, LayoutDashboard,
    Smartphone, Gamepad2
} from 'lucide-react';





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
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold text-[#1F2A44] mb-6 uppercase tracking-tighter whitespace-nowrap"
                    >
                        {t('rewardsPage.title')}
                    </motion.h1>
                    <p className="text-xl text-[#2A2A2A] max-w-2xl mx-auto leading-relaxed font-normal">
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
                                <h2 className="text-3xl font-normal text-[#1F2A44] uppercase tracking-tighter">{t('rewardsPage.forYou.title')}</h2>
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
                                <h2 className="text-xl font-normal uppercase tracking-widest opacity-60">{t('rewardsPage.forContact.title')}</h2>
                                <p className="text-5xl font-normal tracking-tighter">{t('rewardsPage.forContact.discount')}</p>
                            </div>
                        </section>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <section
                            className="p-10 rounded-[3rem] shadow-2xl h-full flex flex-col border border-gray-100"
                            style={{ background: 'linear-gradient(135deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)' }}
                        >
                            <div className="flex items-center gap-5 mb-10">
                                <div className="p-4 bg-kelcom-blue text-white rounded-2xl shadow-lg -rotate-3">
                                    <Trophy size={32} />
                                </div>
                                <h2 className="text-3xl font-normal text-[#1F2A44] uppercase tracking-tighter">{t('rewardsPage.draw.title')}</h2>
                            </div>
                            <div className="flex-1 space-y-8">
                                <p className="text-xl text-[#2A2A2A] leading-relaxed font-normal">
                                    "{t('rewardsPage.draw.text')}"
                                </p>
                                <div className="bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-gray-100 shadow-inner">
                                    <p className="text-sm font-normal text-[#2A2A2A]/50 uppercase tracking-[0.3em] mb-8 text-center">{t('rewardsPage.draw.prizesTitle')}</p>
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
                                        {t('rewardsPage.draw.others')}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </motion.div>
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
