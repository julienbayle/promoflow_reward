# RÔLE : UI BUILDER
Tu es l'expert en HTML/React/css.

## CONTEXTE

Ce site est ouvert depuis le lien fourni dans un email et la plupart du temps sera vue depuis un mobile par un apporteur d’affaires de la société Kelcom.

# EXIGENCES

Style et contraintes :
- Mobile-first, scroll vertical
- Couleurs : pastel avec accents rouge/bleu pour les liens et bouton de type CTA (call to action)
- Typographie moderne et lisible
- Composants React, Tailwind CSS pour le style
- Interactions : hover sur boutons et cartes, transitions douces
- Palette de couleurs :
  - primary : "#974343ff"
  - background-color : #F1E2DE, rgb(241, 226, 222)
  - background-dark :"#FEF9F7,rgb(254, 249, 247)"

Couleur bouton CTA : #EF7359, rgb(239, 115, 89)


Choix technique:
- React avec typescript
- react-i18n Tous les textes doivent être traduits en français et en anglais (d'autres langues à venir)

La langue du visiteur est détectée automatiquement. Si ce n'est pas le français, l'anglais sera utilisé.
faire un section pour selectionner la langue d'au moins 5 mangues les plus parlées (prompte langue actuelle) et il faut que la langue actuelle soit selectionner.

A tout moment, le visiteur peut changer de langue en sélectionnant la langue dans le coin supérieur droit.


mettre le logo de Kelcom se trouvant dans public /assets/images/logo.png  tout en haut de la page a gauche de la navbar.


 # Footer
il faut ajouter un footer tout en bas de la page avec le logo de Kelcom, les mentions légales et un lien vers le site web de Kelcom, l'email de contact et le numéro de téléphone de Kelcom, l'adresse de Kelcom(Bât, 1 Rue Eugène Varlin Les Dorides - Bât. 1, 44100 Nantes), les liens vers les réseaux sociaux de Kelcom 

creer un lien vers https://www.kelcom.fr/information-kelcom/information-legale a partir de mention legale se trouvant sur le footer 


-couleur du footer : 
background: #eaeaea; 
font-family: 'Readex Pro'; 
font-weight: 300; 
border-top: #00767a 1px solid;

connecter les liens des reseaux sociaux du footer avec les liens des reseaux sociaux de Kelcom
- facebook : https://fr-fr.facebook.com/kelcom.fr
-linkedin : https://www.linkedin.com/company/kelcom-fr/?originalSubdomain=fr
 
CTA: background-Couleur : #EF7359, color: #FFF, border: none, height: 40px, front-size: 16px, padding: 10px 50px 0 50px, text-transform: uppercase, text-align: center, border-radius: 20px, font-weight: 300. 


## TES TÂCHES (Création de pages) :
aujouter une navbar Horizontal tout en haut de la page avec le logo de Kelcom et les liens vers les pages **landing**(Acceuil), **start**(Temoignage), **rewards**(Avantages), **dashboard**(suivre mes Recompenses) et un bouton pour changer de langue a droite de la navbar, couleur de la navbar : #FFF, couleur des textes: #333, font-size: 18px, font-weight: 350, 

Langue proposer Anglais et Français

### Page **landing**

Fichier: src/pages/landing.tsx'

Objectif : La page doit présenter le programme de recommandation, inciter les clients  à recommander des contacts de leur resaux professionnel et montrer les récompenses disponibles qu'ils peuvent gagner si cela aboutit .
ajoute une image de cadeau explosif avec confetti comme fond 

Sections et contenu :

1. Hero  :
   - Texte : "Votre implication, notre succès, soyez récompensé" en gras et couleur : #cf0617ff
   - Image principale (prompt de génération) : une roue repartie en 5 présentant des cadeaux. chaque section doit contenir un cadeau différent Exemple:une console ps5, un trotinette electrique, des bons d'achat, un voyage, un telephone.
   - Bouton CTA : "Je participe" (lien vers la page **start**), text-align : center.
   - Bouton secondaire : "Suivre mes recommandations" (lien vers la page **dashboard**)

les 2 boutons CTA doivent être de couleur : #EF7359 et disposer def facon Horizontale l'un a coté de l'autre au deux extremité de la roue des cadeaux.


mettre tous le contenu Heros dans un div avec un fond de couleur : #c6d6e9ff et un padding de 20px et un width de 100%.


2. Pourquoi nous recommander à votre réseau :
   - Texte explicatif :
     "Votre réseau devient un atout. Chaque mise en relation peut se transformer en opportunité concrète. Très simple, un simple email d'introduction de votre part suffit pour participer. Puis, nous gérons tout, sauf le choix de votre récompense"
   - Mise en page : texte avec sous-titres et paragraphe

3. Partage du programme :

mettre dans un div avec un fond de couleur : background: linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)

   - Texte : "Partagez notre programme avec vos contacts professionnels et institutions publiques. Chaque recommandation concrétisée vous donne droit à une récompense exceptionnelle."
   - Illustration (prompt de génération): Des cadeaux

