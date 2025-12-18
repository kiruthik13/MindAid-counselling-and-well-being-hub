import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { BookOpen, Video, FileText, Link as LinkIcon, ExternalLink, Sparkles } from 'lucide-react';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const q = query(collection(db, 'resources'), where('isVisible', '==', true));
            const querySnapshot = await getDocs(q);
            const resourcesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResources(resourcesData);
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'video': return <Video size={24} />;
            case 'pdf': return <FileText size={24} />;
            case 'link': return <LinkIcon size={24} />;
            default: return <BookOpen size={24} />;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'video': return 'from-red-500 to-pink-600';
            case 'pdf': return 'from-orange-500 to-amber-600';
            case 'link': return 'from-blue-500 to-cyan-600';
            default: return 'from-indigo-500 to-purple-600';
        }
    };

    return (
        <div className="space-y-8 animate-[fade-in_0.5s_ease-out]">
            <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <div>
                    <h1 className="text-4xl font-bold gradient-text-warm">Wellbeing Resources</h1>
                    <p className="text-slate-600 mt-2 text-lg">Curated content to support your mental health journey.</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            ) : resources.length === 0 ? (
                <Card variant="glass" className="text-center py-12">
                    <p className="text-slate-500">No resources available at the moment.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                    {resources.map(resource => (
                        <Card key={resource.id} variant="gradient-border" className="flex flex-col h-full group cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${getColor(resource.type)} text-white shadow-lg transform transition-all group-hover:scale-110 group-hover:rotate-6`}>
                                    {getIcon(resource.type)}
                                </div>
                                <span className="text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full uppercase tracking-wider shadow-sm">
                                    {resource.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{resource.title}</h3>
                            <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{resource.description}</p>

                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto"
                            >
                                <Button variant="gradient" className="w-full justify-between group/btn">
                                    <span>Open Resource</span>
                                    <ExternalLink size={16} className="text-white/80 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                                </Button>
                            </a>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resources;
