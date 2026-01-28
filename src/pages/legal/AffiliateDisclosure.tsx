import LegalLayout from "./LegalLayout";

const AffiliateDisclosure = () => {
  return (
    <LegalLayout title="Affiliate Disclosure">
      <p>
        This site may contain affiliate links. If you click an affiliate link and
        open an account or make a purchase, we may receive a commission at no
        additional cost to you.
      </p>

      <h2>How it affects rankings</h2>
      <p>
        We aim to provide fair, research‑based opinions. Compensation may exist,
        but it does not guarantee a positive review. However, affiliate programs
        can influence which brokers we feature more prominently.
      </p>

      <h2>Example affiliate partners</h2>
      <ul>
        <li>FXGlory</li>
        <li>N1CM</li>
      </ul>

      <p>
        If you have questions, email{" "}
        <a href="mailto:support@usforexguide.com">support@usforexguide.com</a>.
      </p>
    </LegalLayout>
  );
};

export default AffiliateDisclosure;

