/**
 * Premium Exercises Page
 * Self-help exercises with modal details and progress tracking
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, CheckCircle, X, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '../layouts';
import { mockExercises } from '../utils/mockData';
import { Button } from '../components/common';

export const Exercises = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Self-Help Exercises
                    </h1>
                    <p className="text-gray-600 text-lg">Simple, effective tools to manage stress and improve wellbeing.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockExercises.map((exercise) => (
                        <motion.div
                            key={exercise.id}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-indigo-300 transition-all"
                            onClick={() => setSelectedExercise(exercise)}
                        >
                            <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                                <Play className="w-12 h-12 text-primary-600 opacity-80 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-md uppercase tracking-wide">
                                        {exercise.category}
                                    </span>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {exercise.estimatedMinutes} min
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{exercise.description}</p>
                                <button className="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Start Exercise <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Exercise Detail Modal */}
                <AnimatePresence>
                    {selectedExercise && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <div className="p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedExercise.title}</h2>
                                            <p className="text-gray-600">{selectedExercise.description}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedExercise(null)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="w-6 h-6 text-gray-500" />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-primary-50 rounded-2xl p-6">
                                            <h3 className="font-bold text-primary-900 mb-4">Instructions</h3>
                                            <ol className="space-y-4">
                                                {selectedExercise.steps.map((step, index) => (
                                                    <li key={index} className="flex gap-4">
                                                        <div className="w-8 h-8 rounded-full bg-white text-primary-600 font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                                                            {index + 1}
                                                        </div>
                                                        <p className="text-primary-800 pt-1">{step}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>

                                        <div className="flex justify-end gap-3">
                                            <Button variant="outline" onClick={() => setSelectedExercise(null)}>
                                                Close
                                            </Button>
                                            <Button className="shadow-lg">
                                                <CheckCircle className="w-4 h-4 mr-2" /> Mark as Completed
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
};
