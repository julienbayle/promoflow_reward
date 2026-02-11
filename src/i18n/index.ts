import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    fr: {
        translation: {
            hero: {
                title: "Programme fidélité et recommandation",
                subtitle: "Votre implication, notre succès, soyez récompensé",
                cta: "Je participe",
                secondary: "Suivre mes recommandations"
            },
            why: {
                title: "Pourquoi nous recommander à votre réseau ?",
                text: "Votre réseau devient un atout. Chaque mise en relation peut se transformer en opportunité concrète. Très simple, un simple email d'introduction de votre part suffit pour participer. Puis, nous gérons tout, sauf le choix de votre récompense"
            },
            sharing: {
                title: "Partage du programme",
                text: "Partagez notre programme avec vos contacts professionnels et institutions publiques. Chaque recommandation concrétisée vous donne droit à une récompense exceptionnelle."
            },
            steps: {
                title: "Comment ça fonctionne",
                step1: "Vous : Email de recommandation",
                step2: "Kelcom : Prise de contact et qualification",
                step3: "Vous: Choix de votre récompense"
            },
            rewards: {
                title: "Quelle récompense ?",
                discount: "Remise sur votre prochaine commande",
                donation: "Don à des associations de votre choix",
                cards: "Cartes cadeaux",
                draw: "Chaque année en novembre, tirage au sort de 3 parrains pour une récompense exceptionnel en fin d'année. Les lots de cette année :",
                prizes: {
                    scooter: "1 trotinnette électrique",
                    ps5: "1 console PS5",
                    others: "10 autres lots"
                }
            },
            nav: {
                lang: "Français",
                home: "Acceuil",
                start: "Temoignage",
                rewards: "Avantages",
                dashboard: "suivre mes Recompenses",
                back: "Retour"
            },
            start: {
                title: "Commencer à recommander",
                instruction: {
                    title: "Comment faire ?",
                    text: "Simplement faire un email à votre contact en lui partageant les bénéfices que vous avez trouver à travailler avec Kelcom pour vos besoins en mettant en copie \"recommandation@kelcom.fr\""
                },
                examples: {
                    title: "Exemples de messages",
                    ex1: {
                        subject: "Recommandation : Kelcom",
                        body: "Bonjour [Prénom], je travaille avec Kelcom pour mes objets publicitaires et j'en suis ravi. Je te les recommande vivement !"
                    },
                    ex2: {
                        subject: "Partenariat intéressant",
                        body: "Hello, je pense que Kelcom pourrait t'aider pour ta communication. Ils sont très pro, je te mets en relation."
                    },
                    ex3: {
                        subject: "Besoin de goodies ?",
                        body: "Salut, pour tes prochains événements, contacte Kelcom de ma part. Leur catalogue est top et le service impeccable."
                    }
                },
                testimonials: {
                    title: "Avis des clients ayant recommandé des contacts",
                    t1: {
                        name: "Jean D.",
                        text: "J'ai recommandé Kelcom à un ami, j'ai reçu ma carte cadeau en 15 jours. Super simple !",
                        rating: 5
                    },
                    t2: {
                        name: "Sophie L.",
                        text: "L'équipe Kelcom a été très pro avec mon contact. Tout le monde est gagnant.",
                        rating: 5
                    },
                    t3: {
                        name: "Marc A.",
                        text: "Une expérience fluide du début à la fin. Ma recommandation a été traitée rapidement.",
                        rating: 4
                    },
                    t4: {
                        name: "Julie R.",
                        text: "Le programme de parrainage est vraiment gratifiant. Je recommande sans hésiter !",
                        rating: 5
                    }
                },
                process: {
                    title: "Les étapes",
                    s1: "Email recommandés",
                    s2: "Votre contact appelle Kelcom",
                    s3: "Kelcom appelle votre contact au bout de 15 jours sans nouvelles",
                    s4: "Kelcom qualifie le contact et le valide dans le programme de recommandation",
                    s5: "Une fois le contact qualifiée, vous pourrez choisir votre récompense."
                },
                cta: "Voir les récompenses",
                footer_note: "Kelcom prendra contact et qualifiera ce contact si celui si ne nous contacte pas directement sous 15 jours suite au message."
            },
            rewardsPage: {
                title: "Programme des récompenses",
                subtitle: "Découvrez toutes les façons dont Kelcom vous remercie pour votre engagement et vos recommandations.",
                forYou: {
                    title: "Pour vous",
                    discount: "2% de remise sur votre prochaine commande",
                    vouchers: "Bon d'achat jusqu'à 200 euros (selon contact proposé)",
                    donations: "Don à des associations de 50 à 500 euros (selon contact proposé)"
                },
                forContact: {
                    title: "Pour votre contact",
                    discount: "5% de remise sur sa première commande"
                },
                draw: {
                    title: "Tirage au sort de fin d'année",
                    text: "En plus de vos récompenses immédiates, chaque recommandation réussie vous offre, ainsi qu'à votre contact, une chance supplémentaire de gagner lors de notre grand tirage au sort annuel en novembre. Disposition d'articles au choix en guise de premier cadeau.",
                    prizes: "Les lots de cette année incluent une trottinette électrique, une console PS5 et bien d'autres surprises !"
                },
                ctaDashboard: "Mes recommandations",
                videoLabel: "Vidéo de présentation",
                videoSectionTitle: "Comment ça se passe ?",
                videoSectionBadge: "Processus complet",
                videoError: "Votre navigateur ne supporte pas la lecture de vidéos.",
                wheel: {
                    gift1: "2% de remise",
                    gitf2: "Bon achat 50€",
                    gift3: "Bon achat 100€",
                    gift4: "Bon achat 200€",
                    gitf5: "Don association",
                    surprise: "Surprise !",
                    wonPrize: "Vous avez gagné : {{prize}}"
                },
                form: {
                    title: "Activer la roue des cadeaux",
                    yourEmail: "Votre email",
                    contactEmail: "Email du contact recommandé",
                    messagePlaceholder: "Votre message...",
                    copyInfo: "Kelcom sera mis en copie automatique.",
                    submitButton: "Envoyer",
                    validating: "Validation...",
                    success: {
                        title: "Recommandation Envoyée !",
                        text: "Vous pouvez maintenant tourner la roue pour découvrir votre cadeau."
                    },
                    error: {
                        alreadyRecommendedByUser: "Désolé, vous avez déjà recommandé un contact.",
                        contactAlreadyRecommended: "Désolé ce contact est déjà recommandé."
                    }
                }
            },
            footer: {
                legal: "Mentions légales",
                website: "Site Kelcom",
                contact: "Contact",
                address: "Adresse",
                social: "Suivez-nous",
                rights: "Tous droits réservés © Kelcom"
            },
            dashboard: {
                title: "Suivre mes recommandations",
                form: {
                    yourEmail: "Votre email",
                    contactEmail: "Email du contact",
                    message: "Message",
                    ccMention: "Kelcom sera mis en copie automatique.",
                    submit: "Envoyer",
                    placeholder: "votre@email.com"
                },
                track: {
                    label: "Suivre mes recommandations (Entrez votre email)"
                },
                table: {
                    contact: "Contact recommandé",
                    status: "Statut",
                    date: "Date",
                    lastUpdate: "Mise à jour",
                    download: "Cadeau"
                },
                status: {
                    title: "Statut de la recommandation",
                    UNKNOWN: "Désolé, nous n'avons pas trouvé de recommandation correspondant à ces emails.",
                    WAITING_FOR_CONTACT: "En attente : Nous attendons que votre contact nous sollicite suite à votre email (premiers 15 jours).",
                    TO_BE_QUALIFED: "À contacter : L'équipe Kelcom va prochainement prendre contact avec votre recommandé.",
                    FAILED_TO_CONTACT: "Échec de contact : Nous n'avons pas réussi à joindre votre contact pour le moment.",
                    IN_CONTACT: "En cours : Nous sommes en échange avec votre contact pour qualifier son besoin.",
                    FAILED: "Non qualifié : Cette recommandation n'a malheureusement pas pu aboutir.",
                    OK_TO_BE_REWARDED: "Félicitations ! Votre recommandation est validée. Vous pouvez maintenant choisir votre récompense.",
                    OK_REWARDED: "Récompense envoyée : Vous avez déjà profité de votre récompense pour cette recommandation. Merci !"
                }
            }
        }
    },
    en: {
        translation: {
            hero: {
                title: "Loyality Program",
                subtitle: "Your involvement, our success, be rewarded",
                cta: "I participate",
                secondary: "Track my recommendations",
                spin: "Spin the wheel"
            },
            why: {
                title: "Why recommend us to your network?",
                text: "Your network becomes an asset. Every introduction can turn into a concrete opportunity. Very simple, just an introductory email from you is enough to participate. Then, we handle everything except the choice of your reward."
            },
            sharing: {
                title: "Program Sharing",
                text: "Share our program with your professional contacts and public institutions. Every finalized recommendation entitles you to an exceptional reward."
            },
            steps: {
                title: "How it works",
                step1: "You: Recommendation email",
                step2: "Kelcom: Contact and qualification",
                step3: "You:Choice of your reward"
            },
            rewards: {
                title: "What reward?",
                discount: "Discount on your next order",
                donation: "Donation to charities of your choice",
                cards: "Gift cards",
                draw: "Every November, a draw of 3 sponsors for an exceptional end-of-year reward. This year's prizes:",
                prizes: {
                    scooter: "1 electric scooter",
                    ps5: "1 PS5 console",
                    others: "10 other prizes"
                }
            },
            nav: {
                lang: "English",
                home: "Home",
                start: "Testimonials",
                rewards: "Advantages",
                dashboard: "Rewards and tracking",
                back: "Back"
            },
            start: {
                title: "Start Recommending",
                instruction: {
                    title: "How to proceed?",
                    text: "Simply send an email to your contact sharing the benefits you've found working with Kelcom for your needs, and CC \"recommandation@kelcom.fr\""
                },
                examples: {
                    title: "Message Examples",
                    ex1: {
                        subject: "Recommendation: Kelcom",
                        body: "Hi [First Name], I work with Kelcom for my promotional items and I'm delighted. I highly recommend them!"
                    },
                    ex2: {
                        subject: "Interesting Partnership",
                        body: "Hello, I think Kelcom could help with your communication. They are very professional, I'm introducing you."
                    },
                    ex3: {
                        subject: "Need Goodies?",
                        body: "Hi, for your next events, contact Kelcom on my behalf. Their catalog is great and the service is impeccable."
                    }
                },
                testimonials: {
                    title: "Customer reviews who recommended contacts",
                    t1: {
                        name: "John D.",
                        text: "I recommended Kelcom to a friend, I received my gift card in 15 days. Super simple!",
                        rating: 5
                    },
                    t2: {
                        name: "Sophie L.",
                        text: "The Kelcom team was very professional with my contact. Everyone wins.",
                        rating: 5
                    },
                    t3: {
                        name: "Mark A.",
                        text: "A smooth experience from start to finish. My recommendation was processed quickly.",
                        rating: 4
                    },
                    t4: {
                        name: "Julie R.",
                        text: "The referral program is really rewarding. I recommend without hesitation!",
                        rating: 5
                    }
                },
                process: {
                    title: "The steps",
                    s1: "Recommended email",
                    s2: "Your contact calls Kelcom",
                    s3: "Kelcom calls your contact after 15 days without news",
                    s4: "Kelcom qualifies the contact and validates it in the recommendation program",
                    s5: "Once the contact is qualified, you can choose your reward."
                },
                cta: "View rewards",
                footer_note: "Kelcom will contact and qualify this contact if they do not contact us directly within 15 days after the message."
            },
            rewardsPage: {
                title: "Rewards Program",
                subtitle: "Discover all the ways Kelcom thanks you for your commitment and recommendations.",
                forYou: {
                    title: "For You",
                    discount: "2% discount on your next order",
                    vouchers: "Voucher up to 200 euros (depending on the contact proposed)",
                    donations: "Donation to charities from 50 to 500 euros (depending on the contact proposed)"
                },
                forContact: {
                    title: "For Your Contact",
                    discount: "5% discount on their first order"
                },
                draw: {
                    title: "Year-End Draw",
                    text: "In addition to your immediate rewards, every successful recommendation gives you and your contact an extra chance to win in our grand annual draw in November. A choice of items available as a first gift.",
                    prizes: "This year's prizes include an electric scooter, a PS5 console, and many other surprises!"
                },
                ctaDashboard: "My recommendations",
                videoLabel: "Presentation Video",
                videoSectionTitle: "How does it work?",
                videoSectionBadge: "Complete process",
                videoError: "Your browser does not support the video tag.",
                wheel: {
                    gift1: "2% discount",
                    gitf2: "50€ voucher",
                    gift3: "100€ voucher",
                    gift4: "200€ voucher",
                    gitf5: "Association donation",
                    surprise: "Surprise!",
                    wonPrize: "You won: {{prize}}"
                },
                form: {
                    title: "Activate the Gift Wheel",
                    yourEmail: "Your email",
                    contactEmail: "Recommended contact's email",
                    messagePlaceholder: "Your message...",
                    copyInfo: "Kelcom will be automatically CC'd.",
                    submitButton: "Send",
                    validating: "Validating...",
                    success: {
                        title: "Recommendation Sent!",
                        text: "You can now spin the wheel to discover your gift."
                    },
                    error: {
                        alreadyRecommendedByUser: "Sorry, you have already recommended a contact.",
                        contactAlreadyRecommended: "Sorry, this contact has already been recommended."
                    }
                }
            },
            footer: {
                legal: "Legal Notices",
                website: "Kelcom Website",
                contact: "Contact",
                address: "Address",
                social: "Follow us",
                rights: "All rights reserved © Kelcom"
            },
            dashboard: {
                title: "Track my recommendations",
                form: {
                    yourEmail: "Your email",
                    contactEmail: "Contact's email",
                    message: "Message",
                    ccMention: "Kelcom will be automatically CC'd.",
                    submit: "Send",
                    placeholder: "your@email.com"
                },
                track: {
                    label: "Track my recommendations (Enter your email)"
                },
                table: {
                    contact: "Recommended contact",
                    status: "Status",
                    date: "Date",
                    lastUpdate: "Last update",
                    download: "Reward"
                },
                status: {
                    title: "Recommendation Status",
                    UNKNOWN: "Sorry, we couldn't find a recommendation matching these emails.",
                    WAITING_FOR_CONTACT: "Waiting: We are waiting for your contact to reach out following your email (first 15 days).",
                    TO_BE_QUALIFED: "To be contacted: The Kelcom team will soon contact your recommended person.",
                    FAILED_TO_CONTACT: "Failed to contact: We haven't been able to reach your contact yet.",
                    IN_CONTACT: "In contact: We are currently talking with your contact to qualify their needs.",
                    FAILED: "Not qualified: This recommendation unfortunately did not work out.",
                    OK_TO_BE_REWARDED: "Congratulations! Your recommendation is validated. You can now choose your reward.",
                    OK_REWARDED: "Reward sent: You have already claimed your reward for this recommendation. Thank you!"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
