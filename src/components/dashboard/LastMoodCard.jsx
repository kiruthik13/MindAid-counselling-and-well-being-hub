import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
} from "firebase/firestore";
import { Activity } from "lucide-react";

export const LastMoodCard = () => {
    const { user } = useAuth();
    const [mood, setMood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid),
            where("moodLabel", "!=", null),
            orderBy("moodUpdatedAt", "desc"),
            limit(1)
        );

        // Real-time listener - updates automatically when counsellor records mood
        const unsubscribe = onSnapshot(q, (snap) => {
            if (!snap.empty) {
                const data = snap.docs[0].data();
                setMood({
                    label: data.moodLabel,
                    note: data.moodNote || "",
                });
            } else {
                setMood(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error loading last mood", error);
            setMood(null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const label = mood?.label || "Not recorded yet";
    const note = mood?.note;

    return (
        <div className="border-l-4 border-l-purple-500 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                    <Activity size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Last Mood Check-in</p>
                    <h3 className="text-2xl font-bold text-slate-900">
                        {loading ? "Loading..." : label}
                    </h3>
                    {!loading && note && (
                        <p className="mt-1 text-xs text-slate-500">
                            Counsellor note: {note}
                        </p>
                    )}
                    {!loading && !mood && (
                        <p className="mt-1 text-xs text-slate-400">
                            Your counsellor hasn't recorded a mood yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
