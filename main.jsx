import React from "react";
import "./src/index.css";
import AdminLogin from "./src/components/AdminLogin.jsx";
import AdminPanelDB from "./src/components/AdminPanelDB.jsx";
import BoulangerieSite from "./src/components/BoulangerieSite.jsx";
import { getFormattedData } from "./src/services/api.js";
//import TestComponent from "./src/components/TestComponent.jsx";
import pain2Img from "./src/img/pain_2.jpg";
import croissantImg from "./src/img/croissant.jpg";
import pralineImg from "./src/img/praline.jpg";

// Styles CSS personnalisés pour le carrousel
const carouselStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .snap-x {
    scroll-snap-type: x mandatory;
  }
  .snap-start {
    scroll-snap-align: start;
  }
  
  #products-carousel {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  #products-carousel::-webkit-scrollbar {
    display: none;
  }
  
  /* Styles pour les listes scrollables */
  .overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
  
  /* Animation de fondu pour les items */
  .opacity-50 {
    transition: opacity 0.3s ease-in-out;
  }
`;

// Composant principal de l'application
function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(false);
  const [adminUser, setAdminUser] = React.useState(null);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Charger les données depuis l'API au démarrage
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getFormattedData();
        setProducts(data);
        console.log("ok");

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // Fallback vers les données statiques en cas d'erreur
        setProducts([
          {
            id: 1,
            cat: "Pains",
            items: [
              { id: 1, n: "Baguette tradition", d: "Levain naturel, farine locale T65" },
              { id: 2, n: "Campagne", d: "Blés anciens, fermentation lente" },
              { id: 3, n: "Seigle", d: "Goût soutenu, longue conservation" },
            ],
            img: pain2Img
          },
          {
            id: 2,
            cat: "Viennoiseries",
            items: [
              { id: 4, n: "Croissant pur beurre", d: "Beurre AOP Charentes-Poitou" },
              { id: 5, n: "Pain au chocolat", d: "Deux bâtons, pâte feuilletée maison" },
            ],
            img: croissantImg
          },
          {
            id: 3,
            cat: "Spécialités",
            items: [
              { id: 6, n: "Pain du Beaujolais", d: "Farines locales, four à bois" },
              { id: 7, n: "Tarte aux pralines", d: "Spécialité régionale" },
            ],
            img: pralineImg
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Vérification automatique de l'URL admin
  React.useEffect(() => {
    if (window.location.pathname === '/admin' && !adminUser) {
      setShowLoginModal(true);
    }
  }, [adminUser]);

  // Injection des styles CSS pour le carrousel
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = carouselStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleAdminLogin = (user) => {
    setAdminUser(user);
    setShowLoginModal(false);
    // Redirection automatique vers l'URL admin après connexion
    if (window.location.pathname !== '/admin') {
      window.location.href = '/admin';
    }
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setShowLoginModal(false);
    // Redirection vers la page d'accueil après déconnexion
    window.location.href = '/';
  };

  // Fonction pour mettre à jour les produits (appelée depuis le panel admin)
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  // Si l'utilisateur est connecté et sur l'URL admin, afficher le panel admin
  if (adminUser && window.location.pathname === '/admin') {
    return (
      <AdminPanelDB
        user={adminUser}
        onLogout={handleAdminLogout}
        products={products}
        onProductsUpdate={updateProducts}
      />
    );
  }

  // Sinon, afficher le site principal avec le modal de login si nécessaire
  return (
    <>
      <BoulangerieSite />

      {/* Modal de login admin (seulement si nécessaire) */}
      {showLoginModal && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => {
            setShowLoginModal(false);
            // Redirection vers la page d'accueil si l'utilisateur ferme le login
            if (window.location.pathname === '/admin') {
              window.location.href = '/';
            }
          }}
        />
      )}
    </>
  );
}

// Rendu de l'application
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
