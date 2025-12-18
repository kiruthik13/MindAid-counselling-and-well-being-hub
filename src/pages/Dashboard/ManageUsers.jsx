import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import { User, Mail, Shield } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            <div>
                <h1 className="text-4xl font-bold gradient-text">Manage Users</h1>
                <p className="text-slate-600 mt-2 text-lg">View all registered users on the platform.</p>
            </div>

            <Card className="shadow-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider">UID</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                                        <p>Loading users...</p>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        <User className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                                        <p>No users found.</p>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-200 group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-11 w-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                                                    {user.name?.[0]?.toUpperCase() || <User size={20} />}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-slate-900">{user.name || 'Unknown'}</div>
                                                    <div className="text-sm text-slate-500 flex items-center gap-1">
                                                        <Mail size={12} /> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${user.role === 'admin'
                                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                                                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                                }`}>
                                                {user.role === 'admin' && <Shield size={12} className="mr-1 self-center" />}
                                                {user.role || 'client'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-mono">
                                            {user.uid}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ManageUsers;
