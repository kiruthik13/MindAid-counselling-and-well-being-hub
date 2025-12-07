/**
 * Premium Terms of Service Page
 * Legal document styling
 */

import { MainLayout } from '../layouts';

export const TermsOfService = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Terms of Service
                </h1>
                <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="lead">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <p>
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before
                        using the MindAid website (the "Service") operated by MindAid ("us", "we", or "our").
                    </p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>
                        Your access to and use of the Service is conditioned on your acceptance of and
                        compliance with these Terms. These Terms apply to all visitors, users, and others who
                        access or use the Service.
                    </p>

                    <h3>2. Accounts</h3>
                    <p>
                        When you create an account with us, you must provide us information that is accurate,
                        complete, and current at all times. Failure to do so constitutes a breach of the
                        Terms, which may result in immediate termination of your account on our Service.
                    </p>

                    <h3>3. Intellectual Property</h3>
                    <p>
                        The Service and its original content, features, and functionality are and will remain
                        the exclusive property of MindAid and its licensors.
                    </p>

                    <h3>4. Termination</h3>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice
                        or liability, for any reason whatsoever, including without limitation if you breach
                        the Terms.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};
