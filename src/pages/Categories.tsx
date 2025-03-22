
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { categories } from "@/utils/bookGenerator";
import { Link } from "react-router-dom";

const Categories = () => {
  const { t } = useLanguage();

  // Function to convert category name to URL path
  const categoryToPath = (category: string) => {
    return category.toLowerCase().replace(/ & /g, '-');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">{t('categories')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category}
              to={`/categories/${categoryToPath(category)}`}
              className="p-6 rounded-lg border border-hakim-medium/20 hover:border-hakim-medium transition-colors"
            >
              <h2 className="text-xl font-medium text-hakim-light mb-2">
                {category}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categories;
