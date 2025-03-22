
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from './context/LanguageContext';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';
import BookPreview from './components/book-details/BookPreview';

import Index from './pages/Index';
import Support from './pages/Support';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Library from './pages/Library';
import BookDetails from './pages/BookDetails';
import NewReleases from './pages/NewReleases';
import Bestsellers from './pages/Bestsellers';
import AllAudiobooks from './pages/AllAudiobooks';
import Fiction from './pages/categories/Fiction';
import NonFiction from './pages/categories/NonFiction';
import MysteryThriller from './pages/categories/MysteryThriller';
import SciFi from './pages/categories/SciFi';
import Fantasy from './pages/categories/Fantasy';
import Romance from './pages/categories/Romance';
import Biography from './pages/categories/Biography';
import History from './pages/categories/History';
import SelfHelp from './pages/categories/SelfHelp';
import Business from './pages/categories/Business';
import Cookbooks from './pages/categories/Cookbooks';
import Horror from './pages/categories/Horror';
import Technology from './pages/categories/Technology';
import Mystery from './pages/categories/Mystery';
import NotFound from './pages/NotFound';
import AnimatedCursor from './components/AnimatedCursor';
import ChatHelp from './components/ChatHelp';
import AudiobookDetails from './pages/AudiobookDetails';
import RatedBooks from './pages/RatedBooks';
import Settings from './pages/Settings';

function App() {
  const [blurEnabled, setBlurEnabled] = useState(false);
  const { theme: defaultTheme } = useTheme();
  const [globalPreviewState, setGlobalPreviewState] = useState({
    isPlaying: false,
    title: '',
    author: '',
    coverImage: ''
  });

  useEffect(() => {
    const checkForActivePreview = () => {
      const storedPreview = localStorage.getItem('previewPlaying');
      if (storedPreview) {
        const previewData = JSON.parse(storedPreview);
        setGlobalPreviewState({
          isPlaying: true,
          title: previewData.title,
          author: previewData.author,
          coverImage: previewData.coverImage
        });
      } else {
        setGlobalPreviewState({
          isPlaying: false,
          title: '',
          author: '',
          coverImage: ''
        });
      }
    };

    // Check on component mount
    checkForActivePreview();

    // Add event listener for localStorage changes
    window.addEventListener('storage', checkForActivePreview);
    
    // Also check periodically to ensure we catch changes
    const interval = setInterval(checkForActivePreview, 1000);
    
    return () => {
      window.removeEventListener('storage', checkForActivePreview);
      clearInterval(interval);
    };
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme={defaultTheme}>
          <AnimatedCursor />
          <ChatHelp />
          <div className={`min-h-screen ${blurEnabled ? 'backdrop-blur-xl' : ''}`}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/library" element={<Library />} />
              <Route path="/rated-books" element={<RatedBooks />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/audiobook/:id" element={<AudiobookDetails />} />
              <Route path="/book-details/:id" element={<BookDetails />} />
              <Route path="/new-releases" element={<NewReleases />} />
              <Route path="/bestsellers" element={<Bestsellers />} />
              <Route path="/all-audiobooks" element={<AllAudiobooks />} />
              <Route path="/categories/fiction" element={<Fiction />} />
              <Route path="/categories/non-fiction" element={<NonFiction />} />
              <Route path="/categories/mystery-thriller" element={<MysteryThriller />} />
              <Route path="/categories/science-fiction" element={<SciFi />} />
              <Route path="/categories/fantasy" element={<Fantasy />} />
              <Route path="/categories/romance" element={<Romance />} />
              <Route path="/categories/biography" element={<Biography />} />
              <Route path="/categories/history" element={<History />} />
              <Route path="/categories/self-help" element={<SelfHelp />} />
              <Route path="/categories/business" element={<Business />} />
              <Route path="/categories/cookbooks" element={<Cookbooks />} />
              <Route path="/categories/horror" element={<Horror />} />
              <Route path="/categories/technology" element={<Technology />} />
              <Route path="/categories/mystery" element={<Mystery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BookPreview 
            isPreviewPlaying={globalPreviewState.isPlaying}
            title={globalPreviewState.title}
            author={globalPreviewState.author}
            coverImage={globalPreviewState.coverImage}
          />
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