4. Comment ça fonctionne :
   - Étapes numérotées :
     1. Vous : Email de recommandation
     2. Kelcom : Prise de contact et qualification
     3. Choix de votre récompense


Bouton CTA : "Je participe" (lien vers la page **start**)


5. Quelle récompense ? :
   - Remise sur votre prochaine commande
   - Don à des associations de votre choix
   - Cartes cadeaux
   
   Chaque année en novembre, tirage au sort de 3 parrains pour une récompense exceptionnel en fin d'année. Les lots de cette année :
   - 1 trotinnette électrique
   - 1 console PS5
   - 10 autres lots
   Faire une image d'illustration pour chaque lot

Bouton CTA : "Je participe" (lien vers la page **start**)

### Page **start**

Fichier: src/pages/start.tsx'

Objectif : La page explique le processus détaillé pour faire sa première recommandation.

Sections et contenu :

mettre dans un div avec un fond de couleur : background: linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)


Simplement faire un email à votre contact en lui partageant les bénéfices que vous avez trouver à travailler avec Kelcom pour vos besoins en mettant en copie "recommandation@kelcom.fr"



A générer : les étapes
- Email recommandes
- Votre contact appelle Kelcom
- Kelcom appelle votre contact au bout de 15 jours sans nouvelles
- Kelcom qualifie le contact et le valide dans le programme de recommandation
- Une fois le contact qualifiée, vous pourrez choisir votre récompense.
 générer une image d'illustration(prompte generative ) pour chaque étape ajouter les images dans le div de couleur : #EF7359, et mettre les étapes dans un ordre chronologique avec des fleches pour indiquer le sens de lecture 


A générer : 3 exemples de message a mettre dans un div avec un titre "Exemples de messages".

A générer : 4 témoignages de client ayant recommandé des contacts
A generer : mettre dans un div Avis des clients ayant recommandé des contacts avec un titre "Avis des clients ayant recommandé des contacts" note en etoile et texte 

Kelcom prendra contact et qualifiera ce contact si celui si ne nous contacte pas directement sous 15 jours suite au message.


creer deux div différent l'une en dessus de l'autre. l'une pour les message et avis des lient et l'autre pour les exemples de messages padding de 20px et un width de 100%.

couleur des div : 
backgroundOpacityMurky : rgba(255, 255, 255, 0.75),
 onBackgroundLight: #EAEAEA;
  background: #FFF;
 onBackground: #242424; 
 accent: #0070F6; 
 default-black: rgba(0, 0, 0, 0.00);
 backgroundShadow: rgba(0, 0, 0, 0.14); 
 onAccent: #FFF; 
 onAccentDisabled: #B2D4FC; 
 onBackgroundDisabled: #919191; 
 onBackgroundSecondary: #5B5B5B; 
 accentHighContrast: #0070F6; 
 onBackgroundExtraLight: #F4F4F4; 
 scrollTrack: #E8E8E8;
 scrollThumb: #A1A1A1; 


CTA : Les récompenses (lien vers page **rewards**)

CTA doivent être de couleur : #EF7359 et disposer au centre de la page.

### Page **rewards**

Cette page détaille le programme de récompense

**Architecture et Couleurs :**
- **Fond de page :** `linear-gradient(90deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%)`
- **Titres principaux (H1, H2) :** Couleur `#1F2A44`, font-weight `normal`, uppercase.
- **Texte de corps et descriptions :** Couleur `#2A2A2A`, font-weight `normal`.
- **Cartes de section :** Fond `#FFFFFF` (blanc), bordure `#F3F4F6` (gray-100), shadow `2xl`.
- **Accents :** 
  - Icônes "Pour vous" : fond `#EF7359` (kelcom-cta).
  - Icônes "Tirage au sort" : fond `#0070F6` (kelcom-blue).

