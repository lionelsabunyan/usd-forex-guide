import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAffiliateUrl, trackAffiliateClick } from "@/lib/tracking";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQContent = () => {
  const fxgloryUrl = getAffiliateUrl("fxglory", { source: "faq", medium: "inline", campaign: "faq_min_deposit" });
  const hankotradUrl = getAffiliateUrl("hankotrade", { source: "faq", medium: "inline", campaign: "faq_leverage" });

  const faqs: FAQItem[] = [
    {
      question: "Is forex trading legal in the United States?",
      answer: "Yes, forex trading is legal in the United States. However, it's heavily regulated by the CFTC (Commodity Futures Trading Commission) and NFA (National Futures Association). US residents can only trade with brokers that are registered with these regulatory bodies, though some offshore brokers also accept US clients.",
    },
    {
      question: "What is the minimum deposit to start forex trading?",
      answer: (
        <>
          Minimum deposits vary significantly between brokers. Some brokers like{" "}
          <a
            href={fxgloryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
            onClick={() => trackAffiliateClick("fxglory", "faq", "inline_link")}
          >
            FXGlory
          </a>{" "}
          accept deposits as low as $1, while regulated US brokers like OANDA have no minimum deposit requirement. Higher minimum deposits are common with brokers offering more advanced trading conditions.
        </>
      ),
    },
    {
      question: "What leverage is available for US forex traders?",
      answer: (
        <>
          US-regulated brokers are limited to offering 1:50 leverage on major currency pairs and 1:20 on minor pairs due to CFTC regulations. However, offshore brokers like{" "}
          <a
            href={hankotradUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
            onClick={() => trackAffiliateClick("hankotrade", "faq", "inline_link")}
          >
            Hankotrade
          </a>{" "}
          that accept US clients may offer significantly higher leverage, up to 1:1000 in some cases. Higher leverage carries greater risk.
        </>
      ),
    },
    {
      question: "How do I verify if a forex broker is trustworthy?",
      answer: "Check for regulation status (NFA/CFTC for US brokers), read multiple independent reviews, verify their company history and financial stability, test their customer support, and start with a demo account before investing real money. Our reviews include all these verification steps.",
    },
    {
      question: "What platforms do forex brokers offer?",
      answer: "Most forex brokers offer MetaTrader 4 (MT4) and/or MetaTrader 5 (MT5), which are industry-standard platforms. Some also offer proprietary platforms or web-based trading interfaces. Mobile trading apps are typically available for both iOS and Android devices.",
    },
    {
      question: "Are your broker reviews unbiased?",
      answer: "Our reviews are based on objective criteria including trading conditions, fees, regulation, customer support quality, and user feedback. We receive affiliate commissions when you open accounts through our links — this is disclosed transparently and does not influence our ratings or recommendations.",
    },
  ];

  return faqs;
};

const FAQ = () => {
  const faqs = FAQContent();

  return (
    <section id="faq" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about forex trading and broker selection
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;