import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import ContactDialog from "@/components/dialogs/ContactDialog";

const Support = () => {
  const { t } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">{t('support')}</h1>
        <div className="max-w-2xl">
          <p className="text-hakim-gray mb-6">
            Need help? Our support team is here to assist you with any questions or concerns.
          </p>
          <Button 
            className="gap-2"
            onClick={() => setContactOpen(true)}
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>
      <Footer />
      
      <ContactDialog 
        open={contactOpen} 
        onOpenChange={(open) => setContactOpen(open)} 
      />
    </>
  );
};

export default Support;
