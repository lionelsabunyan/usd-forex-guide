import TRLayout from "@/components/tr/TRLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactStore } from "@/lib/adminStore";
import { sendContactNotification } from "@/lib/emailService";

const Iletisim = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Local store'a kaydet (admin dashboard için)
      contactStore.add({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        language: "tr", // Turkish form identifier
      });

      // EmailJS ile email gönder
      await sendContactNotification({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSubmitting(false);
      toast({
        title: "Mesajınız gönderildi",
        description: "En kısa sürede size dönüş yapacağız.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Hata",
        description: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <TRLayout
      title="İletişim"
      description="Beginner FX Guide ile iletişime geçin. Sorularınız ve önerileriniz için buradayız."
    >
      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              İletişim
            </h1>
            <p className="text-lg text-muted-foreground">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Bize Ulaşın
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-posta</h3>
                    <a
                      href="mailto:info@beginnerfxguide.com"
                      className="text-primary hover:underline"
                    >
                      info@beginnerfxguide.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Yanıt Süresi</h3>
                    <p className="text-muted-foreground">
                      Genellikle 24-48 saat içinde yanıt veriyoruz.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Konular</h3>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• Broker incelemeleri hakkında sorular</li>
                      <li>• Site geri bildirimleri ve öneriler</li>
                      <li>• İş birliği talepleri</li>
                      <li>• Hata bildirimleri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                Mesaj Gönderin
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Adınız *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınızı girin"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Konu *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Mesajınızın konusu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mesajınız *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </TRLayout>
  );
};

export default Iletisim;
