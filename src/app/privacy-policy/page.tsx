"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
      <Card>
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="text-3xl font-bold">
            Serenity Services Privacy Policy
          </CardTitle>
          <CardDescription>Effective Date: May 1, 2025</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground dark:text-gray-200">
              This Privacy Policy (&quot;Policy&quot;) explains how Vimo
              Serenity Limited (&quot;Serenity&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and
              protects your personal information when you access or use our
              website (https://www.serenity.ng), mobile applications, or other
              related services (collectively, &quot;Services&quot;). By using
              our Services, you consent to the collection and processing of your
              personal data in accordance with this Policy.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              1. General Information
            </h2>
            <p className="dark:text-gray-200">
              Serenity is committed to safeguarding your privacy while providing
              high-quality home care services, including cleaning, laundry,
              ironing, and home repairs/maintenance. This Policy applies to all
              users (&quot;you&quot; or &quot;User&quot;) who interact with our
              Services. We encourage you to review this Policy periodically to
              understand how your information is handled.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-semibold mt-4 mb-2 dark:text-gray-300">
              2.1 Personal Data You Provide
            </h3>
            <p className="dark:text-gray-200">
              When you interact with our Services, we may collect personal
              information that you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">Contact Information:</span> Your
                name, email address, phone number, and postal address.
              </li>
              <li>
                <span className="font-medium">
                  Account/Registration Details:
                </span>{" "}
                Username, password, and other data provided during account
                creation.
              </li>
              <li>
                <span className="font-medium">Payment Information:</span>{" "}
                Billing address, credit/debit card details, or bank account
                information (collected via secure channels).
              </li>
              <li>
                <span className="font-medium">
                  Service-Related Information:
                </span>{" "}
                Specific details needed to deliver our home care services (e.g.,
                location details, service preferences).
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2 dark:text-gray-300">
              2.2 Automatically Collected Data
            </h3>
            <p className="dark:text-gray-200">
              We also automatically collect information through your use of our
              Services, such as:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">Online Identifiers:</span> IP
                address, device identifiers, browser type, and operating system.
              </li>
              <li>
                <span className="font-medium">Usage Data:</span> Details of your
                interactions with our website and mobile app (pages visited,
                time spent, clicks, etc.).
              </li>
              <li>
                <span className="font-medium">
                  Cookies and Similar Technologies:
                </span>{" "}
                We use cookies, pixel tags, and other tracking technologies to
                enhance your experience, analyze trends, and administer our
                Services. For further details on cookies and how to manage them,
                please refer to our Cookie Policy.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2 dark:text-gray-300">
              2.3 Location Information
            </h3>
            <p className="dark:text-gray-200">
              Where applicable, with your consent, we may collect precise or
              general location data from your device to provide location-based
              services.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              3. How We Use Your Information
            </h2>
            <p className="dark:text-gray-200">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">
                  Providing and Enhancing Services:
                </span>{" "}
                To process your bookings, manage subscriptions, and ensure
                efficient delivery of our home care services.
              </li>
              <li>
                <span className="font-medium">Communication:</span> To send you
                service-related notifications, account updates, and marketing
                communications (only with your explicit consent for marketing).
              </li>
              <li>
                <span className="font-medium">Personalization:</span> To
                customize your experience on our website and mobile application.
              </li>
              <li>
                <span className="font-medium">Analytics and Research:</span> To
                analyze usage patterns and improve our Services.
              </li>
              <li>
                <span className="font-medium">
                  Security and Fraud Prevention:
                </span>{" "}
                To protect our systems, investigate suspicious activities, and
                comply with legal obligations.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="dark:text-gray-200">
              We use cookies and other similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>Facilitate navigation and enhance user experience.</li>
              <li>
                Collect aggregated data on user behavior for analytics and
                performance improvement.
              </li>
              <li>
                Serve personalized content and advertisements (only after
                obtaining your explicit consent).
              </li>
            </ul>
            <p className="mt-2 dark:text-gray-200">
              You may manage or disable cookies through your browser settings;
              however, please note that doing so may affect the functionality of
              our Services.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              5. Sharing and Disclosure of Your Personal Data
            </h2>
            <p className="dark:text-gray-200">
              Serenity may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">Service Providers:</span> Trusted
                third-party vendors who assist in delivering our Services (e.g.,
                payment processors, analytics providers), under strict
                contractual obligations.
              </li>
              <li>
                <span className="font-medium">
                  Legal and Regulatory Authorities:
                </span>{" "}
                In compliance with applicable laws, court orders, or to protect
                the rights, property, or safety of our Users or others.
              </li>
              <li>
                <span className="font-medium">Corporate Transactions:</span> In
                the event of a merger, acquisition, or asset sale, your personal
                data may be transferred as part of the transaction.
              </li>
            </ul>
            <p className="mt-2 dark:text-gray-200">
              We do not sell, rent, or trade your personal data to third parties
              for their marketing purposes.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              6. Data Storage and Security
            </h2>
            <p className="dark:text-gray-200">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, alteration, disclosure, or
              destruction. Despite our best efforts, no method of transmission
              over the Internet or electronic storage is 100% secure; therefore,
              we cannot guarantee absolute security.
            </p>
            <p className="mt-2 dark:text-gray-200">
              Your data is stored for as long as necessary to fulfill the
              purposes outlined in this Policy or as required by applicable law.
              In the event of a data breach, we will notify affected Users in
              accordance with applicable regulations.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              7. Your Rights and Choices
            </h2>
            <p className="dark:text-gray-200">
              Under Nigerian data protection laws, you have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">Access and Correction:</span> You
                may request a copy of your personal data or ask us to correct
                inaccuracies.
              </li>
              <li>
                <span className="font-medium">Deletion:</span> You may request
                the deletion of your personal data, subject to legal and
                contractual restrictions.
              </li>
              <li>
                <span className="font-medium">Objection and Restriction:</span>{" "}
                You have the right to object to or restrict our processing of
                your data.
              </li>
              <li>
                <span className="font-medium">Data Portability:</span> You may
                request that your data be provided in a structured, commonly
                used format.
              </li>
              <li>
                <span className="font-medium">Withdrawal of Consent:</span> You
                may withdraw your consent for data processing at any time (this
                will not affect the lawfulness of processing prior to
                withdrawal).
              </li>
            </ul>
            <p className="mt-2 dark:text-gray-200">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:info@serenity.ng"
                className="text-primary hover:underline"
              >
                info@serenity.ng
              </a>
              .
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              8. Changes to This Privacy Policy
            </h2>
            <p className="dark:text-gray-200">
              We may update this Policy from time to time. Any changes will be
              posted on our website with an updated effective date. Your
              continued use of our Services after such changes signifies your
              acceptance of the revised Policy.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              9. Contact Information
            </h2>
            <p className="dark:text-gray-200">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-2 space-y-1 dark:text-gray-200">
              <p className="dark:text-gray-200">
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:support@serenity.ng"
                  className="text-primary hover:underline"
                >
                  support@serenity.ng
                </a>
              </p>
              <p>
                <span className="font-medium">Mailing Address:</span> Suite 108
                Eylon plaza 1st Avenue gawrinpa, Abuja.
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href="tel:+2348135518126"
                  className="text-primary hover:underline"
                >
                  0813 551 8126
                </a>
              </p>
            </div>

            <p className="mt-6 italic dark:text-gray-200">
              By accessing or using our Services, you acknowledge that you have
              read and understood this Privacy Policy and agree to the
              collection and use of your information as described herein.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
