
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Careers = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-6">Careers at Hakim</h1>
        <p className="text-hakim-gray mb-8">
          Join our team and help shape the future of audiobooks.
        </p>
        
        <div className="grid gap-6">
          <div className="border border-hakim-medium/20 rounded-lg p-6">
            <h2 className="text-xl font-medium text-hakim-light mb-2">
              Senior React Developer
            </h2>
            <p className="text-sm text-hakim-gray mb-4">Remote • Full-time</p>
            <p className="text-hakim-gray mb-4">
              We're looking for an experienced React developer to help build and improve 
              our web platform...
            </p>
          </div>
          
          <div className="border border-hakim-medium/20 rounded-lg p-6">
            <h2 className="text-xl font-medium text-hakim-light mb-2">
              UX/UI Designer
            </h2>
            <p className="text-sm text-hakim-gray mb-4">Berlin • Full-time</p>
            <p className="text-hakim-gray mb-4">
              Join our design team to create beautiful and intuitive user experiences...
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Careers;
