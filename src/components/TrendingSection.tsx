
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AudiobookCard from './AudiobookCard';
import { useState, useEffect } from 'react';

const trendingBooks = [
  {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1603284569248-821525309698?q=80&w=1976&auto=format&fit=crop',
    duration: '21h 8m',
    rating: 4.8,
    category: 'Sci-Fi'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
    duration: '5h 35m',
    rating: 4.9,
    category: 'Self-Help'
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=1974&auto=format&fit=crop',
    duration: '11h 5m',
    rating: 4.7,
    category: 'Fantasy'
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverImage: 'https://images.unsplash.com/photo-1531901599143-ab65d4a8d748?q=80&w=1944&auto=format&fit=crop',
    duration: '15h 17m',
    rating: 4.6,
    category: 'History'
  },
  {
    id: '5',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1798&auto=format&fit=crop',
    duration: '8h 50m',
    rating: 4.5,
    category: 'Fiction'
  }
];

const TrendingSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trending-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="trending-section" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-end justify-between mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
            <p className="text-foreground/70 mt-1">Popular audiobooks this week</p>
          </div>
          <Link to="/trending" className="text-accent flex items-center text-sm font-medium hover:underline">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {trendingBooks.map((book, index) => (
            <AudiobookCard 
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              duration={book.duration}
              rating={book.rating}
              category={book.category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
