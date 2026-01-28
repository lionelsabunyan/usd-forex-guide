import LegalLayout from "./LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        By accessing this website, you agree to these Terms of Service. If you do
        not agree, please do not use the site.
      </p>

      <h2>Educational content only</h2>
      <p>
        The information on this site is for general educational purposes and does
        not constitute financial, investment, legal, or tax advice.
      </p>

      <h2>No guarantees</h2>
      <p>
        We make reasonable efforts to keep information accurate and up to date,
        but we do not guarantee completeness, reliability, or suitability.
      </p>

      <h2>Third‑party services</h2>
      <p>
        We may link to third‑party broker websites. We do not control those sites
        and are not responsible for their content, availability, or practices.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we will not be liable for any
        losses or damages arising from your use of the site or reliance on its
        content.
      </p>

      <h2>Contact</h2>
      <p>
        For questions, contact{" "}
        <a href="mailto:support@usforexguide.com">support@usforexguide.com</a>.
      </p>
    </LegalLayout>
  );
};

export default TermsOfService;

