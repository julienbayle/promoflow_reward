import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Globe, Linkedin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-[#00767a] py-12 px-6 font-sans font-normal text-[#2A2A2A]" style={{ backgroundColor: '#eaeaea' }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Logo and About */}
                <div className="flex flex-col gap-6">
                    <Link to="/">
                        <img src={`${import.meta.env.BASE_URL}assets/images/logo.png`} alt="Kelcom" className="h-10 w-auto object-contain self-start" />
                    </Link>
                    <p className="text-sm leading-relaxed">
                        {t('footer.description')}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-kelcom-cta uppercase text-xs tracking-widest">{t('footer.contact')}</h4>
                    <div className="flex items-center gap-3 text-sm">
                        <Phone size={18} className="text-[#00767a]" />
                        <a href="tel:0240352180" className="hover:underline">02 40 35 21 80</a>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#2A2A2A]">
                        <MapPin size={18} className="text-[#00767a] mt-1 flex-shrink-0" />
                        <a
                            href="https://www.google.com/maps/dir//KELCOM,+B%C3%A2t,+1+Rue+Eug%C3%A8ne+Varlin+Les+Dorides+-+B%C3%A2t.+1,+44100+Nantes/@47.2382332,-1.5603345,9z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4805eeb1318161b1:0x989855cf349fb845!2m2!1d-1.5727564!2d47.207407?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Bât, 1 Rue Eugène Varlin Les Dorides - Bât. 1, 44100 Nantes
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-kelcom-cta uppercase text-xs tracking-widest">{t('footer.links')}</h4>
                    <a href="https://www.kelcom.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline">
                        <Globe size={16} /> {t('footer.website')}
                    </a>
                    <a href="https://www.kelcom.fr/information-kelcom/information-legale" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:underline">
                        <ShieldCheck size={16} className="text-[#00767a]" /> {t('footer.legal')}
                    </a>
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-kelcom-cta uppercase text-xs tracking-widest">{t('footer.social')}</h4>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/company/kelcom-fr/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#00767a]/10 rounded-full text-[#00767a] hover:bg-[#00767a] hover:text-white transition-all">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-black/5 text-center text-xs text-gray-500 font-normal">
                {t('footer.rights') + " " + new Date().getFullYear()}
            </div>
        </footer>
    );
};
