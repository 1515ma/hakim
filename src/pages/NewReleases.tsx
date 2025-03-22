
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import AudiobookCard from "@/components/AudiobookCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { newReleases as newReleaseBooks } from "@/data/books";
import { Book } from "@/types/book";
import { ChevronRight, Star, Clock, Calendar } from "lucide-react";

const NewReleases = () => {
  const [selectedBook, setSelectedBook] = useState(newReleaseBooks[0]);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 mt-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('newReleases')}</h1>
          <p className="text-foreground/70">{t('discoverNewBooks')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column with book list */}
          <div className="md:col-span-1">
            <div className="space-y-1">
              {newReleaseBooks.map((book, index) => (
                <div key={book.id}>
                  <div 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-hakim-medium/10 ${selectedBook.id === book.id ? 'bg-hakim-medium/10' : ''}`}
                    onClick={() => setSelectedBook(book)}
                  >
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-16 h-24 object-cover rounded-md" 
                    />
                    <div className="ml-4 flex-1">
                      <h3 className={`font-medium line-clamp-1 ${selectedBook.id === book.id ? 'text-hakim-light' : 'text-foreground'}`}>
                        {book.title}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        {book.author}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${selectedBook.id === book.id ? 'text-hakim-light' : 'text-foreground/50'}`} />
                  </div>
                  {index < newReleaseBooks.length - 1 && (
                    <Separator className="my-1 bg-hakim-medium/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column with book details */}
          <div className="md:col-span-2 bg-hakim-dark/10 p-6 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={selectedBook.coverImage} 
                  alt={selectedBook.title} 
                  className="w-40 h-60 object-cover rounded-xl shadow-lg" 
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-hakim-light mb-3">{t('by')} {selectedBook.author}</p>
                
                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex items-center space-x-1 bg-hakim-medium/10 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm">{selectedBook.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-hakim-medium/10 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-hakim-light" />
                    <span className="text-sm">{selectedBook.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-hakim-medium/10 px-3 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4 text-hakim-light" />
                    <span className="text-sm">{selectedBook.releaseDate}</span>
                  </div>
                </div>
                
                <p className="text-foreground/80 leading-relaxed my-4">
                  {selectedBook.description}
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="default" className="gap-2">
                    {t('listen')}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    {t('addToLibrary')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewReleases;
