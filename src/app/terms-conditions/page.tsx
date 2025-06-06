"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-4xl">
      <Card>
        <CardHeader className="text-center border-b pb-6">
          <CardTitle className="text-3xl font-bold">
            Serenity Services Terms and Conditions
          </CardTitle>
          <CardDescription>Effective Date: May 1, 2025</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground dark:text-gray-200">
              These Terms and Conditions (&quot;Terms&quot;) govern your access
              to and use of the services (&quot;Services&quot;) provided by Vimo
              Serenity Limited (&quot;Serenity&quot;, &quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;). By booking, subscribing to, or
              otherwise using our Services, you agree to be bound by these
              Terms. If you do not agree with any provision of these Terms,
              please do not use our Services.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              1. Definitions
            </h2>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">&quot;Services&quot;</span> means
                all home care services provided by Serenity, including but not
                limited to cleaning, laundry, ironing, and home
                repairs/maintenance.
              </li>
              <li>
                <span className="font-medium">&quot;Subscription&quot;</span>{" "}
                refers to the recurring service model offered through our
                website and mobile application.
              </li>
              <li>
                <span className="font-medium">&quot;Client&quot;</span> means
                any individual or entity who registers for and/or uses our
                Services.
              </li>
              <li>
                <span className="font-medium">&quot;Account&quot;</span> means
                the user profile created by a Client to access and manage the
                Services.
              </li>
              <li>
                <span className="font-medium">&quot;NDPR&quot;</span> refers to
                the Nigerian Data Protection Regulation and any applicable data
                privacy laws.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              2. Services Offered
            </h2>
            <p className="dark:text-gray-200">
              Serenity provides a range of professional home care services,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">Cleaning:</span> Comprehensive
                residential cleaning services covering dusting, scrubbing,
                vacuuming, and more.
              </li>
              <li>
                <span className="font-medium">Laundry and Ironing:</span>{" "}
                Efficient laundry services, including washing, drying, and
                ironing.
              </li>
              <li>
                <span className="font-medium">Home Repairs & Maintenance:</span>{" "}
                Prompt and certified repair services for common household issues
                (e.g., plumbing, electrical faults).
              </li>
            </ul>
            <p className="dark:text-gray-200">
              Services are available primarily in Abuja with planned expansion
              as communicated via our website.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              3. Booking, Subscription, and Payment
            </h2>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              3.1 Booking and Subscription
            </h3>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                Clients may book Services or subscribe via our website
                (https://www.serenity.ng) or mobile application.
              </li>
              <li>
                Bookings are subject to availability and must be made at least
                24 hours in advance.
              </li>
              <li>
                Subscription plans are available and allow for regular service
                scheduling. Clients may choose to subscribe on a monthly or
                annual basis.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              3.2 Pricing and Payment
            </h3>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                All prices are displayed on our digital platforms. Payment is
                due at the time of booking or as scheduled within your
                subscription plan.
              </li>
              <li>
                We accept payments via bank transfer, credit/debit cards, and
                approved mobile payment platforms.
              </li>
              <li>
                <span className="font-medium">Refund Policy:</span> Refunds will
                be considered for clients who have maintained a subscription for
                a minimum of three (3) months. Refund eligibility and amounts
                will be determined on a case-by-case basis in accordance with
                our refund policy.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              4. Client Responsibilities
            </h2>
            <p className="dark:text-gray-200">Clients agree to:</p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                Ensure that all areas designated for Service are accessible to
                our professionals.
              </li>
              <li>
                Secure valuables and personal items prior to service
                commencement.
              </li>
              <li>
                Inspect serviced areas upon completion and report any issues or
                damages within 24 hours. Claims reported after 48 hours may not
                be eligible for resolution.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              5. Liability and Insurance
            </h2>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                Serenity holds comprehensive insurance coverage for damages
                caused directly by our staff during service delivery. However,
                Serenity is not liable for pre-existing conditions or damages
                not directly attributable to our actions.
              </li>
              <li>
                <span className="font-medium">Limitation of Liability:</span> To
                the maximum extent permitted by Nigerian law, Serenity&apos;s
                total liability under these Terms shall be limited to the total
                amount paid by the Client for the Services rendered in the
                preceding six months.
              </li>
              <li>
                Serenity shall not be liable for any indirect, incidental,
                consequential, or punitive damages.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              6. Data Privacy and Intellectual Property
            </h2>
            <h3 className="text-lg font-semibold mt-4 mb-2 dark:text-gray-300">
              6.1 Data Privacy
            </h3>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                We collect and process personal data in accordance with the NDPR
                and other applicable Nigerian data protection laws. By using our
                Services, you consent to such collection and use.
              </li>
              <li>
                For further details on how we protect your personal data, please
                review our{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2 dark:text-gray-300">
              6.2 Intellectual Property
            </h3>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                All content, logos, designs, trademarks, and other intellectual
                property on our website, mobile app, and promotional materials
                are the exclusive property of Serenity or its licensors.
              </li>
              <li>
                Clients are prohibited from reproducing, distributing, or
                otherwise exploiting any of our intellectual property without
                prior written consent.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              7. Indemnification
            </h2>
            <p className="dark:text-gray-200">
              Clients agree to indemnify and hold harmless Serenity, its
              directors, employees, and agents from any claims, damages, or
              losses (including reasonable legal fees) arising out of:
            </p>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>Your breach of these Terms,</li>
              <li>Your misuse of our Services,</li>
              <li>
                Any violation of applicable laws or the rights of third parties.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              8. Force Majeure
            </h2>
            <p className="dark:text-gray-200">
              Serenity shall not be held liable for any failure or delay in
              performing its obligations under these Terms due to circumstances
              beyond its control, including but not limited to natural
              disasters, strikes, civil unrest, or technical failures
              (&quot;Force Majeure Events&quot;).
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              9. Dispute Resolution and Arbitration
            </h2>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                In the event of any dispute arising from or relating to these
                Terms or the Services provided, both parties agree to resolve
                the dispute through mandatory binding arbitration.
              </li>
              <li>
                Any disputes shall be conducted on an individual basis; class
                action claims or collective disputes are expressly waived.
              </li>
              <li>
                The arbitration process shall be governed by the rules
                applicable in Nigeria, and should a hearing be required, it
                shall be held in Abuja, Nigeria.
              </li>
              <li>
                This arbitration agreement does not affect your right to seek
                injunctive or equitable relief where necessary.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              10. Governing Law and Jurisdiction
            </h2>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                These Terms shall be governed by and construed in accordance
                with the laws of the Federal Republic of Nigeria, including the
                Companies and Allied Matters Act 2020.
              </li>
              <li>
                Any legal action or proceeding arising out of or relating to
                these Terms shall be subject to the exclusive jurisdiction of
                the courts located in Abuja, Nigeria.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              11. Amendments and Modifications
            </h2>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                Serenity reserves the right to modify or update these Terms at
                any time. Clients will be notified of any material changes via
                email or through our website.
              </li>
              <li>
                Continued use of our Services following such changes constitutes
                acceptance of the revised Terms.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3 dark:text-gray-300">
              12. Miscellaneous
            </h2>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-200">
              <li>
                <span className="font-medium">Severability:</span> If any
                provision of these Terms is found to be invalid or
                unenforceable, the remaining provisions will continue in full
                force and effect.
              </li>
              <li>
                <span className="font-medium">Entire Agreement:</span> These
                Terms constitute the entire agreement between the Client and
                Serenity regarding the use of our Services and supersede all
                prior agreements, understandings, or representations.
              </li>
              <li>
                <span className="font-medium">No Waiver:</span> Failure by
                Serenity to enforce any right or provision of these Terms shall
                not constitute a waiver of such right or provision.
              </li>
            </ul>

            <p className="mt-6 italic dark:text-gray-200">
              By accessing or using our Services, you acknowledge that you have
              read, understood, and agree to be bound by these Terms.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