**Contenu :**
**Pour vous :**
- 2% de remise sur votre prochaine commande
- bon d'achat jusqu'a 200 euros selon contact proposé
- don à des associations de 50 à 500 euros selon contact proposé

**Pour votre contact :**
- 5% de remise sur sa première commande

**Tirage au sort :**
Participation au tirage au sort de fin d'année pour vous et votre client disposition d'articles au choix en guise de premier cadeau.
(explication à généré)

**Boutons CTA :**
- **CTA Principal :** "Mes recommandations" (lien vers page **dashboard**), fond `#EF7359`, texte blanc.

### Page **dashboard**

Cette page permet de suivre ses recommandations

header :
- 20 ans d'existance couleur linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%) ecris en doublé transparent(model festif), avec confettis et cadeau en arriere plan (prompt generatif)


Formulaire :
mettre dans un div avec un fond de couleur : background: linear-gradient(90deg, #1F8083 0%, #198686 50%, #11C5A2 100%)

- Votre email
CTA : "Envoyer"
- Email du contact recommandé


le tableau de bord doit apparaitre apres remplissage du formulaire, et cela ne doit pas activer d'abord la roue des prix. la roue des prix doit s'activer lorsquon qu'on clique sur<< tourner la roue>> qui doit apparaitre dans la colonne des cadeaux.

l'email doit être demandé :A la validation du formulaire, appel au backend, qui retour le statut de suivi de cette recommandation. Affichage du statut et du cadeau obtenu si le statut est OK_TO_BE_REWARDED.

l'email doit être mocké avec un email de test et le formulaire doit être fonctionnel et doit appeler le backend pour obtenir le statut "validé".

un contact ne peut etre recommander 2 fois. Si c'est un contact deja recommander, le formulaire doit afficher un message disant que le contact est deja recommander "Desolé ce contact est deja recommander, veuillez en choisir un autre". 
 et chaque apporteur d'affaire a droit a recommander 1 seul contact n'etant pas encore recommandé. 


un tableau avec des contact(prompt generatif et statut de suivi) avec les colonnes suivantes :
- Email du contact recommandé
- Statut
- Date de la recommandation
- Date de la dernière mise à jour
- Telechargement de l'envoi du cadeau

une fois recommandation est faite dans le tableau de bord, dans la colone Cadeau du tableau doit afficher "Tourner la roue" ce qui va activé la roue de la fortune. 
Aprés avoir tourné la roue, le statut de la recommandation doit être mis à jour avec le cadeau obtenu.


une fois le formulaire envoyé le nouveau contact recommander doit apparaître dans la page **dashboard** plus precisemment dans le tableau des recommandations. afin que le contact recommander soit validé par Kelcom et que celui qui a recommandé puisse le suivre le statut de la recommandation.

- Image principale (prompt de génération) : une roue repartie en 5 présentant des cadeaux. chaque section doit contenir un cadeau différent Exemple:une console ps5, un trotinette electrique, des bons d'achat, un voyage, un telephone.
la roue des cadeau doit avoir un bouton au centre avec une icone de check et le texte "touner la roue"  et doit être de couleur : linear-gradient(90deg, #F4E8E5 0%, #EEF2EF 50%, #DCEDEA 100%); et une fois qu'on la touche elle doit tourner et s'arreter sur un cadeau au hasard.


Une fois la roue tournée et un cadeau obtenu, le formulaire doit disparaitre et il faut afficher le cadeau obtenu et un message de remerciement juste a coté de la roue des cadeau.

cependant le cadeau ne doit pas être envoyé, il doit être stocké dans le backend et envoyé plus tard une fois que le contact recommandé devient un client. 



Les status possibles :
 - UNKNOWN : un des emails est inconnu
 - WAITING_FOR_CONTACT : 15 premiers jours, attente prise de contact du parrainé
 - TO_BE_QUALIFED : Kelcom doit contacter cette personne
 - FAILED_TO_CONTACT: Kelcom n'arrive pas à joindre la personne
 - IN_CONTACT : kelcom qualifie le contact
 - FAILED : kelcom non qualifié
 - OK_TO_BE_REWARDED : récompense à choisir
 - OK_REWARDED : récompense déjà choisie

Le statut comprends :
 - status (UNKNOWN, IN_PROGRESS, ...)()

 
Bouton CTA : "Retour" (lien vers la page **landing**)








