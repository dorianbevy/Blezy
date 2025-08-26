import React from 'react';

function TestComponent() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-6 text-center">
                    Test Tailwind CSS
                </h1>

                <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Classes Tailwind de test
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-medium text-blue-800">Couleurs</h3>
                            <p className="text-blue-600">bg-blue-100, text-blue-800</p>
                        </div>

                        <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
                            <h3 className="font-medium text-green-800">Espacement</h3>
                            <p className="text-green-600">p-4, m-4, gap-4</p>
                        </div>

                        <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
                            <h3 className="font-medium text-yellow-800">Typographie</h3>
                            <p className="text-yellow-600">text-2xl, font-bold</p>
                        </div>

                        <div className="bg-red-100 p-4 rounded-lg border-l-4 border-red-500">
                            <h3 className="font-medium text-red-800">Layout</h3>
                            <p className="text-red-600">grid, flex, container</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Responsive Design
                    </h2>
                    <div className="text-center">
                        <p className="text-sm md:text-base lg:text-lg text-gray-600">
                            Cette page s'adapte à différentes tailles d'écran
                        </p>
                        <div className="mt-4 flex justify-center space-x-2">
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">Mobile</span>
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">Tablet</span>
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">Desktop</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestComponent;