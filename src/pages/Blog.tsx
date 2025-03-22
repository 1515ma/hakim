
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-6">Hakim Blog</h1>
        <div className="grid gap-8">
          <article className="border-b border-hakim-medium/20 pb-8">
            <h2 className="text-xl font-medium text-hakim-light mb-2">
              The Rise of Audiobooks in the Digital Age
            </h2>
            <p className="text-sm text-hakim-gray mb-4">
              Published on March 15, 2024
            </p>
            <p className="text-hakim-gray">
              Explore how audiobooks are transforming the way we consume literature 
              in our fast-paced, digital world...
            </p>
          </article>
          
          <article className="border-b border-hakim-medium/20 pb-8">
            <h2 className="text-xl font-medium text-hakim-light mb-2">
              Best Practices for Audiobook Narration
            </h2>
            <p className="text-sm text-hakim-gray mb-4">
              Published on March 10, 2024
            </p>
            <p className="text-hakim-gray">
              Tips and techniques for creating engaging audiobook narrations that 
              captivate listeners...
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
