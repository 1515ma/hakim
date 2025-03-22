
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-6">About Hakim</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-hakim-gray mb-4">
            At Hakim, we're passionate about connecting people with knowledge and stories through the power of audio.
            Our mission is to make literature and learning accessible to everyone, everywhere.
          </p>
          <p className="text-hakim-gray mb-4">
            Founded with the vision of transforming how people consume books, Hakim has grown into a 
            leading platform for audiobooks, offering a vast library of titles across multiple genres.
          </p>
          <p className="text-hakim-gray">
            Our team is dedicated to providing the best possible listening experience, with high-quality 
            audio production and a user-friendly platform that makes it easy to discover and enjoy your 
            next great listen.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
