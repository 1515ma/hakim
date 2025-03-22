import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">{t('termsOfService')}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-hakim-gray mb-4">
            Welcome to Hakim. By accessing our service, you agree to these terms of service.
          </p>
          <h2 className="text-xl font-medium text-hakim-light mt-8 mb-4">1. Terms</h2>
          <p className="text-hakim-gray mb-4">
            By accessing this website, you are agreeing to be bound by these terms of service.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
