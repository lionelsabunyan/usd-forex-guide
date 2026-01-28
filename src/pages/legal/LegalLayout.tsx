import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const LegalLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 pb-10 bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </section>

      <main className="py-10">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;

