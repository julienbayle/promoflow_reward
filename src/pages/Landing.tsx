
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, CheckCircle, Smartphone, Gamepad2, Award, Plane } from 'lucide-react';

const Landing = () => {
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen pt-24 overflow-x-hidden">

            {/* 1. Hero Section */}
            <section className="w-full">
                <div className="w-full p-[20px] flex flex-col items-center" style={{ backgroundColor: '#c6d6e9' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 3, delay: 0.5 }}
                        className="text-3xl font-black text-[#cf0617] text-center uppercase leading-tight max-w-4xl py-4"
                    >
                        {t('hero.title')}
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 3, delay: 0.5 }}
                        className="text-2xl font-black text-[#cf0617] text-center mb-12 leading-tight max-w-4xl"
                    >
                        {t('hero.subtitle')}
                    </motion.h2>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">
                        {/* Left CTA */}
                        <div className="order-2 lg:order-1 flex flex-col items-center">
                            <Link to="/start" className="btn-cta">
                                {t('hero.cta')}
                            </Link>
                        </div>

                        {/* Wheel (Center) */}
                        <div className="relative w-[200px] h-[200px] md:w-[340px] md:h-[340px] flex-shrink-0 order-1 lg:order-2">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-[8px] border-white shadow-2xl bg-white overflow-hidden"
                                style={{
                                    background: `conic-gradient(
                                        #F4E8E5 0deg 72deg,
                                        #EEF2EF 72deg 144deg,
                                        #DCEDEA 144deg 216deg,
                                        #F4E8E5 216deg 288deg,
                                        #EEF2EF 288deg 360deg
                                    )`
                                }}
                            >
                                {/* Segments */}
                                {[
                                    { angle: 36, icon: Gift, label: 'rewardsPage.wheel.gift1' },
                                    { angle: 108, icon: Gift, label: 'rewardsPage.wheel.gift2' },
                                    { angle: 180, icon: Gift, label: 'rewardsPage.wheel.gift3' },
                                    { angle: 252, icon: Gift, label: 'rewardsPage.wheel.gift4' },
                                    { angle: 324, icon: Gift, label: 'rewardsPage.wheel.gift5' }
                                ].map((item, i) => (
                                    <div key={i} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 origin-bottom flex flex-col items-center pt-8 md:pt-12" style={{ transform: `translateX(-50%) rotate(${item.angle}deg)` }}>
                                        <div className="flex flex-col items-center" style={{ transform: `rotate(-${item.angle}deg)` }}>
                                            <item.icon className="text-[#00767a] drop-shadow-sm mb-2" size={32} />
                                            <span className="text-[#00767a] font-normal text-[10px] md:text-xs uppercase tracking-tighter drop-shadow-sm w-24 text-center leading-tight">
                                                {t(item.label)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Center Hub */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full shadow-xl border-4 border-[#c6d6e9] flex items-center justify-center z-10">
                                    <Gift size={32} className="text-[#cf0617]" />
                                </div>
                            </div>

                            {/* Pointer */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-[#cf0617] drop-shadow-2xl">
                                <div className="w-8 h-12 bg-current" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }} />
                            </div>
                        </div>

                        {/* Right CTA */}
                        <div className="order-3 flex flex-col items-center">
                            <Link to="/dashboard" className="btn-cta">
                                {t('hero.secondary')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Pourquoi nous recommander */}
            <section className="px-6 py-12 relative z-10 bg-background-dark">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-normal mb-6 text-[#1F2A44] uppercase tracking-tight">{t('why.title')}</h2>
                    <p className="text-xl text-[#2A2A2A] font-normal leading-relaxed">
                        "{t('why.text')}"
                    </p>
                </div>
            </section>

            {/* 3. Partage du programme */}
            <section className="px-6 py-20" style={{ background: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)' }}>
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-normal mb-8 uppercase tracking-tight">{t('sharing.title')}</h2>
                    <p className="text-xl font-normal leading-relaxed opacity-90">
                        "{t('sharing.text')}"
                    </p>
                </div>
            </section>

            {/* 4. Comment ça fonctionne */}
            <section className="px-6 py-20 bg-background-dark">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-normal mb-16 text-center text-[#1F2A44] uppercase tracking-tighter">{t('steps.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-kelcom-cta text-white flex items-center justify-center font-normal text-2xl shadow-lg leading-none pt-1">
                                    {num}
                                </div>
                                <p className="text-lg font-normal text-[#2A2A2A]">{t(`steps.step${num}`)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link to="/start" className="btn-cta">{t('hero.cta')}</Link>
                    </div>
                </div>
            </section>


            {/* 5. Quelle récompense ? */}
            <section className="px-6 py-20 bg-background-dark">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-normal mb-16 text-[#1F2A44] uppercase tracking-tighter text-center">{t('rewards.title')}</h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border-b border-gray-100 text-center">
                            <div className="w-16 h-16 bg-kelcom-cta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-kelcom-cta" size={32} />
                            </div>
                            <span className="font-normal text-[#2A2A2A]">{t('rewards.discount')}</span>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border-b border-gray-100 text-center">
                            <div className="w-16 h-16 bg-[#cf0617]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-[#cf0617]" size={32} />
                            </div>
                            <span className="font-normal text-[#2A2A2A]">{t('rewards.donation')}</span>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border-b border-gray-100 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="text-gray-400" size={32} />
                            </div>
                            <span className="font-normal text-[#2A2A2A]">{t('rewards.cards')}</span>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/start" className="btn-cta">{t('hero.cta')}</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
