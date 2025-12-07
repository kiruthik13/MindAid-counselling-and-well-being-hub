/**
 * Premium Help & Support Page
 * FAQ accordion and contact form
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, MessageCircle, Phone } from 'lucide-react';
import { MainLayout } from '../layouts';
import { Button, Input, Card } from '../components/common';

export const Help = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "How do I book a session?",
            a: "You can book a session by navigating to the 'Counsellors' page, selecting a counsellor, and choosing an available time slot from their profile."
        },
        {
            q: "Is my data confidential?",
            a: "Yes, absolutely. We use bank-level encryption to protect your personal information and chat history. Your privacy is our top priority."
        },
        {
            q: "Can I change my counsellor?",
            a: "Yes, you can switch counsellors at any time. We want to ensure you find the best match for your needs."
        },
        {
            q: "What if I need to cancel?",
            a: "You can cancel or reschedule a session up to 24 hours in advance without any penalty from your Bookings page."
        }
    ];

    return (
        <MainLayout>
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-purple-900/80 to-pink-900/80"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                        How can we help?
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                        Find answers to common questions or get in touch with our support team.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* FAQs */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                                    >
                                        {faq.q}
                                        <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
                            <form className="space-y-4">
                                <Input label="Name" placeholder="Your name" />
                                <Input label="Email" type="email" placeholder="your@email.com" />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows="4"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <Button className="w-full">Send Message</Button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-500">Email</p>
                                </div>
                                <div>
                                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-500">Live Chat</p>
                                </div>
                                <div>
                                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
