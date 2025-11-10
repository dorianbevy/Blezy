import React from "react";
import { MapPin, Phone, Clock, Wheat, ShoppingBag, Mail, Heart, Menu, X } from "lucide-react";
import facadeImg from "../img/facade.webp";
import painImg from "../img/baguette.jpg";
import patisserieImg from "../img/patisserie_3.jpg";
import atelierImg from "../img/atelier.jpg";
import vitrineImg from "../img/vitrine.jpg";
import pain2Img from "../img/pain_cereale_2.jpg";
import croissantImg from "../img/viennoiserie_1.jpg";
import viennoiserie3Img from "../img/viennoiserie_3.jpg";
import pralineImg from "../img/praline.jpg";
import flanImg from "../img/flan.jpg";
import fraisierImg from "../img/fraisier.jpg";
import gateauxImg from "../img/gateaux.jpg";
import gateaux2Img from "../img/gateaux_2.jpg";
import tartelettesImg from "../img/tartelettes.jpg";
import saleImg from "../img/sale.jpg";
import sandwichImg from "../img/sandwich.jpg";
import painCerealeImg from "../img/pain_cereale_3.jpg";
import brownieImg from "../img/brownie.jpg";
import logoImg from "../img/logo.png";
import logo2Img from "../img/logo_2.png";

// Composant Divider réutilisable
function Divider() {
    return (
        <div className="flex items-center gap-3 my-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            <Wheat className="w-6 h-6 text-amber-700" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>
    );
}

// Données des horaires
const hours = {
    Lundi: "Fermé",
    Mardi: "7:00–13:00, 15:30–19:00",
    Mercredi: "7:00–13:00, 15:30–19:00",
    Jeudi: "7:00–13:00, 15:30–19:00",
    Vendredi: "7:00–13:00, 15:30–19:00",
    Samedi: "7:30–13:00, 15:00–18:00",
    Dimanche: "7:30–12:30",
};

// Données des produits par défaut (seront remplacées par les données admin)
const defaultProduits = [
    {
        cat: "Pains", items: [
            { n: "Baguette tradition", d: "Levain naturel, farine locale T65" },
            { n: "Pain céréale", d: "Farines variées, graines" },
            { n: "Pain de campagne", d: "Blés anciens, fermentation lente" },
            { n: "Pain complet", d: "Richesse en fibres, goût authentique" },
        ],
        img: pain2Img
    },
    {
        cat: "Viennoiseries", items: [
            { n: "Croissant pur beurre", d: "Beurre AOP Charentes-Poitou" },
            { n: "Pain au chocolat maison", d: "Deux bâtons, pâte feuilletée maison" },
            { n: "Madeleine artisanale", d: "Moelleuse, dorée" },
        ],
        img: viennoiserie3Img
    },
    {
        cat: "Pâtisseries", items: [
            { n: "Flan", d: "Classique, crémeux" },
            { n: "Fraisier", d: "Fraises fraîches, crème légère" },
            { n: "Brownie", d: "Chocolat intense, noix" },
            { n: "Tartelette", d: "Fruits frais de saison" },
            { n: "Assortiment", d: "Gâteaux variés maison" },
        ],
        img: gateauxImg
    },
    {
        cat: "Spécialités", items: [
            { n: "Tarte aux pralines", d: "Spécialité régionale" },
            { n: "Gâteau aux noix", d: "Noix du voisin, moelleux gourmand" },
            { n: "Vitrine salée", d: "Quiches, sandwichs, salés" },
        ],
        img: pralineImg
    },
];

