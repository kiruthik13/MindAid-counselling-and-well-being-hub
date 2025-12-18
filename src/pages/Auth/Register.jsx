import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, Shield, Mail, Lock, UserCircle, ArrowRight, Sparkles, Check, Star, Award } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        try {
            setLoading(true);
            await register(formData.email, formData.password, formData.name, formData.role);
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (password.length < 10) return { strength: 2, label: 'Medium', color: 'bg-yellow-500' };
        return { strength: 3, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="min-h-screen flex overflow-hidden bg-slate-50">
            {/* Left Side - Form */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-md animate-[fade-in_0.6s_ease-out]">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 shadow-2xl shadow-green-500/50 mb-6 relative group hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-8 h-8 text-white animate-pulse" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                        </div>
                        <h1 className="text-4xl font-bold gradient-text-warm mb-2">
                            Join MindAid
                        </h1>
                        <p className="text-slate-600 text-lg">
                            Start your wellness journey today
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
                        {error && (
                            <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 p-4 rounded-xl animate-[shake_0.5s_ease-in-out]">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-3">
                                    I am a...
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect('client')}
                                        className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 group ${formData.role === 'client'
                                                ? 'border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg scale-105'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <User size={28} className={`mb-2 transition-colors ${formData.role === 'client' ? 'text-indigo-600' : 'text-slate-600'}`} />
                                        <span className={`font-semibold transition-colors ${formData.role === 'client' ? 'text-indigo-700' : 'text-slate-700'}`}>
                                            Client
                                        </span>
                                        {formData.role === 'client' && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRoleSelect('admin')}
                                        className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 group ${formData.role === 'admin'
                                                ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <Shield size={28} className={`mb-2 transition-colors ${formData.role === 'admin' ? 'text-purple-600' : 'text-slate-600'}`} />
                                        <span className={`font-semibold transition-colors ${formData.role === 'admin' ? 'text-purple-700' : 'text-slate-700'}`}>
                                            Admin
                                        </span>
                                        {formData.role === 'admin' && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                                                <Check size={14} className="text-white" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Name Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <UserCircle className="h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= passwordStrength.strength ? passwordStrength.color : 'bg-slate-200'
                                                        }`}
                                                ></div>
                                            ))}
                                        </div>
                                        <p className={`text-xs font-medium ${passwordStrength.strength === 3 ? 'text-green-600' :
                                                passwordStrength.strength === 2 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                            {passwordStrength.label}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group relative px-6 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="text-center pt-4 border-t border-slate-200">
                            <p className="text-sm text-slate-600">
                                Already have an account?{' '}
                                <Link
                                    to="/auth/login"
                                    className="font-semibold text-green-600 hover:text-green-700 transition-colors relative group"
                                >
                                    Sign in
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                    <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-[pulse_7s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-[pulse_9s_ease-in-out_infinite_1s]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-16 text-white">
                    {/* Floating Icons */}
                    <div className="absolute top-24 left-24 animate-[floating_5s_ease-in-out_infinite]">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <Star className="w-8 h-8" />
                        </div>
                    </div>
                    <div className="absolute top-32 right-24 animate-[floating_6s_ease-in-out_infinite_1.5s]">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <Award className="w-8 h-8" />
                        </div>
                    </div>
                    <div className="absolute bottom-24 left-40 animate-[floating_7s_ease-in-out_infinite_0.5s]">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <Sparkles className="w-8 h-8" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-xl text-center space-y-8 animate-[fade-in_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-semibold">Join Our Community</span>
                        </div>

                        <h2 className="text-5xl font-bold leading-tight">
                            Begin Your Journey
                            <br />
                            <span className="bg-gradient-to-r from-yellow-200 via-green-200 to-teal-200 bg-clip-text text-transparent">
                                To Wellness
                            </span>
                        </h2>

                        <p className="text-xl text-white/90 leading-relaxed">
                            Create your account and unlock access to professional counselling, wellness resources, and a supportive community dedicated to your mental health.
                        </p>

                        {/* Features */}
                        <div className="grid gap-4 pt-8 text-left">
                            {[
                                { icon: Check, text: 'Access to certified counsellors' },
                                { icon: Check, text: 'Personalized wellness resources' },
                                { icon: Check, text: 'Secure and confidential platform' },
                                { icon: Check, text: '24/7 support and guidance' }
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                        <feature.icon size={14} className="text-green-600" />
                                    </div>
                                    <span className="text-white/90">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative Shapes */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
        </div>
    );
};

export default Register;
