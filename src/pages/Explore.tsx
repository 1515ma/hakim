
import { useState, useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreTabs from "@/components/explore/ExploreTabs";
import BookContentSection from "@/components/explore/BookContentSection";
import EmptyState from "@/components/explore/EmptyState";
import LoadMoreIndicator from "@/components/explore/LoadMoreIndicator";
import { getAudiobooks, newReleases, trending } from "@/data/books";
import { Book } from "@/types/book";

const ITEMS_PER_PAGE = 20;

const Explore = () => {
  const [activeTab, setActiveTab] = useState("audiobooks");
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useLanguage();
  const { library } = useAuth();
  
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px 0px 200px 0px" // Load more when element is 200px from viewport
  });

  // Initial load
  useEffect(() => {
    if (activeTab === "audiobooks" && books.length === 0) {
      loadMore();
    }
  }, [activeTab]);
  
  // Force a re-render when library changes
  const [libraryUpdateKey, setLibraryUpdateKey] = useState(0);
  
  useEffect(() => {
    // This forces the BookContentSection to re-render when the library changes
    setLibraryUpdateKey(prev => prev + 1);
  }, [library]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate network delay for smoother loading
    setTimeout(() => {
      const newBooks = getAudiobooks(page, ITEMS_PER_PAGE);
      
      if (newBooks.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      
      setBooks(prev => [...prev, ...newBooks]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setBooks([]);
    setPage(1);
    setHasMore(true);
    
    if (value === "new-releases") {
      setBooks(newReleases || []);
      setHasMore(false);
    } else if (value === "trending") {
      setBooks(trending || []);
      setHasMore(false);
    } else {
      loadMore();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28">
        <ExploreHeader />
        
        <ExploreTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        {books.length > 0 ? (
          <div className="animate-fade-in">
            <BookContentSection 
              books={books} 
              key={`content-section-${libraryUpdateKey}`}
            />
            <LoadMoreIndicator loading={loading} hasMore={hasMore} />
          </div>
        ) : (
          <EmptyState />
        )}
        
        <div ref={ref} aria-hidden="true" className="h-1" />
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
