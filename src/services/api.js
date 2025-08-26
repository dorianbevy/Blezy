const API_BASE_URL = 'http://localhost:3001';

// Fonction utilitaire pour les appels API
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// API pour les catégories
export const categoriesAPI = {
    // Récupérer toutes les catégories
    getAll: () => apiCall('/categories'),

    // Récupérer une catégorie par ID
    getById: (id) => apiCall(`/categories/${id}`),

    // Créer une nouvelle catégorie
    create: (category) => apiCall('/categories', {
        method: 'POST',
        body: JSON.stringify(category),
    }),

    // Mettre à jour une catégorie
    update: (id, category) => apiCall(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
    }),

    // Supprimer une catégorie
    delete: (id) => apiCall(`/categories/${id}`, {
        method: 'DELETE',
    }),
};

// API pour les produits
export const productsAPI = {
    // Récupérer tous les produits
    getAll: () => apiCall('/products'),

    // Récupérer tous les produits disponibles
    getAvailable: () => apiCall('/products?available=true'),

    // Récupérer un produit par ID
    getById: (id) => apiCall(`/products/${id}`),

    // Récupérer les produits par catégorie
    getByCategory: (categoryId) => apiCall(`/products?categoryId=${categoryId}`),

    // Récupérer les produits disponibles d'une catégorie
    getAvailableByCategory: (categoryId) => apiCall(`/products?categoryId=${categoryId}&available=true`),

    // Créer un nouveau produit
    create: (product) => apiCall('/products', {
        method: 'POST',
        body: JSON.stringify(product),
    }),

    // Mettre à jour un produit
    update: (id, product) => apiCall(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
    }),

    // Supprimer un produit
    delete: (id) => apiCall(`/products/${id}`, {
        method: 'DELETE',
    }),
};

// Fonction pour récupérer les données formatées pour l'affichage
export const getFormattedData = async () => {
    try {
        const [categories, products] = await Promise.all([
            categoriesAPI.getAll(),
            productsAPI.getAll(),
        ]);

        // Formater les données pour correspondre à l'ancienne structure
        // ET filtrer pour ne garder que les produits disponibles
        return categories.map(category => ({
            id: category.id,
            cat: category.name,
            items: products
                .filter(product => product.categoryId === category.id && product.available === true)
                .map(product => ({
                    id: product.id,
                    n: product.name,
                    d: product.description,
                    price: product.price,
                    available: product.available,
                })),
            img: category.image,
        }));
    } catch (error) {
        console.error('Error fetching formatted data:', error);
        return [];
    }
};
