import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthLayout } from '../layouts';
import { Input, Select } from '../components/common';
import { useAuth } from '../hooks';
import { USER_ROLES, PRIMARY_GOALS } from '../utils/constants';
import { Shield, Clock, Heart, ArrowRight } from 'lucide-react';

export const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [userType, setUserType] = useState(USER_ROLES.CLIENT);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        name: '',
        role: USER_ROLES.CLIENT,
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(loginData.email, loginData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup({ ...signupData, role: userType });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950">
                {/* Background Blobs */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl mix-blend-screen animate-float-delayed" />
                </div>

                <div className="max-w-5xl w-full relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-950/80 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 grid md:grid-cols-2"
                    >
                        {/* Left - Illustration/Info */}
                        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative z-10"
                            >
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200 backdrop-blur-md mb-6">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Join MindAid Today
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                                    Your Journey to <br />
                                    <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-200 bg-clip-text text-transparent">
                                        Inner Peace
                                    </span>
                                </h2>
                                <p className="text-indigo-100/80 text-lg leading-relaxed">
                                    Join thousands of others who have found clarity, support, and healing through our platform.
                                </p>
                            </motion.div>

                            <div className="space-y-6 relative z-10 mt-12">
                                {[
                                    { icon: Shield, title: '100% Confidential', desc: 'Your privacy is our top priority' },
                                    { icon: Heart, title: 'Licensed Experts', desc: 'Verified professionals you can trust' },
                                    { icon: Clock, title: 'Flexible Scheduling', desc: 'Sessions that fit your life' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                                            <p className="text-indigo-200/60 text-xs">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Form */}
                        <div className="p-8 md:p-12 bg-gray-950/50">
                            {/* Tabs */}
                            <div className="flex gap-2 mb-8 bg-gray-900/60 rounded-full p-1.5 border border-white/10">
                                {['login', 'signup'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/40'
                                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
                                            }`}
                                    >
                                        {tab === 'login' ? 'Log In' : 'Sign Up'}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === 'login' ? (
                                    <motion.form
                                        key="login"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleLogin}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={loginData.email}
                                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                                                <input
                                                    type="password"
                                                    value={loginData.password}
                                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input type="checkbox" className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500/50" />
                                                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                                            </label>
                                            <button type="button" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                                                Forgot password?
                                            </button>
                                        </div>

                                        {error && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {loading ? 'Signing in...' : 'Sign In'}
                                        </motion.button>

                                        <p className="text-center text-sm text-gray-500">
                                            Demo Account: <span className="text-gray-400 font-mono bg-gray-900 px-1.5 py-0.5 rounded">john.doe@example.com</span>
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.form
                                        key="signup"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSignup}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {[USER_ROLES.CLIENT, USER_ROLES.COUNSELLOR].map((role) => (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => setUserType(role)}
                                                    className={`py-2.5 px-4 rounded-xl border transition-all text-sm font-medium ${userType === role
                                                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                                                            : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
                                                        }`}
                                                >
                                                    {role === USER_ROLES.CLIENT ? "I'm a Client" : "I'm a Counsellor"}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={signupData.name}
                                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={signupData.email}
                                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                                                <input
                                                    type="password"
                                                    value={signupData.password}
                                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                                    placeholder="Create a strong password"
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {loading ? 'Creating Account...' : 'Create Account'}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthLayout>
    );
};
