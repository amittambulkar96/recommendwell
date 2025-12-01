import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read RecommendWell's privacy policy to understand how we collect, use, and protect your personal information when using RecommendWell.",
  keywords: [
    "privacy policy",
    "data protection",
    "RecommendWell privacy",
    "personal information",
    "user data",
  ],
  alternates: {
    canonical: "https://www.recommendwell.com/privacy-policy",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.recommendwell.com/privacy-policy",
    title: "Privacy Policy | RecommendWell",
    description:
      "Read RecommendWell's privacy policy to understand how we collect, use, and protect your personal information when using our services.",
    siteName: "RecommendWell",
    images: [
      {
        url: "https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bImUD9axIaJz9ZC2kResyUq0GvDET4VcuXSFti",
        width: 1200,
        height: 630,
        alt: "RecommendWell Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | RecommendWell",
    description:
      "Read RecommendWell's privacy policy to understand how we collect, use, and protect your personal information when using our services.",
    creator: "@recommendwell",
    images: [
      "https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bImUD9axIaJz9ZC2kResyUq0GvDET4VcuXSFti",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl mt-16">
      <article className="prose prose-sm sm:prose-base lg:prose-lg mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            <strong>Last updated:</strong> December 2025
          </p>
        </header>

        <section className="mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            At RecommendWell, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you use our services.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="information-collection"
          >
            1. Information We Collect
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We collect information you provide directly to us and information we
            collect automatically when you use our services.
          </p>

          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
            Information You Provide
          </h3>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <li>Account information (name, email address, password)</li>
            <li>Profile information and preferences</li>
            <li>Content you create using our platform</li>
            <li>Communications with our support team</li>
            <li>
              Payment information (processed securely by third-party processors)
            </li>
          </ul>

          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
            Information We Collect Automatically
          </h3>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>Usage data and analytics</li>
            <li>Device information and browser type</li>
            <li>IP address and location data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="information-use"
          >
            2. How We Use Your Information
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We use the information we collect to provide, maintain, and improve
            our services.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>To provide and personalize our services</li>
            <li>To process payments and manage your account</li>
            <li>To communicate with you about our services</li>
            <li>To improve our website and user experience</li>
            <li>To comply with legal obligations</li>
            <li>To prevent fraud and ensure security</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="information-sharing"
          >
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties except as described in this policy.
          </p>

          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
            We May Share Information With:
          </h3>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>Service providers who assist us in operating our platform</li>
            <li>Payment processors for secure transaction handling</li>
            <li>Legal authorities when required by law</li>
            <li>Analytics providers to help us improve our services</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="data-security"
          >
            4. Data Security
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Secure data storage and backup procedures</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="user-rights"
          >
            5. Your Rights and Choices
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            You have certain rights regarding your personal information,
            depending on your location.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>Access and review your personal information</li>
            <li>Correct or update inaccurate information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Request data portability</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="cookies"
          >
            6. Cookies and Tracking Technologies
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We use cookies and similar technologies to enhance your experience
            and collect usage data.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand user behavior</li>
            <li>Preference cookies to remember your settings</li>
            <li>You can control cookie settings through your browser</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="data-retention"
          >
            7. Data Retention
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We retain your personal information only as long as necessary to
            provide our services and fulfill the purposes outlined in this
            policy.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li>Account data: Until you delete your account</li>
            <li>Usage data: Typically retained for 2 years</li>
            <li>Legal compliance: As required by applicable law</li>
            <li>Backup data: Deleted within 90 days of account deletion</li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="international-transfers"
          >
            8. International Data Transfers
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            for such transfers.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="children-privacy"
          >
            9. Children&rsquo;s Privacy
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Our services are not intended for children under 18. We do not
            knowingly collect personal information from children under 18.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="policy-changes"
          >
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on our
            website.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="contact"
          >
            11. Contact Us
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us:
          </p>
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong>Response Time:</strong> We typically respond to privacy
              inquiries within 5 business days.
            </p>
          </div>
        </section>

        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            This Privacy Policy is effective as of December 2025 and was last
            updated on December 2025.
          </p>
        </footer>
      </article>

      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}
