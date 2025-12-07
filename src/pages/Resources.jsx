/**
 * Premium Resources Page
 * Resource library with masonry layout and filtering
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Video, Link as LinkIcon, Download, ExternalLink, Search } from 'lucide-react';
import { MainLayout } from '../layouts';
import { mockResources } from '../utils/mockData';
import { RESOURCE_TYPES, RESOURCE_CATEGORIES } from '../utils/constants';

export const Resources = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');

    const filteredResources = mockResources.filter((resource) => {
        const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
        const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
            resource.description.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'video': return <Video className="w-5 h-5" />;
            case 'pdf': return <FileText className="w-5 h-5" />;
            default: return <LinkIcon className="w-5 h-5" />;
        }
    };

    return (
        <MainLayout>
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                        Resource Library
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Curated articles, videos, and guides to support your mental health journey.
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 border border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none text-white placeholder-gray-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'All'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        All
                    </button>
                    {RESOURCE_CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource, index) => (
                        <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden group flex flex-col h-full hover:shadow-2xl hover:border-indigo-300 transition-all"
                        >
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${resource.type === 'video' ? 'bg-red-50 text-red-600' :
                                            resource.type === 'pdf' ? 'bg-orange-50 text-orange-600' :
                                                'bg-blue-50 text-blue-600'
                                        }`}>
                                        {resource.type}
                                    </span>
                                    <div className="text-gray-400 group-hover:text-primary-600 transition-colors">
                                        {getIcon(resource.type)}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {resource.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {resource.description}
                                </p>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-medium">{resource.category}</span>
                                <button className="text-sm font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    {resource.type === 'pdf' ? 'Download' : 'Read More'}
                                    {resource.type === 'pdf' ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};
