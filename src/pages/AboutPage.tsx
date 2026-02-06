import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Shield, Target, Users, Award, CheckCircle, Mail, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Beginner FX Guide",
    "description": "Learn about Beginner FX Guide's mission to help US traders navigate the forex market.",
    "url": "https://beginnerfxguide.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Beginner FX Guide",
      "url": "https://beginnerfxguide.com",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "Lionel Sabunyan",
        "jobTitle": "Founder & Editor-in-Chief"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us - Meet the Team Behind Beginner FX Guide"
        description="Learn about Beginner FX Guide's mission to help US traders navigate the forex market. Meet our team of experienced traders and financial analysts."
        canonical="/about"
        jsonLd={jsonLd}
      />

      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb
            items={[
              { label: "About Us" }
            ]}
            className="mb-6"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              About <span className="text-gradient-gold">Beginner FX Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering US traders with honest, unbiased forex broker reviews and education since 2024.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                We believe every trader deserves access to accurate, unbiased information about forex brokers and trading strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border-border text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Honest Reviews</h3>
                  <p className="text-muted-foreground">
                    We test every broker ourselves and report both pros and cons transparently.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">US-Focused</h3>
                  <p className="text-muted-foreground">
                    Our content is specifically tailored for US traders navigating complex regulations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Education First</h3>
                  <p className="text-muted-foreground">
                    We prioritize trader education over sales, helping you make informed decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How We Review Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              How We Review Brokers
            </h2>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-6">
                  Our review process is rigorous and hands-on. We don't just read broker websites — we open real accounts, deposit real money, and test every aspect of the trading experience.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Account Opening Process</h4>
                      <p className="text-muted-foreground">We evaluate verification speed, document requirements, and user experience.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Trading Conditions</h4>
                      <p className="text-muted-foreground">Spreads, commissions, leverage, and execution speed are tested with real trades.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Deposit & Withdrawal</h4>
                      <p className="text-muted-foreground">We test all payment methods and measure actual processing times.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Customer Support</h4>
                      <p className="text-muted-foreground">Live chat, email, and phone support are tested for response time and quality.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Regulation & Safety</h4>
                      <p className="text-muted-foreground">We verify licenses, check regulatory history, and assess fund protection measures.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    to="/guides/how-we-review"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
                  >
                    Read our complete review methodology
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Meet Our Team
            </h2>

            {/* Founder */}
            <Card className="bg-gradient-card border-border mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0 border-4 border-primary/20">
                    <img
                      src="/images/team/lionel-sabunyan.jpg"
                      alt="Lionel Sabunyan - Founder of Beginner FX Guide"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-foreground">Lionel Sabunyan</h3>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Founder & Editor-in-Chief
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Lionel brings over 5 years of active forex trading experience and a solid foundation in finance and economics. His journey from a curious beginner to a seasoned trader inspired him to create Beginner FX Guide — a resource he wished existed when he started.
                    </p>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Having traded with dozens of brokers (both regulated US brokers and offshore platforms), Lionel understands the unique challenges American traders face. He personally tests every broker reviewed on this site, ensuring our recommendations are based on real trading experience, not marketing materials.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="bg-secondary border border-border px-3 py-1 rounded-full text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> 5+ Years Trading
                      </span>
                      <span className="bg-secondary border border-border px-3 py-1 rounded-full text-sm text-muted-foreground flex items-center gap-1">
                        <Award className="w-4 h-4" /> Finance Background
                      </span>
                      <span className="bg-secondary border border-border px-3 py-1 rounded-full text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-4 h-4" /> 50+ Brokers Tested
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Editorial Standards */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Editorial Independence
              </h4>
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                While we may earn commissions from some broker links, this never influences our reviews or ratings.
                We maintain strict editorial independence and will always prioritize our readers' interests.
                Brokers cannot pay for favorable reviews or higher rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">50+</div>
                <div className="text-muted-foreground">Brokers Reviewed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">100+</div>
                <div className="text-muted-foreground">Educational Articles</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-muted-foreground">Updated Content</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions, feedback, or want to suggest a broker for review? We'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
              <a
                href="mailto:info@beginnerfxguide.com"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                info@beginnerfxguide.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
