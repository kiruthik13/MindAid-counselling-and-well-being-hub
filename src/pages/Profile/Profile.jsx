import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { User, Mail, Phone, MapPin, Save, Loader, Award } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        bio: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setFormData({
                            name: data.name || '',
                            email: data.email || '',
                            phone: data.phone || '',
                            address: data.address || '',
                            bio: data.bio || ''
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setFetching(false);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                bio: formData.bio
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-indigo-600" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-[fade-in_0.5s_ease-out]">
            <div>
                <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
                <p className="text-slate-600 mt-2 text-lg">Manage your personal information and preferences.</p>
            </div>

            <Card variant="glass" className="backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl ring-4 ring-white pulse-glow">
                                {formData.name?.[0]?.toUpperCase() || <User size={40} />}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                <Award size={16} className="text-white" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">{formData.name}</h2>
                            <p className="text-slate-600 mb-2">{formData.email}</p>
                            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full capitalize shadow-md">
                                {user?.role || 'Client'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            icon={User}
                            required
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            disabled
                            icon={Mail}
                            className="opacity-75"
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            icon={Phone}
                            placeholder="+91 98765 43210"
                        />
                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            icon={MapPin}
                            placeholder="City, Country"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Bio / Notes</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            className="block w-full px-4 py-3 rounded-xl border-2 border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                            placeholder="Tell us a bit about yourself..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-200">
                        <Button type="submit" isLoading={loading} variant="gradient" className="px-8">
                            <Save size={18} className="mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Profile;
