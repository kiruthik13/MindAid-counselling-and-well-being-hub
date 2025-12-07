/**
 * Premium Counsellor Profile Page
 * Detailed profile with hero section, tabs, and booking integration
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    MapPin,
    Clock,
    Award,
    BookOpen,
    MessageCircle,
    Video,
    Calendar,
    CheckCircle,
    Globe,
    Shield,
} from 'lucide-react';
import { MainLayout } from '../layouts';
import { Button, Card, Badge } from '../components/common';
import { mockCounsellors } from '../utils/mockData';

export const CounsellorProfile = () => {
    const { id } = useParams();
    const counsellor = mockCounsellors.find((c) => c.id === parseInt(id)) || mockCounsellors[0];
    const [activeTab, setActiveTab] = useState('about');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <MainLayout>
            {/* Hero Profile Card */}
            <div className="bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50"
                    >
                        <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
                        <div className="px-8 pb-8">
                            <div className="relative flex flex-col md:flex-row items-end -mt-12 mb-6 gap-6">
                                <div className="relative">
                                    <img
                                        src={counsellor.avatar}
                                        alt={counsellor.name}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{counsellor.name}</h1>
                                    <p className="text-primary-600 font-medium text-lg">Clinical Psychologist</p>
                                </div>
                                <div className="flex gap-3 mb-2">
                                    <Link to="/chat">
                                        <Button variant="outline" className="rounded-full">
                                            <MessageCircle className="w-4 h-4 mr-2" /> Chat
                                        </Button>
                                    </Link>
                                    <Button className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
                                        <Video className="w-4 h-4 mr-2" /> Book Session
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-600 border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    <span className="font-bold text-gray-900">{counsellor.rating}</span>
                                    <span>(120 reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary-500" />
                                    <span>{counsellor.yearsOfExperience} Years Exp.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    <span>Online & In-person</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary-500" />
                                    <span>{counsellor.languages.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tabs */}
                        <div className="flex gap-2 border-b border-gray-200">
                            {['about', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === tab ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'about' && (
                                <motion.div
                                    key="about"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <section>
                                        <h3 className="text-xl font-bold mb-4">About Me</h3>
                                        <p className="text-gray-600 leading-relaxed">{counsellor.bio}</p>
                                        <p className="text-gray-600 leading-relaxed mt-4">
                                            I believe in creating a safe, non-judgmental space where you can explore your
                                            thoughts and feelings freely. My approach is integrative, combining CBT,
                                            mindfulness, and person-centered therapy to best suit your unique needs.
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold mb-4">Specializations</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {counsellor.specializations.map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold mb-4">Qualifications</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <Award className="w-5 h-5 text-primary-600 mt-1" />
                                                <div>
                                                    <p className="font-semibold">Ph.D. in Clinical Psychology</p>
                                                    <p className="text-sm text-gray-500">University of Stanford, 2015</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Award className="w-5 h-5 text-primary-600 mt-1" />
                                                <div>
                                                    <p className="font-semibold">Licensed Professional Counsellor (LPC)</p>
                                                    <p className="text-sm text-gray-500">License #12345678</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'reviews' && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                                        A
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">Anonymous Client</p>
                                                        <p className="text-xs text-gray-500">2 weeks ago</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600">
                                                "Dr. {counsellor.name.split(' ')[1]} is incredibly understanding and patient.
                                                I've made so much progress in just a few sessions. Highly recommended!"
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar - Availability */}
                    <div className="space-y-6">
                        <Card className="sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Book a Session</h3>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Session Fee</span>
                                    <span className="text-2xl font-bold text-primary-600">$120</span>
                                </div>
                                <p className="text-xs text-gray-500">50 minute session</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <h4 className="font-semibold text-sm text-gray-700">Available Slots (Tomorrow)</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
                                        <button
                                            key={time}
                                            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full rounded-xl py-3 shadow-lg">
                                Proceed to Booking
                            </Button>

                            <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3" /> 100% Confidential & Secure
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
