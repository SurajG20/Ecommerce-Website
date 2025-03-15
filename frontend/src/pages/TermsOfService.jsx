import Layout from '@/components/Layout';

const TermsOfService = () => {
  return (
  <Layout>
     <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Terms of Service</h1>
      <div className="max-w-4xl mx-auto prose prose-slate">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to our e-commerce platform. By accessing and using this website,
            you agree to be bound by these Terms of Service. Please read them
            carefully before using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <p className="mb-4">
            To access certain features of our platform, you must create an account.
            You are responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You must be at least 18 years old to create an account</li>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must notify us of any unauthorized account access</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Purchase Terms</h2>
          <p className="mb-4">
            All purchases through our platform are subject to product availability.
            We reserve the right to limit the quantities of any products or
            services that we offer.
          </p>
          <p className="mb-4">
            Prices for products are subject to change without notice. We reserve
            the right to discontinue any product at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Shipping & Returns</h2>
          <p className="mb-4">
            We strive to ship all orders within 1-2 business days. Return requests
            must be made within 30 days of receiving your order. Items must be
            unused and in their original packaging.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            All content on this website, including text, graphics, logos, images,
            and software, is the property of our company and is protected by
            intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            We shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of our
            services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Changes to Terms of Service
          </h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify
            users of any material changes via email or through our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact
            us at:
          </p>
          <p className="mb-4">
            Email: legal@example.com
            <br />
            Phone: (555) 123-4567
            <br />
            Address: 123 Shopping Street, New York, NY 10001
          </p>
        </section>
      </div>
    </div>
  </Layout>
  );
};

export default TermsOfService;