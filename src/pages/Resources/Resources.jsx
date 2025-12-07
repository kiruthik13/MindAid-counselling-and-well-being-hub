import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { BookOpen, Video, FileText, Link as LinkIcon, ExternalLink } from 'lucide-react';

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
            case 'video': return 'bg-red-100 text-red-600';
            case 'pdf': return 'bg-orange-100 text-orange-600';
            case 'link': return 'bg-blue-100 text-blue-600';
            default: return 'bg-indigo-100 text-indigo-600';
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Wellbeing Resources</h1>
                <p className="text-slate-500 mt-1">Curated content to support your mental health journey.</p>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            ) : resources.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                    <p className="text-slate-500">No resources available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map(resource => (
                        <Card key={resource.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${getColor(resource.type)}`}>
                                    {getIcon(resource.type)}
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wide">
                                    {resource.category}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{resource.title}</h3>
                            <p className="text-slate-600 text-sm mb-6 flex-grow">{resource.description}</p>

                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto"
                            >
                                <Button variant="secondary" className="w-full justify-between group">
                                    <span>Open Resource</span>
                                    <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
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
