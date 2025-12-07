import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-gray-950 text-gray-300 pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/20">
                                <Heart className="w-4 h-4 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-50 tracking-tight">MindAid</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your safe space for mental wellness. Connect with licensed professionals and start your journey to a healthier mind today.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -3, color: '#fff' }}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 transition-colors hover:bg-indigo-500 hover:border-indigo-500"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-50 font-semibold mb-6">Platform</h3>
                        <ul className="space-y-4">
                            {['Home', 'Counsellors', 'Resources', 'Support'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-sm text-gray-400 hover:text-sky-300 transition-colors flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-gray-50 font-semibold mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/legal/privacy" className="text-sm text-gray-400 hover:text-sky-300 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/legal/terms" className="text-sm text-gray-400 hover:text-sky-300 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="text-sm text-gray-400 hover:text-sky-300 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-gray-50 font-semibold mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                                <span>support@mindaid.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                                <span>1-800-MINDAID</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                                <span>123 Wellness Ave, Mind City, MC 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} MindAid. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Made with</span>
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                        <span>for mental wellness</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