// Composant principal du site boulangerie
export default function BoulangerieSite({ adminProducts }) {
    const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
    const todayCap = today.charAt(0).toUpperCase() + today.slice(1);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [menuOpen, setMenuOpen] = React.useState(false);

    // Utiliser les produits admin s'ils sont disponibles, sinon les produits par défaut
    const produits = adminProducts || defaultProduits;

    // Fonction de défilement fluide
    const smoothScrollTo = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    // Fonction pour naviguer vers une slide spécifique
    const goToSlide = (slideIndex) => {
        const carousel = document.getElementById('products-carousel');
        if (carousel) {
            const scrollPosition = slideIndex * 400;
            carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            setCurrentSlide(slideIndex);
        }
    };

    // Fonction pour naviguer vers la gauche
    const goToPrevious = () => {
        const carousel = document.getElementById('products-carousel');
        if (carousel) {
            // Trouve la première card
            const card = carousel.querySelector('div.group');
            if (card) {
                const cardStyle = window.getComputedStyle(card);
                const gap = parseFloat(cardStyle.marginRight);
                const width = card.offsetWidth + gap;
                carousel.scrollBy({ left: -width, behavior: 'smooth' });
            }
        }
    };

    // Fonction pour naviguer vers la droite
    const goToNext = () => {
        const carousel = document.getElementById('products-carousel');
        if (carousel) {
            const card = carousel.querySelector('div.group');
            if (card) {
                const cardStyle = window.getComputedStyle(card);
                const gap = parseFloat(cardStyle.marginRight);
                const width = card.offsetWidth + gap;
                const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
                // Si déjà tout à droite ou qu'un pas de plus excède la fin
                if (carousel.scrollLeft + width >= maxScrollLeft - 2) return;
                carousel.scrollBy({ left: width, behavior: 'smooth' });
            }
        }
    };

    // Écouter le scroll pour mettre à jour l'indicateur actif
    React.useEffect(() => {
        const carousel = document.getElementById('products-carousel');
        if (carousel && produits.length > 3) {
            const handleScroll = () => {
                const scrollLeft = carousel.scrollLeft;
                const slideIndex = Math.round(scrollLeft / 400);
                setCurrentSlide(slideIndex);
            };

            carousel.addEventListener('scroll', handleScroll);
            return () => carousel.removeEventListener('scroll', handleScroll);
        }
    }, [produits.length]);

    // Réinitialiser le slide actuel quand les produits changent
    React.useEffect(() => {
        setCurrentSlide(0);
    }, [produits]);

    return (
        <div className="min-h-screen select-none overflow-x-hidden">
            <div className="backdrop-brightness-95">
                <div className="font-playfair font-semibold tracking-wider bg-fixed bg-cover bg-center h-[500px] relative flex flex-col" style={{ backgroundImage: `url(${vitrineImg})` }}>
                    {/* Overlay dégradé pour améliorer la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>

                    {/* Bandeau supérieur */}
                    <header className="border-b border-stone-300/30 relative z-10 backdrop-blur-sm bg-white/5">
                        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
                            {/* Logo à gauche */}
                            <div className="flex items-center gap-3 z-[1]">
                                <img src={logo2Img} alt="Blézy Boulangerie" className="w-14 h-14 object-cover" />
                                <div>
                                    <div className="text-xl tracking-wide text-white font-bold">Blézy Boulangerie</div>
                                    <div className="text-[12px] text-amber-100">Pouilly-le-Monial</div>
                                </div>
                            </div>

                            {/* Nav centre (desktop only) */}
                            <nav className="absolute left-1/2 transform -translate-x-1/2 md:flex items-center gap-6 text-base text-white hidden">
                                <button onClick={() => smoothScrollTo('maison')} className="relative group transition-all duration-300 ease-out hover:text-amber-100">
                                    <span>La maison</span>
                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-100 to-amber-200 transition-all duration-300 ease-out group-hover:w-full"></div>
                                </button>
                                <button onClick={() => smoothScrollTo('carte')} className="relative group transition-all duration-300 ease-out hover:text-amber-100">
                                    <span>Nos produits</span>
                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-100 to-amber-200 transition-all duration-300 ease-out group-hover:w-full"></div>
                                </button>
                                <button onClick={() => smoothScrollTo('infos')} className="relative group transition-all duration-300 ease-out hover:text-amber-100">
                                    <span>Infos</span>
                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-100 to-amber-200 transition-all duration-300 ease-out group-hover:w-full"></div>
                                </button>
                            </nav>

                            {/* Contact à droite (desktop only) */}
                            <a onClick={() => smoothScrollTo('contact')} className="md:inline-flex hidden items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 transition-all duration-300 ease-out hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 font-medium">
                                <Mail className="w-4 h-4" /> Contact
                            </a>

                            {/* Burger menu à droite (mobile only) */}
                            <button
                                className="md:hidden ml-4 p-2 rounded-lg border border-white/10 bg-white/10 text-white hover:bg-amber-700/80 transition-colors duration-150 z-30"
                                onClick={() => setMenuOpen(true)}
                                aria-label="Ouvrir le menu navigation"
                            >
                                <Menu className="w-7 h-7" />
                            </button>
                        </div>

                        {/* Overlay menu burger mobile */}
                        {menuOpen && (

                            <div className={`fixed inset-0 h-screen w-screen bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center transform transition-transform duration-500 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                            >
                                {/* bouton fermer */}
                                <div className="absolute top-6 right-6 z-[101]">
                                    <button
                                        onClick={() => setMenuOpen(false)}
                                        aria-label="Fermer le menu navigation"
                                        className="p-2 bg-white/10 rounded-full border border-white/10 text-white hover:bg-amber-700/80 transition-colors duration-150"
                                    >
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>

                                {/* navigation centrale */}
                                <nav className="flex flex-col gap-8 items-center text-white text-2xl">
                                    <button
                                        onClick={() => {
                                            smoothScrollTo('maison');
                                            setMenuOpen(false);
                                        }}
                                        className="hover:text-amber-300"
                                    >
                                        La maison
                                    </button>
                                    <button
                                        onClick={() => {
                                            smoothScrollTo('carte');
                                            setMenuOpen(false);
                                        }}
                                        className="hover:text-amber-300"
                                    >
                                        Nos produits
                                    </button>
                                    <button
                                        onClick={() => {
                                            smoothScrollTo('infos');
                                            setMenuOpen(false);
                                        }}
                                        className="hover:text-amber-300"
                                    >
                                        Infos
                                    </button>
                                    <button
                                        onClick={() => {
                                            smoothScrollTo('contact');
                                            setMenuOpen(false);
                                        }}
                                        className="mt-6 bg-gradient-to-r from-amber-700 to-amber-800 px-6 py-2 rounded-full font-medium text-amber-50 hover:scale-105 transition-transform"
                                    >
                                        Contact
                                    </button>
                                </nav>
                            </div>

                        )}

                    </header>

                    {/* Hero - Centré verticalement dans l'espace restant */}
                    <div className="flex-1 flex items-center justify-center relative z-[1]">
                        <div className="max-w-9xl mx-auto px-4 py-10 text-center">
                            <h1 className="text-4xl md:text-6xl text-white mb-3 text-shadow-lg font-extrabold tracking-tight">Blézy Boulangerie</h1>
                            <h2 className="text-4xl md:text-5xl text-amber-100 mb-4 text-shadow-lg font-light">Consequatur illo inventore repellendus animi!</h2>
                            <Divider />
                            <p className="text-white text-lg max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem excepturi, impedit quas accusamus tempore quod numquam?
                            </p>
                            {/* Les deux bulles 'Aujourd'hui' et 'Secteur' */}
                            <div className="mt-6 text-sm flex flex-wrap gap-6 justify-center text-white hidden [@media(min-width:500px)]:flex">
                                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                                    <Clock className="w-4 h-4" /> Aujourd'hui : <strong className="ml-1 font-sans font-semibold">{hours[todayCap] ?? "—"}</strong>
                                </span>
                                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                                    <MapPin className="w-4 h-4" /> Secteur Theizé / Val d'Oingt
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Galerie d'images */}
            < section className="bg-white border-t border-stone-200 font-playfair font-semibold tracking-wider" >
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h2 className="text-3xl text-center mb-12 text-stone-800">Découvrez Blézy Boulangerie</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] aspect-[4/3]">
                            <img src={facadeImg} alt="Façade de la boulangerie" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 rounded-2xl" />
                        </div>
                        <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] aspect-[4/3]">
                            <img src={painImg} alt="Pain artisanal" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 rounded-2xl" />
                        </div>
                        <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] aspect-[4/3]">
                            <img src={patisserieImg} alt="Pâtisserie maison" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section >

            <Divider className="mb-12" />

            {/* La maison */}
            <section id="maison">
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <h2 className="font-serif text-3xl font-playfair font-semibold tracking-wider text-center text-stone-800 mb-12">La Maison</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="aspect-[4/3] bg-white border border-stone-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 grid place-items-center">
                                    <Heart className="w-5 h-5 text-amber-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-stone-800">Notre philosophie</h3>
                            </div>
                            <p className="text-stone-700 leading-relaxed mb-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat cupiditate sint accusantium quia.
                            </p>
                            <ul className="space-y-2 text-stone-700">
                                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Suibusdam numquam enim impedit.</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Suibusdam numquam enim.</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Quibusdam enim impedit.</li>
                            </ul>
                        </div>

                        {/* Image de l'atelier */}
                        <div className="aspect-[4/3] group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02]">
                            <div className="aspect-square overflow-hidden">
                                <img src={atelierImg} alt="Atelier de boulangerie" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                            </div>
                        </div>

                        <div className="aspect-[4/3] bg-white border border-stone-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 grid place-items-center">
                                    <Clock className="w-5 h-5 text-amber-700" />
                                </div>
                                <h3 className="text-lg font-semibold text-stone-800">Horaires</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-y-1">
                                {Object.entries(hours).map(([k, v]) => (
                                    <React.Fragment key={k}>
                                        <div className="text-stone-600 font-medium">{k}</div>
                                        <div className="font-medium text-stone-700">{v}</div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Divider className="mb-12" />

            {/* Carte */}
            <section id="carte" className="">
                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <h2 className="font-serif text-3xl font-playfair font-semibold tracking-wider text-center text-stone-800 mb-12">Nos Produits</h2>

                    <div className="relative overflow-visible">
                        {/* Boutons de navigation du carrousel */}
                        {produits.length > 3 && (
                            <>
                                <button
                                    className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm border border-stone-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 flex items-center justify-center text-stone-600 hover:text-amber-700 hover:border-amber-300"
                                    onClick={goToPrevious}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm border border-stone-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110 flex items-center justify-center text-stone-600 hover:text-amber-700 hover:border-amber-300"
                                    onClick={goToNext}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Carrousel des produits */}
                        <div
                            id="products-carousel"
                            className={`${produits.length <= 3
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4'
                                } w-full py-6 md:py-10 box-border`}
                        >
                            {produits.map((c, index) => (
                                <div
                                    key={c.cat}
                                    className={`bg-white border border-stone-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] group ${produits.length > 3 ? 'min-w-[350px] max-w-[350px] snap-start' : ''
                                        }`}
                                >
                                    {/* Image de la catégorie */}
                                    <div className="aspect-[3/2] bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:border-amber-400 transition-colors duration-300 overflow-hidden">
                                        <img src={c.img} alt={c.cat} className="w-full h-full object-cover rounded-xl " />
                                    </div>

                                    <div className="font-semibold text-lg text-stone-800 mb-4">{c.cat}</div>
                                    <div className="relative">
                                        <ul className={`space-y-3 text-stone-700 ${c.items.length > 2 ? 'max-h-[200px] overflow-y-auto scrollbar-hide' : ''}`}>
                                            {c.items.map((i, itemIndex) => (
                                                <li
                                                    key={i.n}
                                                    className={`flex items-start justify-between gap-3 p-3 bg-stone-50 rounded-lg hover:bg-amber-50 transition-colors duration-200
                                                        }`}
                                                >
                                                    <div>
                                                        <div className="font-medium text-stone-800">{i.n}</div>
                                                        <div className="text-sm text-stone-600 mt-1">{i.d}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Indicateur de fondu si plus de 3 items */}

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Indicateurs de pagination (si plus de 3 catégories) */}
                        {produits.length > 3 && (
                            <div className="justify-center mt-8 gap-3 hidden [@media(min-width:500px)]:flex">
                                {Array.from({ length: Math.ceil(produits.length / 3) }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === i ? 'bg-amber-500' : 'bg-stone-300'} hover:bg-amber-500`}
                                        onClick={() => goToSlide(i)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/*<Divider className="mb-12" />*/}

            {/* Savoir-faire */}
            {/* <section id="savoirfaire" className="bg-white mb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="font-serif text-3xl font-playfair font-semibold tracking-wider text-center text-stone-800 mb-12">Notre savoir-faire</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] group">
                            <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-dashed border-amber-300 flex items-center justify-center mb-6 group-hover:border-amber-400 transition-colors duration-300">
                                <div className="text-center text-amber-700">
                                    <div className="text-4xl mb-2">👐</div>
                                    <div className="text-sm font-medium">Pétrissage</div>
                                </div>
                            </div>
                            <h3 className="font-serif text-xl mb-3 text-stone-800">Savoir‑faire</h3>
                            <p className="text-stone-700 leading-relaxed">Pétrissage mesuré, pointage au froid, façonnage manuel. Recettes courtes, sans artifice.</p>
                        </div>

                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] group">
                            <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-dashed border-amber-300 flex items-center justify-center mb-6 group-hover:border-amber-400 transition-colors duration-300">
                                <div className="text-center text-amber-700">
                                    <div className="text-4xl mb-2">🌾</div>
                                    <div className="text-sm font-medium">Ingrédients</div>
                                </div>
                            </div>
                            <h3 className="font-serif text-xl mb-3 text-stone-800">Approvisionnements</h3>
                            <p className="text-stone-700 leading-relaxed">Filières locales, meuniers partenaires, transparence des origines et des labels.</p>
                        </div>

                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] group">
                            <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-dashed border-amber-300 flex items-center justify-center mb-6 group-hover:border-amber-400 transition-colors duration-300">
                                <div className="text-center text-amber-700">
                                    <div className="text-4xl mb-2">🔥</div>
                                    <div className="text-sm font-medium">Cuisson</div>
                                </div>
                            </div>
                            <h3 className="font-serif text-xl mb-3 text-stone-800">Cuisson traditionnelle</h3>
                            <p className="text-stone-700 leading-relaxed">Maîtrise du four à bois, respect des temps de cuisson, développement des saveurs.</p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <Divider className="mb-12" /> */}

            {/* Galerie finale */}
            {/* <section className=""> 
                <div className="max-w-6xl mx-auto px-4  mb-12">
                    <h2 className="font-serif text-3xl font-playfair font-semibold tracking-wider text-center text-stone-800 mb-12">L'ambiance Blézy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-dashed border-amber-300 p-8 flex items-center justify-center group hover:border-amber-400 transition-colors duration-300">
                            <div className="text-center text-amber-700">
                                <div className="text-5xl mb-3">☕</div>
                                <div className="text-lg font-medium">Espace détente</div>
                                <div className="text-sm text-amber-600 mt-2">Ambiance chaleureuse</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-dashed border-amber-300 p-8 flex items-center justify-center group hover:border-amber-400 transition-colors duration-300">
                            <div className="text-center text-amber-700">
                                <div className="text-5xl mb-3">🌿</div>
                                <div className="text-lg font-medium">Décoration naturelle</div>
                                <div className="text-sm text-amber-600 mt-2">Éléments organiques</div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-dashed border-amber-300 p-8 flex items-center justify-center group hover:border-amber-400 transition-colors duration-300">
                            <div className="text-center text-amber-700">
                                <div className="text-5xl mb-3">🌟</div>
                                <div className="text-lg font-medium">Détails d'excellence</div>
                                <div className="text-sm text-amber-600 mt-2">Qualité artisanale</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>*/}

            {/* Infos pratiques */}
            <section id="infos" className="bg-gradient-to-b from-stone-50 to-white border-t border-stone-200">
                <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 grid place-items-center">
                                <MapPin className="w-5 h-5 text-amber-700" />
                            </div>
                            <div className="font-serif text-xl text-stone-800">Adresse</div>
                        </div>
                        <p className="text-stone-700 leading-relaxed">Pouilly-le-Monial • Porte des Pierre Dorées (69400)</p>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 grid place-items-center">
                                <Phone className="w-5 h-5 text-amber-700" />
                            </div>
                            <div className="font-serif text-xl text-stone-800">Contact</div>
                        </div>
                        <p className="text-stone-700 flex items-center gap-2 mb-2">04 00 00 00 00</p>
                        <p className="text-stone-700 flex items-center gap-2">blezy.boulangerie@gmail.com</p>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-white ">
                <div className="max-w-7xl mx-auto px-4 py-12 text-sm grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="font-serif text-xl text-stone-800 mb-2">Blézy Boulangerie</div>
                        <div className="text-stone-600">Boulangerie artisanale – Theizé / Val d'Oingt</div>
                    </div>
                    <div>
                        <div className="font-medium text-stone-800 mb-3">Liens</div>
                        <ul className="space-y-2">
                            <li><a href="#carte" className="hover:text-amber-700 transition-colors duration-200">La carte</a></li>
                            <li><a href="#savoirfaire" className="hover:text-amber-700 transition-colors duration-200">Savoir‑faire</a></li>
                            <li><a href="#infos" className="hover:text-amber-700 transition-colors duration-200">Infos pratiques</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-medium text-stone-800 mb-3">Horaires</div>
                        <div className="grid grid-cols-3 gap-y-2">
                            {Object.entries(hours).map(([k, v]) => (
                                <React.Fragment key={k}>
                                    <div className="text-stone-600">{k}</div>
                                    <div className="font-medium text-stone-800 col-span-2">{v}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-stone-800 mb-3">Mentions</div>
                        <p className="text-stone-600">SIRET • Politique de confidentialité • Accessibilité (RGAA)</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}
