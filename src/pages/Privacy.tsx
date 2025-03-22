import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">{t('privacyPolicy')}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-hakim-gray mb-4">
            Your privacy is important to us. This privacy policy document outlines the types of personal information received and collected by Hakim.
          </p>
          <h2 className="text-xl font-medium text-hakim-light mt-8 mb-4">Information Collection</h2>
          <p className="text-hakim-gray mb-4">
            We only collect information that is necessary to provide you with our service.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
