import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, ArrowRight, Sparkles, Brain, Heart, Shield, Zap, Star, Award, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { login } = useAuth();
    const navigate = useNavigate();

    // Track mouse position for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            await login(email, password);

            // Premium Success Toast
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-[scale-in_0.3s_ease-out]' : 'animate-[fade-out_0.2s_ease-in]'
                        } max-w-md w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-2xl rounded-2xl pointer-events-auto flex items-center gap-4 p-4 border border-white/20`}
                >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-bold text-lg">Login Successful!</p>
                        <p className="text-white/90 text-sm">Welcome back to MindAid</p>
                    </div>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                    >
                        <XCircle size={20} />
                    </button>
                </div>
            ), {
                duration: 3000,
                position: 'top-center',
            });
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');

            // Premium Error Toast
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-[shake_0.5s_ease-in-out]' : 'animate-[fade-out_0.2s_ease-in]'
                        } max-w-md w-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 shadow-2xl rounded-2xl pointer-events-auto flex items-center gap-4 p-4 border border-white/20`}
                >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center animate-[shake_0.5s_ease-in-out]">
                        <XCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-bold text-lg">Login Failed!</p>
                        <p className="text-white/90 text-sm">Please check your credentials and try again</p>
                    </div>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                    >
                        <XCircle size={20} />
                    </button>
                </div>
            ), {
                duration: 4000,
                position: 'top-center',
            });

            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-slate-950 relative">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950"></div>

                {/* Animated Gradient Orbs */}
                <div
                    className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
                    style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
                ></div>
                <div
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-600/30 via-purple-600/20 to-transparent rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]"
                    style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
                ></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-[spin-slow_20s_linear_infinite]"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `floating ${5 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Left Side - Form */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-md">
                    {/* Logo with Advanced Animation */}
                    <div className="text-center mb-10 animate-[fade-in_0.8s_ease-out]">
                        <div className="relative inline-block mb-8 group">
                            {/* Rotating Ring */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-[spin-slow_8s_linear_infinite]"></div>

                            {/* Logo Container */}
                            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl shadow-indigo-500/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Brain className="w-10 h-10 text-white animate-pulse" />

                                {/* Orbiting Dots */}
                                <div className="absolute inset-0 animate-[spin-slow_4s_linear_infinite]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50"></div>
                                </div>
                                <div className="absolute inset-0 animate-[spin-slow_4s_linear_infinite_reverse]">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-300 rounded-full shadow-lg shadow-pink-300/50"></div>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-[gradient-shift_3s_ease-in-out_infinite]">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Continue your wellness journey
                        </p>
                    </div>

                    {/* Premium Glass Card */}
                    <div className="relative group animate-[scale-in_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>

                        {/* Glass Card */}
                        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 shadow-2xl">
                            {error && (
                                <div className="mb-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 backdrop-blur-xl p-4 rounded-2xl animate-[shake_0.5s_ease-in-out]">
                                    <p className="text-sm text-red-300 font-medium">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-7">
                                {/* Email Input with Premium Effects */}
                                <div className="group/input">
                                    <label className="block text-base font-bold mb-3">
                                        <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">Email Address</span>
                                    </label>
                                    <div className="relative">
                                        {/* Input Glow */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-focus-within/input:opacity-30 blur-md transition-opacity duration-300"></div>

                                        <div className="relative flex items-center">
                                            <div className="absolute left-5 flex items-center pointer-events-none z-10">
                                                <Mail className="h-5 w-5 text-slate-400 group-focus-within/input:text-indigo-300 transition-colors duration-300" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-14 pr-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400/60 focus:bg-white/10 transition-all duration-300 font-medium"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="group/input">
                                    <label className="block text-base font-bold mb-3">
                                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Password</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-focus-within/input:opacity-30 blur-md transition-opacity duration-300"></div>

                                        <div className="relative flex items-center">
                                            <div className="absolute left-5 flex items-center pointer-events-none z-10">
                                                <Lock className="h-5 w-5 text-slate-400 group-focus-within/input:text-purple-300 transition-colors duration-300" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-14 pr-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-all duration-300 font-medium"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between pt-2">
                                    <label className="flex items-center group/check cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded-md bg-white/5 border-2 border-white/20 text-indigo-500 focus:ring-2 focus:ring-indigo-400/50 focus:ring-offset-0 transition-all cursor-pointer"
                                        />
                                        <span className="ml-3 text-sm font-medium text-slate-300 group-hover/check:text-white transition-colors">
                                            Remember me
                                        </span>
                                    </label>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-sm font-bold text-indigo-300 hover:text-white transition-colors relative group/link"
                                    >
                                        Forgot password?
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 group-hover/link:w-full transition-all duration-300"></span>
                                    </Link>
                                </div>

                                {/* Premium Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full group/btn overflow-hidden mt-8"
                                >
                                    {/* Button Glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl opacity-75 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300"></div>

                                    {/* Button Content */}
                                    <div className="relative px-8 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all duration-300">
                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                                        <span className="relative flex items-center justify-center gap-3">
                                            {loading ? (
                                                <>
                                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In
                                                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </button>
                            </form>

                            {/* Sign Up Link */}
                            <div className="mt-8 text-center pt-6 border-t border-white/10">
                                <p className="text-sm text-slate-300 font-medium">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/auth/register"
                                        className="font-bold text-indigo-300 hover:text-white transition-colors relative group/link"
                                    >
                                        Sign up
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover/link:w-full transition-all duration-300"></span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Ultra Premium Visual */}
            <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-16 text-white">
                    {/* Main Content */}
                    <div className="max-w-2xl text-center space-y-10 animate-[fade-in_1s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-xl">
                            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                            <span className="text-sm font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                                Your Mental Wellness Partner
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-6xl font-bold leading-tight">
                            Transform Your
                            <br />
                            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-[gradient-shift_3s_ease-in-out_infinite]">
                                Mental Wellness
                            </span>
                        </h2>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-xl mx-auto">
                            Join thousands who have found peace, clarity, and support through our platform. Your journey to better mental health starts here.
                        </p>



                        {/* Premium Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8">
                            {[
                                { value: '10K+', label: 'Active Users', icon: Award },
                                { value: '500+', label: 'Counsellors', icon: Heart },
                                { value: '98%', label: 'Satisfaction', icon: Star }
                            ].map((stat, index) => (
                                <div key={index} className="flex justify-center">
                                    <div className="w-full p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20">
                                        <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
                                        <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</div>
                                        <div className="text-sm text-slate-400">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
