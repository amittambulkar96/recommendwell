import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read RecommendWell's terms of service to understand the rules and conditions for using our services.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "RecommendWell terms",
    "user agreement",
    "service terms",
  ],
  alternates: {
    canonical: "https://www.recommendwell.com/terms-of-service",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.recommendwell.com/terms-of-service",
    title: "Terms of Service | RecommendWell",
    description:
      "Read RecommendWell's terms of service to understand the rules and conditions for using our services.",
    siteName: "RecommendWell",
    images: [
      {
        url: "https://ofnlrak1w9.ufs.sh/f/ccMrlmkqB1bImUD9axIaJz9ZC2kResyUq0GvDET4VcuXSFti",
        width: 1200,
        height: 630,
        alt: "RecommendWell Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | RecommendWell",
    description:
      "Read RecommendWell's terms of service to understand the rules and conditions for using our services.",
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

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-24 pb-16">
      <Card className="border-border/70 bg-white/80">
        <CardContent className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            <strong>Last updated:</strong> December 2025
          </p>
        </header>

        <section className="mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Welcome to RecommendWell. These Terms of Service
            (&ldquo;Terms&rdquo;) govern your use of our website and services.
            By accessing or using RecommendWell, you agree to be bound by these
            Terms.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="acceptance"
          >
            1. Acceptance of Terms
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            By accessing, browsing, or using RecommendWell, you acknowledge that
            you have read, understood, and agree to be bound by these Terms and
            our Privacy Policy. If you do not agree to these Terms, please do
            not use our services.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting. Your continued use of our
            services after any such changes constitutes acceptance of the new
            Terms.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="accounts"
          >
            2. User Accounts and Registration
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            To access certain features of RecommendWell, you may need to create
            an account. You are responsible for maintaining the confidentiality
            of your account credentials and for all activities that occur under
            your account.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <li>
              You must provide accurate and complete information when creating
              an account
            </li>
            <li>You must be at least 18 years old to create an account</li>
            <li>
              You are responsible for keeping your login information secure
            </li>
            <li>
              You must notify us immediately of any unauthorized use of your
              account
            </li>
          </ul>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these Terms or engage in fraudulent, harmful, or illegal activities.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="payments"
          >
            3. Payments and Subscriptions
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            RecommendWell offers both free and premium services. Premium
            features require payment through our secure payment processing
            partners.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <li>
              All payments are processed securely through third-party payment
              processors
            </li>
            <li>
              Premium subscriptions are billed according to the plan you select
            </li>
            <li>
              Refunds may be provided at our discretion and according to our
              refund policy
            </li>
            <li>
              You are responsible for any applicable taxes on your purchases
            </li>
          </ul>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            We reserve the right to change our pricing at any time. Price
            changes will not affect existing subscriptions until renewal.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="intellectual-property"
          >
            4. Intellectual Property Rights
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            RecommendWell and its content, including but not limited to text,
            graphics, logos, and software, are protected by intellectual
            property laws.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <li>
              We retain ownership of all RecommendWell designs and proprietary
              content
            </li>
            <li>
              You receive a limited license to use our services for personal use
            </li>
            <li>
              You may not redistribute, sell, or commercialize our services
              without permission
            </li>
            <li>
              Any content you create using our platform remains your
              intellectual property
            </li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="disclaimers"
          >
            5. Service Disclaimers
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            RecommendWell provides tools for creating recommendations. We do not
            provide legal, employment, or career advice.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <li>
              Our services are for informational purposes and should be
              customized for your situation
            </li>
            <li>
              We do not guarantee specific employment outcomes from using our
              services
            </li>
            <li>
              You should consult with legal or HR professionals for specific
              employment matters
            </li>
            <li>
              Our services are provided &ldquo;as is&rdquo; without warranties
              of any kind
            </li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="limitation-liability"
          >
            6. Limitation of Liability
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            To the maximum extent permitted by law, RecommendWell and its
            affiliates, directors, employees, and agents shall not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Our total liability to you for any claims arising from your use of
            our services shall not exceed the amount you paid to RecommendWell
            in the twelve (12) months preceding the claim.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Some jurisdictions do not allow the limitation of liability, so
            these limitations may not apply to you.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="termination"
          >
            7. Termination
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Either party may terminate your account and access to our services
            at any time, with or without cause, and with or without notice.
          </p>
          <ul className="list-disc ml-4 sm:ml-6 text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            <li>
              You may terminate your account at any time through your account
              settings
            </li>
            <li>
              We may terminate accounts that violate these Terms or for any
              other reason
            </li>
            <li>
              Upon termination, your right to use our services will cease
              immediately
            </li>
            <li>
              Provisions that should survive termination will remain in effect
            </li>
          </ul>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="governing-law"
          >
            8. Governing Law and Dispute Resolution
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction where RecommendWell is incorporated,
            without regard to conflict of law principles.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Any disputes arising from these Terms or your use of our services
            shall be resolved through binding arbitration, except where
            prohibited by law.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            You and RecommendWell agree to submit to the personal jurisdiction
            of the courts located in the jurisdiction where RecommendWell is
            incorporated for any actions not subject to arbitration.
          </p>
        </section>

        <section className="mb-6 sm:mb-8">
          <h2
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4"
            id="contact"
          >
            9. Contact Information
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="bg-muted/30 p-4 sm:p-6 rounded-2xl">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong>Response Time:</strong> We typically respond to legal
              inquiries within 5 business days.
            </p>
          </div>
        </section>

        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <p className="text-sm text-gray-500 text-center">
            These Terms of Service are effective as of December 2025 and were
            last updated on December 2025.
          </p>
        </footer>
        </CardContent>
      </Card>

      <div className="mt-6 sm:mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </div>
  );
}
