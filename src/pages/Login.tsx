
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import LoginCarousel from "@/components/auth/LoginCarousel";
import { getAudiobooks } from "@/data/books";
import { Book } from "@/types/book";

const Login = () => {
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch more books for the carousel to have enough for the new design
  useEffect(() => {
    const fetchedBooks = getAudiobooks(1, 12);
    setBooks(fetchedBooks);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container relative h-[calc(100vh-5rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <LoginCarousel books={books} />
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
