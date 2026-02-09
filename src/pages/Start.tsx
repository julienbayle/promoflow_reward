import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Quote, Star, PhoneIncoming, Phone, UserCheck, Gift } from 'lucide-react';

const Start = () => {
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen pt-24 pb-12 overflow-x-hidden bg-background-main">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black text-[#2A2A2A] mb-14 text-center uppercase tracking-tighter"
                >
                    {t('start.title')}
                </motion.h1>

                {/* Instruction Section - Background Gradient (MD Line 139) */}
                <section
                    className="rounded-[2.5rem] p-10 shadow-2xl text-white border border-white/20 mb-16 max-w-4xl mx-auto"
                    style={{ background: 'linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)' }}
                >
                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="p-4 bg-white/10 rounded-full backdrop-blur-md">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                        <div className="space-y-4">
                            <p className="text-2xl leading-relaxed font-normal">
                                "{t('start.instruction.text')}"
                            </p>
                            <div className="h-px w-32 bg-white/30 mx-auto"></div>
                            <p className="text-sm text-white/70 font-normal tracking-wide">
                                {t('start.footer_note')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Grand Bloc horizontal pour Exemples et Avis */}
                <section className="mb-20 w-full">
                    <div className="flex flex-col lg:flex-row gap-8 w-full">
                        {/* Block 1: Testimonials (Avis des clients) */}
                        <div
                            className="flex-1 rounded-[3rem] p-5"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.14)',
                                border: '1px solid #EAEAEA'
                            }}
                        >
                            <div className="space-y-8">
                                <h2 className="text-3xl font-normal text-[#0070F6] uppercase tracking-tight text-center">
                                    {t('start.testimonials.title')}
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div key={num} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-black/5 relative group hover:scale-[1.02] transition-transform">
                                            <Quote size={24} className="absolute -top-3 -left-2 text-kelcom-red opacity-10 group-hover:opacity-30" />
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={i < Number(t(`start.testimonials.t${num}.rating`) || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-lg text-[#242424] font-normal leading-relaxed mb-6">
                                                "{t(`start.testimonials.t${num}.text`)}"
                                            </p>
                                            <div className="flex items-center gap-3 justify-end">
                                                <div className="w-8 h-[2px] bg-kelcom-cta/30"></div>
                                                <span className="font-normal text-xs uppercase tracking-widest text-[#5B5B5B]">
                                                    {t(`start.testimonials.t${num}.name`)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Block 2: Examples of messages */}
                        <div
                            className="flex-1 rounded-[3rem] p-5"
                            style={{
                                backgroundColor: '#F4F4F4',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.14)',
                                border: '1px solid #EAEAEA'
                            }}
                        >
                            <div className="space-y-8">
                                <h2 className="text-3xl font-normal text-[#0070F6] uppercase tracking-tight text-center">
                                    {t('start.examples.title')}
                                </h2>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((num) => (
                                        <motion.div
                                            key={num}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-white p-8 rounded-[2.5rem] border border-white shadow-lg shadow-black/2"
                                        >
                                            <div className="bg-kelcom-cta/10 inline-block px-4 py-1 rounded-full text-kelcom-cta text-[10px] font-normal uppercase tracking-widest mb-4">
                                                Exemple {num}
                                            </div>
                                            <p className="text-sm font-normal text-[#5B5B5B] mb-3 uppercase tracking-tighter">
                                                Objet: {t(`start.examples.ex${num}.subject`)}
                                            </p>
                                            <p className="text-lg text-[#242424] font-normal leading-relaxed">
                                                "{t(`start.examples.ex${num}.body`)}"
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Section - MD architecture update */}
                <section className="mb-24 px-4 relative">
                    <h2 className="text-4xl font-normal mb-20 text-center text-[#2A2A2A] uppercase tracking-tighter">
                        {t('start.process.title')}
                    </h2>

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 max-w-6xl mx-auto">
                        {[1, 2, 3, 4, 5].map((num) => {
                            return (
                                <div key={num} className="flex flex-col lg:flex-row items-center flex-1 w-full lg:w-auto group">
                                    <div className="flex flex-col items-center text-center gap-6 relative z-10 flex-1">
                                        <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-[#EF7359] relative overflow-hidden p-4`}>
                                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                                            <img
                                                src={`https://images.unsplash.com/photo-${num === 1 ? '1557200134-90327ee9fafa' : num === 2 ? '1520923642038-b4259cedc445' : num === 3 ? '1534536281715-e28d76689b4d' : num === 4 ? '1460925895917-afdab827c52f' : '1549463512-205167098e94'}?auto=format&fit=crop&q=80&w=200`}
                                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                                            />
                                            {num === 1 && <Mail size={32} className="relative z-10" />}
                                            {num === 2 && <PhoneIncoming size={32} className="relative z-10" />}
                                            {num === 3 && <Phone size={32} className="relative z-10" />}
                                            {num === 4 && <UserCheck size={32} className="relative z-10" />}
                                            {num === 5 && <Gift size={32} className="relative z-10" />}
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-normal text-[#2A2A2A]/40 uppercase tracking-[0.2em]">Étape {num}</span>
                                            <p className="text-[#1F2A44] font-normal text-sm uppercase tracking-tighter leading-tight max-w-[160px]">
                                                {t(`start.process.s${num}`)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow between steps (desktop only) */}
                                    {num < 5 && (
                                        <div className="hidden lg:flex items-center justify-center flex-shrink-0 mx-2 text-kelcom-cta/30">
                                            <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    )}
                                    {/* Mobile arrow */}
                                    {num < 5 && (
                                        <div className="lg:hidden text-kelcom-cta/30 my-4">
                                            <ArrowRight size={32} className="rotate-90 group-hover:translate-y-2 transition-transform duration-300" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Final CTAs - MD Line 187 */}
                <div className="flex flex-row gap-8 max-w-2xl mx-auto pb-12">
                    <Link to="/" className="flex-1 h-16 bg-kelcom-cta text-white rounded-full flex items-center justify-center font-normal uppercase tracking-widest hover:bg-[#d6654e] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-kelcom-cta/20">
                        {t('nav.back')}
                    </Link>
                    <Link to="/rewards" className="flex-[2] h-16 bg-kelcom-cta text-white rounded-full flex items-center justify-center gap-4 font-normal uppercase tracking-widest hover:bg-[#d6654e] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-kelcom-cta/40">
                        {t('start.cta')} <ArrowRight size={24} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Start;
