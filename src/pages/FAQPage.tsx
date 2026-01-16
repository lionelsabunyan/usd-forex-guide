import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Shield, Users, CreditCard, BarChart3, Banknote } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: HelpCircle,
    faqs: [
      {
        question: "What is Forex trading?",
        answer: "Forex (Foreign Exchange) trading is the buying and selling of currencies on the global market. It's the largest financial market in the world with a daily trading volume exceeding $6 trillion. Traders profit from the fluctuations in exchange rates between currency pairs."
      },
      {
        question: "How does Forex trading work?",
        answer: "Forex trading involves buying one currency while simultaneously selling another. Currencies are traded in pairs (e.g., EUR/USD). When you believe the base currency will strengthen against the quote currency, you buy. When you think it will weaken, you sell."
      },
      {
        question: "What are currency pairs?",
        answer: "Currency pairs consist of two currencies: the base currency (first) and the quote currency (second). Major pairs include EUR/USD, GBP/USD, USD/JPY, and USD/CHF. The exchange rate shows how much of the quote currency is needed to buy one unit of the base currency."
      },
      {
        question: "What is a pip in Forex?",
        answer: "A pip (Percentage in Point) is the smallest price movement in a currency pair. For most pairs, it's the fourth decimal place (0.0001). For pairs involving the Japanese Yen, it's the second decimal place (0.01)."
      }
    ]
  },
  {
    id: "us-regulations",
    title: "US Regulations",
    icon: Shield,
    faqs: [
      {
        question: "Is Forex trading legal in the US?",
        answer: "Yes, Forex trading is completely legal in the United States. However, it's heavily regulated by the Commodity Futures Trading Commission (CFTC) and the National Futures Association (NFA). Only brokers registered with these bodies can legally offer Forex trading services to US residents."
      },
      {
        question: "What is CFTC/NFA regulation?",
        answer: "The CFTC (Commodity Futures Trading Commission) is a US government agency that regulates derivatives markets. The NFA (National Futures Association) is a self-regulatory organization. Together, they ensure fair practices, financial transparency, and consumer protection in Forex trading."
      },
      {
        question: "Can US residents use offshore brokers?",
        answer: "While technically possible, using offshore brokers is not recommended for US residents. Offshore brokers operate outside US regulatory oversight, meaning you have little legal recourse if problems arise. Additionally, they may not comply with US tax reporting requirements."
      },
      {
        question: "What is the maximum leverage for US traders?",
        answer: "US regulations limit leverage to 50:1 for major currency pairs and 20:1 for minor pairs. This is lower than many offshore brokers offer, but it's designed to protect retail traders from excessive risk."
      }
    ]
  },
  {
    id: "broker-selection",
    title: "Broker Selection",
    icon: Users,
    faqs: [
      {
        question: "How do I choose a reliable Forex broker?",
        answer: "Look for: 1) Proper regulation (CFTC/NFA for US), 2) Competitive spreads and fees, 3) User-friendly trading platform, 4) Quality customer support, 5) Educational resources, 6) Positive reviews and reputation. Our broker comparison tool can help you evaluate these factors."
      },
      {
        question: "What's the difference between ECN and Market Maker brokers?",
        answer: "ECN (Electronic Communication Network) brokers connect traders directly to liquidity providers, offering tighter spreads but charging commissions. Market Makers set their own prices and may trade against you. Each has pros and cons depending on your trading style."
      },
      {
        question: "Are demo accounts important?",
        answer: "Yes! Demo accounts let you practice trading with virtual money before risking real funds. They're essential for learning the platform, testing strategies, and building confidence. Most reputable brokers offer free demo accounts."
      },
      {
        question: "What should I look for in trading platforms?",
        answer: "Key features include: real-time quotes, charting tools, technical indicators, order types (market, limit, stop), mobile access, one-click trading, and reliability. MetaTrader 4/5 are industry standards, but many brokers offer proprietary platforms too."
      }
    ]
  },
  {
    id: "account-opening",
    title: "Account Opening",
    icon: CreditCard,
    faqs: [
      {
        question: "What's the minimum deposit to start trading?",
        answer: "Minimum deposits vary by broker, ranging from $0 to $10,000+. Many brokers offer micro accounts starting at $50-$100. However, a realistic starting capital is $500-$1,000 to properly manage risk and withstand normal market fluctuations."
      },
      {
        question: "What documents are needed to open an account?",
        answer: "Typically you'll need: 1) Government-issued ID (passport, driver's license), 2) Proof of address (utility bill, bank statement), 3) Social Security Number (for US residents). Some brokers may also request proof of income or trading experience."
      },
      {
        question: "How long does account verification take?",
        answer: "Most brokers complete verification within 1-3 business days. Some offer instant verification with digital document submission. Delays may occur if documents are unclear or additional information is needed."
      },
      {
        question: "Can I have multiple trading accounts?",
        answer: "Yes, most brokers allow multiple accounts. This can be useful for separating trading strategies, currencies, or risk levels. Check your broker's specific policies regarding multiple accounts."
      }
    ]
  },
  {
    id: "trading-conditions",
    title: "Trading Conditions",
    icon: BarChart3,
    faqs: [
      {
        question: "What is spread in Forex trading?",
        answer: "The spread is the difference between the bid (sell) and ask (buy) price. It's essentially the broker's fee for executing trades. Lower spreads mean lower trading costs. Major pairs typically have tighter spreads than exotic pairs."
      },
      {
        question: "What is leverage and how does it work?",
        answer: "Leverage allows you to control larger positions with smaller capital. For example, 50:1 leverage means $1,000 controls $50,000. While leverage amplifies profits, it equally amplifies losses, making risk management crucial."
      },
      {
        question: "What are swap rates/rollover fees?",
        answer: "Swap rates are interest charges or credits applied when holding positions overnight. They're based on the interest rate differential between the two currencies in a pair. Swaps can be positive (you earn) or negative (you pay)."
      },
      {
        question: "What trading hours are available?",
        answer: "The Forex market operates 24 hours a day, 5 days a week. Major sessions are: Sydney (5 PM - 2 AM EST), Tokyo (7 PM - 4 AM EST), London (3 AM - 12 PM EST), and New York (8 AM - 5 PM EST). Overlap periods offer highest liquidity."
      }
    ]
  },
  {
    id: "payment-methods",
    title: "Payment Methods",
    icon: Banknote,
    faqs: [
      {
        question: "What deposit methods are available?",
        answer: "Common methods include: bank wire transfer, credit/debit cards (Visa, Mastercard), e-wallets (PayPal, Skrill, Neteller), and sometimes cryptocurrency. Processing times and fees vary by method and broker."
      },
      {
        question: "How long do withdrawals take?",
        answer: "Withdrawal times vary: e-wallets (24-48 hours), credit cards (2-5 business days), bank transfers (3-7 business days). Verification requirements and broker processing times can affect these estimates."
      },
      {
        question: "Are there fees for deposits and withdrawals?",
        answer: "Many brokers offer free deposits, but some charge fees depending on the method. Withdrawal fees are more common, especially for wire transfers. Always check the broker's fee schedule before funding your account."
      },
      {
        question: "Is cryptocurrency accepted for deposits?",
        answer: "Some brokers accept cryptocurrency deposits (Bitcoin, Ethereum, etc.). However, US-regulated brokers typically don't support crypto deposits due to regulatory considerations. Offshore brokers are more likely to offer this option."
      }
    ]
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Forex trading, US regulations, 
              broker selection, and more. Can't find what you're looking for? Contact us.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {faqCategories.map((category, categoryIndex) => (
              <div 
                key={category.id} 
                className="bg-gradient-card border border-border rounded-2xl p-6 md:p-8 shadow-card animate-fade-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold">{category.title}</h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-2">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${category.id}-${faqIndex}`}
                      className="border border-border rounded-lg px-4 bg-secondary/30"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="text-foreground font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Still Have <span className="text-gradient-gold">Questions?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help 
            you navigate the world of Forex trading.
          </p>
          <a 
            href="mailto:support@forexscout.com" 
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity glow-gold"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
