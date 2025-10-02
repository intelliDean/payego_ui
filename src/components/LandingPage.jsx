import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const features = [
        {
            icon: '💳',
            title: 'Multi-Currency Wallets',
            description: 'Support for 20+ currencies including USD, EUR, GBP, NGN and more',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: '🚀',
            title: 'Instant Top-ups',
            description: 'Add funds instantly with Stripe or PayPal integration',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: '🏦',
            title: 'Bank Withdrawals',
            description: 'Withdraw to your bank account with real-time processing',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: '🔄',
            title: 'Currency Exchange',
            description: 'Convert between currencies at competitive rates',
            gradient: 'from-orange-500 to-red-500'
        },
        {
            icon: '⚡',
            title: 'Lightning Transfers',
            description: 'Send money to other users or external bank accounts instantly',
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            icon: '🔒',
            title: 'Bank-Level Security',
            description: 'Your funds are protected with enterprise-grade security',
            gradient: 'from-gray-600 to-gray-800'
        }
    ];

    const stats = [
        { number: '50K+', label: 'Active Users' },
        { number: '$10M+', label: 'Processed' },
        { number: '20+', label: 'Currencies' },
        { number: '99.9%', label: 'Uptime' }
    ];

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                        <div className="text-center">
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                                        <span className="text-white font-bold text-3xl">P</span>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                </div>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                Your Money,
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Simplified</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                The modern digital wallet that makes managing multiple currencies as easy as sending a text. 
                                Top up, withdraw, transfer, and convert with confidence.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <button
                                    onClick={handleGetStarted}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="relative z-10">Get Started Free</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                                
                                <button
                                    onClick={handleLogin}
                                    className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Sign In
                                </button>
                            </div>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                        <div className="text-gray-600 text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Everything you need in one place
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Powerful features designed to make your financial life simpler and more secure
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-2xl">{feature.icon}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to take control of your finances?
                        </h2>
                        
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust Payego with their financial needs. 
                            Get started in less than 2 minutes.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleGetStarted}
                                className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50"
                            >
                                Create Free Account
                            </button>
                            
                            <button
                                onClick={handleLogin}
                                className="px-8 py-4 bg-transparent text-white rounded-2xl font-semibold text-lg border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Sign In Instead
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-3 mb-6 md:mb-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold">P</span>
                                </div>
                                <span className="text-2xl font-bold">Payego</span>
                            </div>
                            
                            <div className="flex space-x-8 text-gray-400">
                                <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
                                <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
                                <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2025 Payego. All rights reserved. Built with ❤️ for the modern world.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </ErrorBoundary>
    );
}

export default LandingPage;