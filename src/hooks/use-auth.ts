
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Auth hook designed for easy backend integration
export const useAuth = () => {
  const [userData, setUserData] = useState<{ name: string; email: string; userId: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [library, setLibrary] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage on initial load
    const storedUserData = localStorage.getItem('userData');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedLibrary = localStorage.getItem('userLibrary');
    
    if (storedUserData && storedIsLoggedIn) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
    
    if (storedLibrary) {
      setLibrary(JSON.parse(storedLibrary));
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real implementation, this would be an API call
    // For now, we'll simulate with localStorage
    console.log('Login attempt:', { email, password });
    
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    
    // Simulating successful login
    const user = { 
      email,
      name: email.split('@')[0], // Simple demo data
      userId: `user-${Date.now()}` // Generate a pretend user ID
    };
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(user));
    
    setUserData(user);
    setIsLoggedIn(true);
    
    // Load library if exists
    const storedLibrary = localStorage.getItem('userLibrary');
    if (storedLibrary) {
      setLibrary(JSON.parse(storedLibrary));
    }
    
    toast.success('Login successful!');
    navigate('/explore');
    return true;
  };

  const register = (email: string, password: string, name: string) => {
    // In a real implementation, this would be an API call
    console.log('Register attempt:', { email, password, name });
    
    // Basic validation
    if (!email || !password || !name) {
      toast.error('Please fill in all fields');
      return false;
    }
    
    // Simply simulate registration success
    const user = { email, name, userId: `user-${Date.now()}` };
    localStorage.setItem('userData', JSON.stringify(user));
    
    // Initialize empty library
    localStorage.setItem('userLibrary', JSON.stringify([]));
    setLibrary([]);
    
    // Auto-login after registration
    localStorage.setItem('isLoggedIn', 'true');
    setUserData(user);
    setIsLoggedIn(true);
    
    toast.success('Registration successful!');
    navigate('/explore');
    return true;
  };

  const logout = () => {
    // Remove auth data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    
    // Clear the audio preview when logging out
    localStorage.removeItem('previewPlaying');
    
    setIsLoggedIn(false);
    setUserData(null);
    setLibrary([]);
    toast.info('You have been logged out');
    navigate('/');
  };

  const addToLibrary = (bookId: string) => {
    if (!isLoggedIn) {
      toast.error('Please login to add books to your library');
      navigate('/login');
      return false;
    }
    
    if (library.includes(bookId)) {
      toast.info('This book is already in your library');
      return false;
    }
    
    const updatedLibrary = [...library, bookId];
    localStorage.setItem('userLibrary', JSON.stringify(updatedLibrary));
    setLibrary(updatedLibrary);
    toast.success('Book added to your library');
    return true;
  };

  const removeFromLibrary = (bookId: string) => {
    console.log("Removing from library:", bookId);
    if (!isLoggedIn) {
      return false;
    }
    
    const updatedLibrary = library.filter(id => id !== bookId);
    localStorage.setItem('userLibrary', JSON.stringify(updatedLibrary));
    setLibrary(updatedLibrary);
    toast.success('Book removed from your library');
    return true;
  };

  const isInLibrary = (bookId: string) => {
    return library.includes(bookId);
  };

  return {
    isLoggedIn,
    userData,
    library,
    login,
    register,
    logout,
    addToLibrary,
    removeFromLibrary,
    isInLibrary
  };
};
