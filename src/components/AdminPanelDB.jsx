import React from "react";
import { Lock, Users, ShoppingBag, Award, Plus, Edit, Trash2, X, Save, Image as ImageIcon, Database } from "lucide-react";
import { categoriesAPI, productsAPI } from "../services/api.js";

// Composant de la page admin avec base de données
export default function AdminPanelDB({ user, onLogout }) {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [categories, setCategories] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // États pour les modals
    const [showCategoryModal, setShowCategoryModal] = React.useState(false);
    const [showProductModal, setShowProductModal] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState(null);
    const [editingProduct, setEditingProduct] = React.useState(null);

    // États pour les nouveaux éléments
    const [newCategory, setNewCategory] = React.useState({
        name: "",
        description: "",
        image: "",
        order: 0
    });

    const [newProduct, setNewProduct] = React.useState({
        name: "",
        description: "",
        price: 0,
        categoryId: "",
        image: "",
        available: true
    });

    // Charger les données au démarrage
    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [categoriesData, productsData] = await Promise.all([
                categoriesAPI.getAll(),
                productsAPI.getAll()
            ]);
            setCategories(categoriesData);
            setProducts(productsData);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gestion des catégories
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await categoriesAPI.update(editingCategory.id, editingCategory);
            } else {
                await categoriesAPI.create(newCategory);
            }
            await loadData();
            setShowCategoryModal(false);
            setEditingCategory(null);
            setNewCategory({ name: "", description: "", image: "", order: 0 });
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la catégorie:', error);
        }
    };

    const handleCategoryDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                await categoriesAPI.delete(id);
                await loadData();
            } catch (error) {
                console.error('Erreur lors de la suppression de la catégorie:', error);
            }
        }
    };

    // Gestion des produits
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productsAPI.update(editingProduct.id, editingProduct);
            } else {
                await productsAPI.create(newProduct);
            }
            await loadData();
            setShowProductModal(false);
            setEditingProduct(null);
            setNewProduct({ name: "", description: "", price: 0, categoryId: "", image: "", available: true });
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du produit:', error);
        }
    };

    const handleProductDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            try {
                await productsAPI.delete(id);
                await loadData();
            } catch (error) {
                console.error('Erreur lors de la suppression du produit:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des données...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <Database className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">Administration Blézy</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Connecté en tant que {user?.username}</span>
                            <button
                                onClick={onLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {[
                            { id: 'dashboard', label: 'Tableau de bord', icon: Award },
                            { id: 'categories', label: 'Catégories', icon: ShoppingBag },
                            { id: 'products', label: 'Produits', icon: ShoppingBag }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="inline-block h-5 w-5 mr-2" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Contenu principal */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Tableau de bord */}
                {activeTab === 'dashboard' && (
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Vue d'ensemble
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <ShoppingBag className="h-8 w-8 text-blue-600" />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-blue-600">Total Catégories</p>
                                            <p className="text-2xl font-semibold text-blue-900">{categories.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <ShoppingBag className="h-8 w-8 text-green-600" />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-green-600">Total Produits</p>
                                            <p className="text-2xl font-semibold text-green-900">{products.length}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* Gestion des catégories */}
                {activeTab === 'categories' && (
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Gestion des catégories
                                </h3>
                                <button
                                    onClick={() => setShowCategoryModal(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Nouvelle catégorie
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {category.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {category.order}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => {
                                                            setEditingCategory(category);
                                                            setShowCategoryModal(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCategoryDelete(category.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gestion des produits */}
                {activeTab === 'products' && (
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Gestion des produits
                                </h3>
                                <button
                                    onClick={() => setShowProductModal(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Nouveau produit
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponible</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {categories.find(c => c.id === product.categoryId)?.name || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.available
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.available ? 'Oui' : 'Non'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => {
                                                            setEditingProduct(product);
                                                            setShowProductModal(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleProductDelete(product.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gestion des utilisateurs */}
                {activeTab === 'users' && (
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Gestion des utilisateurs
                            </h3>
                            <p className="text-gray-500">Fonctionnalité à venir...</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal Catégorie */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                            </h3>
                            <form onSubmit={handleCategorySubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory ? editingCategory.name : newCategory.name}
                                        onChange={(e) => editingCategory
                                            ? setEditingCategory({ ...editingCategory, name: e.target.value })
                                            : setNewCategory({ ...newCategory, name: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={editingCategory ? editingCategory.description : newCategory.description}
                                        onChange={(e) => editingCategory
                                            ? setEditingCategory({ ...editingCategory, description: e.target.value })
                                            : setNewCategory({ ...newCategory, description: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory ? editingCategory.image : newCategory.image}
                                        onChange={(e) => editingCategory
                                            ? setEditingCategory({ ...editingCategory, image: e.target.value })
                                            : setNewCategory({ ...newCategory, image: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ordre
                                    </label>
                                    <input
                                        type="number"
                                        value={editingCategory ? editingCategory.order : newCategory.order}
                                        onChange={(e) => editingCategory
                                            ? setEditingCategory({ ...editingCategory, order: parseInt(e.target.value) })
                                            : setNewCategory({ ...newCategory, order: parseInt(e.target.value) })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCategoryModal(false);
                                            setEditingCategory(null);
                                            setNewCategory({ name: "", description: "", image: "", order: 0 });
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {editingCategory ? 'Modifier' : 'Créer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Produit */}
            {showProductModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                            </h3>
                            <form onSubmit={handleProductSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct ? editingProduct.name : newProduct.name}
                                        onChange={(e) => editingProduct
                                            ? setEditingProduct({ ...editingProduct, name: e.target.value })
                                            : setNewProduct({ ...newProduct, name: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={editingProduct ? editingProduct.description : newProduct.description}
                                        onChange={(e) => editingProduct
                                            ? setEditingProduct({ ...editingProduct, description: e.target.value })
                                            : setNewProduct({ ...newProduct, description: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catégorie
                                    </label>
                                    <select
                                        value={editingProduct ? editingProduct.categoryId : newProduct.categoryId}
                                        onChange={(e) => editingProduct
                                            ? setEditingProduct({ ...editingProduct, categoryId: parseInt(e.target.value) })
                                            : setNewProduct({ ...newProduct, categoryId: parseInt(e.target.value) })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct ? editingProduct.image : newProduct.image}
                                        onChange={(e) => editingProduct
                                            ? setEditingProduct({ ...editingProduct, image: e.target.value })
                                            : setNewProduct({ ...newProduct, image: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={editingProduct ? editingProduct.available : newProduct.available}
                                            onChange={(e) => editingProduct
                                                ? setEditingProduct({ ...editingProduct, available: e.target.checked })
                                                : setNewProduct({ ...newProduct, available: e.target.checked })
                                            }
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Disponible</span>
                                    </label>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProductModal(false);
                                            setEditingProduct(null);
                                            setNewProduct({ name: "", description: "", price: 0, categoryId: "", image: "", available: true });
                                        }}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {editingProduct ? 'Modifier' : 'Créer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
