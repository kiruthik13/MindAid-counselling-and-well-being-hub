import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ArrowLeft, Mail, Send, CheckCircle, MailOpen } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
        } catch (err) {
            setError('Failed to reset password. ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite_2s]"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10 animate-[fade-in_0.6s_ease-out]">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 shadow-2xl shadow-orange-500/50 mb-6 relative group hover:scale-110 transition-transform duration-300">
                        {message ? (
                            <CheckCircle className="w-10 h-10 text-white animate-[scale-in_0.5s_ease-out]" />
                        ) : (
                            <MailOpen className="w-10 h-10 text-white animate-pulse" />
                        )}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                    </div>
                    <h2 className="text-4xl font-bold gradient-text-warm mb-3">
                        {message ? 'Check Your Email' : 'Reset Password'}
                    </h2>
                    <p className="text-slate-600 text-lg">
                        {message ? 'We\'ve sent you reset instructions' : 'Enter your email to receive reset instructions'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
                    {error && (
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 p-4 rounded-xl animate-[shake_0.5s_ease-in-out]">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    {message ? (
                        <div className="text-center space-y-6 py-4 animate-[scale-in_0.5s_ease-out]">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-green-900 mb-1">Email Sent Successfully!</p>
                                        <p className="text-sm text-green-700">{message}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                                <p className="mb-2">📧 Check your email inbox</p>
                                <p className="mb-2">🔗 Click the reset link</p>
                                <p>🔐 Create a new password</p>
                            </div>

                            <Link
                                to="/auth/login"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 hover:scale-105 transition-all duration-300"
                            >
                                <ArrowLeft size={18} />
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group relative px-6 py-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Reset Link
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            {/* Back to Login */}
                            <div className="text-center pt-4 border-t border-slate-200">
                                <Link
                                    to="/auth/login"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
