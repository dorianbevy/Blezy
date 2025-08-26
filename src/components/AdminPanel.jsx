import React from "react";
import { Lock, Users, ShoppingBag, Award, Plus, Edit, Trash2, X, Save, Image as ImageIcon } from "lucide-react";

// Composant de la page admin
export default function AdminPanel({ user, onLogout, products, onProductsUpdate }) {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [editingProduct, setEditingProduct] = React.useState(null);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [newProduct, setNewProduct] = React.useState({
        cat: "",
        items: [{ id: Date.now(), n: "", d: "" }],
        img: ""
    });

    // Fonction pour ajouter un nouvel item à un produit
    const addItemToProduct = (productId) => {
        const updatedProducts = products.map(p =>
            p.id === productId
                ? { ...p, items: [...p.items, { id: Date.now(), n: "", d: "" }] }
                : p
        );
        onProductsUpdate(updatedProducts);
    };

    // Fonction pour supprimer un item d'un produit
    const removeItemFromProduct = (productId, itemId) => {
        const updatedProducts = products.map(p =>
            p.id === productId
                ? { ...p, items: p.items.filter(item => item.id !== itemId) }
                : p
        );
        onProductsUpdate(updatedProducts);
    };

    // Fonction pour mettre à jour un item
    const updateItem = (productId, itemId, field, value) => {
        const updatedProducts = products.map(p =>
            p.id === productId
                ? {
                    ...p,
                    items: p.items.map(item =>
                        item.id === itemId
                            ? { ...item, [field]: value }
                            : item
                    )
                }
                : p
        );
        onProductsUpdate(updatedProducts);
    };

    // Fonction pour sauvegarder un produit en cours d'édition
    const saveProduct = () => {
        if (editingProduct) {
            const updatedProducts = products.map(p =>
                p.id === editingProduct.id ? editingProduct : p
            );
            onProductsUpdate(updatedProducts);
            setEditingProduct(null);
        }
    };

    // Fonction pour annuler l'édition
    const cancelEdit = () => {
        setEditingProduct(null);
    };

    // Fonction pour supprimer un produit
    const deleteProduct = (productId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            const updatedProducts = products.filter(p => p.id !== productId);
            onProductsUpdate(updatedProducts);
        }
    };

    // Fonction pour ajouter un nouveau produit
    const addNewProduct = () => {
        const productToAdd = {
            ...newProduct,
            id: Date.now()
        };
        const updatedProducts = [...products, productToAdd];
        onProductsUpdate(updatedProducts);
        setNewProduct({ cat: "", items: [{ id: Date.now(), n: "", d: "" }], img: "" });
        setShowAddModal(false);
    };

    // Fonction pour ajouter un nouvel item au nouveau produit
    const addItemToNewProduct = () => {
        setNewProduct(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), n: "", d: "" }]
        }));
    };

    // Fonction pour supprimer un item du nouveau produit
    const removeItemFromNewProduct = (itemId) => {
        setNewProduct(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== itemId)
        }));
    };

    // Fonction pour mettre à jour un item du nouveau produit
    const updateNewProductItem = (itemId, field, value) => {
        setNewProduct(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === itemId
                    ? { ...item, [field]: value }
                    : item
            )
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
            {/* Header Admin */}
            <header className="bg-white border-b border-stone-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full grid place-items-center">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-stone-800">Administration Blézy</div>
                            <div className="text-sm text-stone-600">Connecté en tant que {user.username}</div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors duration-200 font-medium"
                    >
                        Déconnexion
                    </button>
                </div>
            </header>

            {/* Navigation des onglets */}
            <nav className="bg-white border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'dashboard'
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                                }`}
                        >
                            Tableau de bord
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'products'
                                ? 'border-amber-500 text-amber-600'
                                : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                                }`}
                        >
                            Gestion des produits
                        </button>
                    </div>
                </div>
            </nav>

            {/* Contenu Admin */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === 'dashboard' && (
                    <>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-stone-800 mb-4">Tableau de bord</h1>
                            <p className="text-stone-600 text-lg">Bienvenue dans votre espace d'administration</p>
                        </div>

                        {/* Placeholder pour le contenu admin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-stone-800 mb-2">Gestion des utilisateurs</h3>
                                <p className="text-stone-600 text-sm">Gérez les comptes et permissions</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <ShoppingBag className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-stone-800 mb-2">Gestion des produits</h3>
                                <p className="text-stone-600 text-sm">Ajoutez, modifiez ou supprimez des produits</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <Award className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-stone-800 mb-2">Statistiques</h3>
                                <p className="text-stone-600 text-sm">Consultez les métriques et rapports</p>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-stone-500 text-sm">
                                🚧 Cette interface est en cours de développement. Le contenu sera ajouté selon vos besoins.
                            </p>
                        </div>
                    </>
                )}

                {activeTab === 'products' && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-stone-800 mb-2">Gestion des produits</h1>
                                <p className="text-stone-600">Gérez les catégories et produits affichés sur le site</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Ajouter une catégorie
                            </button>
                        </div>

                        {/* Liste des produits */}
                        <div className="space-y-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6">
                                    {editingProduct?.id === product.id ? (
                                        // Mode édition
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <input
                                                    type="text"
                                                    value={editingProduct.cat}
                                                    onChange={(e) => setEditingProduct(prev => ({ ...prev, cat: e.target.value }))}
                                                    className="text-xl font-semibold text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 w-full"
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={saveProduct}
                                                        className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="p-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors duration-200"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-2">Image</label>
                                                    <input
                                                        type="text"
                                                        value={editingProduct.img}
                                                        onChange={(e) => setEditingProduct(prev => ({ ...prev, img: e.target.value }))}
                                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-stone-50"
                                                        placeholder="Chemin vers l'image"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    {editingProduct.img && (
                                                        <div className="w-32 h-24 bg-stone-100 rounded-lg overflow-hidden">
                                                            <img src={editingProduct.img} alt="Aperçu" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <label className="block text-sm font-medium text-stone-700">Produits</label>
                                                    <button
                                                        onClick={() => addItemToProduct(product.id)}
                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200 transition-colors duration-200"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                        Ajouter
                                                    </button>
                                                </div>
                                                <div className="space-y-3">
                                                    {editingProduct.items.map((item, index) => (
                                                        <div key={item.id} className="flex gap-3 p-3 bg-stone-50 rounded-lg">
                                                            <div className="flex-1 space-y-2">
                                                                <input
                                                                    type="text"
                                                                    value={item.n}
                                                                    onChange={(e) => {
                                                                        const updatedItems = [...editingProduct.items];
                                                                        updatedItems[index] = { ...item, n: e.target.value };
                                                                        setEditingProduct(prev => ({ ...prev, items: updatedItems }));
                                                                    }}
                                                                    className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white"
                                                                    placeholder="Nom du produit"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={item.d}
                                                                    onChange={(e) => {
                                                                        const updatedItems = [...editingProduct.items];
                                                                        updatedItems[index] = { ...item, d: e.target.value };
                                                                        setEditingProduct(prev => ({ ...prev, items: updatedItems }));
                                                                    }}
                                                                    className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white"
                                                                    placeholder="Description"
                                                                />
                                                            </div>
                                                            <button
                                                                onClick={() => removeItemFromProduct(product.id, item.id)}
                                                                className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Mode affichage
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-semibold text-stone-800">{product.cat}</h3>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingProduct({ ...product })}
                                                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(product.id)}
                                                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-stone-600 mb-2">Image : {product.img}</p>
                                                    {product.img && (
                                                        <div className="w-32 h-24 bg-stone-100 rounded-lg overflow-hidden">
                                                            <img src={product.img} alt={product.cat} className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-stone-600 mb-2">Produits ({product.items.length}) :</p>
                                                    <ul className="space-y-1">
                                                        {product.items.map((item) => (
                                                            <li key={item.id} className="text-sm text-stone-700">
                                                                <span className="font-medium">{item.n}</span>
                                                                {item.d && <span className="text-stone-500 ml-2">- {item.d}</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>

            {/* Modal d'ajout de produit */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-stone-800">Ajouter une nouvelle catégorie</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors duration-200 flex items-center justify-center text-stone-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-2">Nom de la catégorie</label>
                                    <input
                                        type="text"
                                        value={newProduct.cat}
                                        onChange={(e) => setNewProduct(prev => ({ ...prev, cat: e.target.value }))}
                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                                        placeholder="Ex: Pains, Viennoiseries..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-700 mb-2">Image</label>
                                    <input
                                        type="text"
                                        value={newProduct.img}
                                        onChange={(e) => setNewProduct(prev => ({ ...prev, img: e.target.value }))}
                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg"
                                        placeholder="Chemin vers l'image"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-sm font-medium text-stone-700">Produits</label>
                                        <button
                                            onClick={addItemToNewProduct}
                                            className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200 transition-colors duration-200"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Ajouter un produit
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {newProduct.items.map((item, index) => (
                                            <div key={item.id} className="flex gap-3 p-3 bg-stone-50 rounded-lg">
                                                <div className="flex-1 space-y-2">
                                                    <input
                                                        type="text"
                                                        value={item.n}
                                                        onChange={(e) => updateNewProductItem(item.id, 'n', e.target.value)}
                                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white"
                                                        placeholder="Nom du produit"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.d}
                                                        onChange={(e) => updateNewProductItem(item.id, 'd', e.target.value)}
                                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white"
                                                        placeholder="Description"
                                                    />
                                                </div>
                                                {newProduct.items.length > 1 && (
                                                    <button
                                                        onClick={() => removeItemFromNewProduct(item.id)}
                                                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={addNewProduct}
                                        disabled={!newProduct.cat || newProduct.items.some(item => !item.n)}
                                        className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                                    >
                                        Ajouter la catégorie
                                    </button>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="px-6 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors duration-200 font-medium"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
