import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">{t('faq')}</h1>
        <div className="space-y-6">
          <div className="border-b border-hakim-medium/20 pb-6">
            <h2 className="text-xl font-medium text-hakim-light mb-2">
              What is Hakim?
            </h2>
            <p className="text-hakim-gray">
              Hakim is a premium audiobook platform offering high-quality narrations of your favorite books.
            </p>
          </div>
          {/* Add more FAQ items as needed */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
