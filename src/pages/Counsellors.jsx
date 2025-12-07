/**
 * Premium Counsellor List Page
 * Advanced filtering and animated cards
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock, ChevronDown, X } from 'lucide-react';
import { MainLayout } from '../layouts';
import { mockCounsellors } from '../utils/mockData';
import { SPECIALIZATIONS, LANGUAGES } from '../utils/constants';

export const Counsellors = () => {
    const [filters, setFilters] = useState({
        search: '',
        specialization: '',
        language: '',
        availability: '',
    });
    const [showFilters, setShowFilters] = useState(false);

    const filteredCounsellors = mockCounsellors.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            c.bio.toLowerCase().includes(filters.search.toLowerCase());
        const matchesSpec = !filters.specialization || c.specializations.includes(filters.specialization);
        const matchesLang = !filters.language || c.languages.includes(filters.language);
        return matchesSearch && matchesSpec && matchesLang;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <MainLayout>
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-purple-900/80 to-pink-900/80"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
                    >
                        Find Your Perfect Match
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed"
                    >
                        Connect with licensed professionals who understand your unique journey.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-200/50"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name or keyword..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-700 w-full md:w-auto justify-center"
                        >
                            <Filter className="w-5 h-5" /> Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-gray-100">
                                    <select
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
                                        value={filters.specialization}
                                        onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                                    >
                                        <option value="">All Specializations</option>
                                        {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <select
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none"
                                        value={filters.language}
                                        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                                    >
                                        <option value="">All Languages</option>
                                        {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                    <button
                                        onClick={() => setFilters({ search: '', specialization: '', language: '', availability: '' })}
                                        className="text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
                >
                    {filteredCounsellors.map((counsellor) => (
                        <motion.div
                            key={counsellor.id}
                            variants={cardVariants}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-200/50 group hover:shadow-2xl hover:border-indigo-300 transition-all"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="relative">
                                        <img
                                            src={counsellor.avatar}
                                            alt={counsellor.name}
                                            className="w-20 h-20 rounded-full object-cover border-4 border-primary-50"
                                        />
                                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="font-bold text-yellow-700">{counsellor.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1">{counsellor.name}</h3>
                                <p className="text-primary-600 font-medium text-sm mb-3">Clinical Psychologist</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {counsellor.specializations.slice(0, 3).map((spec) => (
                                        <span key={spec} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                            {spec}
                                        </span>
                                    ))}
                                    {counsellor.specializations.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                            +{counsellor.specializations.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                    {counsellor.bio}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{counsellor.yearsOfExperience} yrs exp</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>Online</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link to={`/counsellors/${counsellor.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-2.5 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
                                        >
                                            View Profile
                                        </motion.button>
                                    </Link>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-semibold shadow-lg hover:bg-primary-700 transition-colors"
                                    >
                                        Book Now
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </MainLayout>
    );
};
