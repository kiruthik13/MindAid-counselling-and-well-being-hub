/**
 * Premium Privacy Policy Page
 * Legal document styling
 */

import { MainLayout } from '../layouts';

export const PrivacyPolicy = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Privacy Policy
                </h1>
                <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="lead">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <p>
                        At MindAid, we take your privacy seriously. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you visit our website or use our
                        services.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We collect information that you voluntarily provide to us when you register on the
                        website, express an interest in obtaining information about us or our products and
                        services, when you participate in activities on the website, or otherwise when you
                        contact us.
                    </p>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use personal information collected via our website for a variety of business
                        purposes described below. We process your personal information for these purposes in
                        reliance on our legitimate business interests, in order to enter into or perform a
                        contract with you, with your consent, and/or for compliance with our legal
                        obligations.
                    </p>

                    <h3>3. Disclosure of Your Information</h3>
                    <p>
                        We may share information we have collected about you in certain situations. Your
                        information may be disclosed as follows:
                    </p>
                    <ul>
                        <li>By Law or to Protect Rights</li>
                        <li>Third-Party Service Providers</li>
                        <li>Business Transfers</li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    );
};
