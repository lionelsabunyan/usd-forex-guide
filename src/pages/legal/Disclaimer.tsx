import LegalLayout from "./LegalLayout";

const Disclaimer = () => {
  return (
    <LegalLayout title="Disclaimer">
      <p>
        Trading foreign exchange (forex) and CFDs involves significant risk and
        may not be suitable for all investors. You could lose some or all of your
        investment.
      </p>

      <h2>Not investment advice</h2>
      <p>
        The content on this site is provided for informational and educational
        purposes only and should not be considered investment advice.
      </p>

      <h2>Regulatory note for US users</h2>
      <p>
        US residents are subject to CFTC/NFA rules and broker eligibility may
        vary. Always verify a broker’s legal status and suitability for your
        situation.
      </p>

      <h2>Use at your own risk</h2>
      <p>
        You are solely responsible for your trading decisions and outcomes. Past
        performance is not indicative of future results.
      </p>
    </LegalLayout>
  );
};

export default Disclaimer;

