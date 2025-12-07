/**
 * Premium Profile Page
 * User settings, profile management, and preferences
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, LogOut, Camera, Save } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { Button, Input, Card } from '../components/common';
import { useAuth } from '../hooks';

export const Profile = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSave = (e) => {
        e.preventDefault();
        // Mock save logic
        alert('Profile updated successfully!');
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-10">
                    Account Settings
                </h1>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1 space-y-2">
                        {[
                            { id: 'profile', label: 'Profile', icon: User },
                            { id: 'security', label: 'Security', icon: Lock },
                            { id: 'notifications', label: 'Notifications', icon: Bell },
                            { id: 'privacy', label: 'Privacy', icon: Shield },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg font-semibold'
                                        : 'text-gray-600 hover:bg-white/80 hover:text-gray-900 hover:shadow-md'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}

                        <div className="pt-4 mt-4 border-t border-gray-200">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card>
                                {activeTab === 'profile' && (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="relative group cursor-pointer">
                                                <img
                                                    src={user?.avatar || 'https://i.pravatar.cc/150'}
                                                    alt="Profile"
                                                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50"
                                                />
                                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Camera className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">Profile Photo</h3>
                                                <p className="text-sm text-gray-500">
                                                    Click to upload a new photo. JPG or PNG, max 2MB.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Input
                                                label="Full Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                icon={User}
                                            />
                                            <Input
                                                label="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                icon={Mail}
                                                disabled
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                                            <Button type="submit">
                                                <Save className="w-4 h-4 mr-2" /> Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {activeTab === 'security' && (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                                        <Input
                                            label="Current Password"
                                            type="password"
                                            value={formData.currentPassword}
                                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                        />
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Input
                                                label="New Password"
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            />
                                            <Input
                                                label="Confirm New Password"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                                            <Button type="submit">Update Password</Button>
                                        </div>
                                    </form>
                                )}

                                {(activeTab === 'notifications' || activeTab === 'privacy') && (
                                    <div className="text-center py-12 text-gray-500">
                                        <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>Settings for {activeTab} coming soon!</p>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
