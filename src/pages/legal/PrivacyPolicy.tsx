import LegalLayout from "./LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        This website (“we”, “us”, “our”) provides educational content and broker
        comparisons for US-based readers. This Privacy Policy explains what data
        we collect and how we use it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Analytics data</strong>: basic usage information such as pages
          visited, time on site, and device/browser data (typically collected by
          analytics tools).
        </li>
        <li>
          <strong>Contact data</strong>: if you email us, we receive your email
          address and the content of your message.
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To improve site performance, usability, and content quality.</li>
        <li>To respond to inquiries and provide support.</li>
        <li>To measure affiliate link performance (see Affiliate Disclosure).</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We and our partners may use cookies or similar technologies to remember
        preferences and measure traffic. You can control cookies via your
        browser settings.
      </p>

      <h2>Third‑party links</h2>
      <p>
        Our site contains links to third‑party broker websites. We are not
        responsible for their privacy practices. Please review their privacy
        policies before providing personal information.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this policy, contact us at{" "}
        <a href="mailto:support@usforexguide.com">support@usforexguide.com</a>.
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;

