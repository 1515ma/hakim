import React, { createContext, useState, useContext, ReactNode } from 'react';

// Tipos básicos
type UserRole = 'USER' | 'ADMIN';

interface User {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
}

interface AuthContextData {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => void;
  addToLibrary: (bookId: string) => Promise<void>;
  removeFromLibrary: (bookId: string) => Promise<void>;
  checkBookInLibrary: (bookId: string) => Promise<boolean>;
  updateProfile: () => Promise<void>;
}

// Criar o contexto com valor inicial undefined
const HakimAuthContext = createContext<AuthContextData | undefined>(undefined);

// Função para simular chamadas API (remover quando backend estiver pronto)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Provedor do contexto
export function HakimAuthProvider({ children }: { children: ReactNode }) {
  // Estados
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  // Inicializar com localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsAdmin(parsedUser.role === 'ADMIN');
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    // Simulação - remover quando tiver o backend
    await delay(500);
    
    // Simular usuário apenas para teste
    const mockUser: User = {
      id: '1',
      email,
      username: email.split('@')[0],
      role: email.includes('admin') ? 'ADMIN' : 'USER'
    };
    
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsLoggedIn(true);
    setIsAdmin(mockUser.role === 'ADMIN');
    setHasActiveSubscription(false);
  };

  // Registro
  const register = async (email: string, password: string, username?: string) => {
    // Simulação - remover quando tiver o backend
    await delay(500);
    
    const mockUser: User = {
      id: '1',
      email,
      username: username || email.split('@')[0],
      role: 'USER'
    };
    
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setHasActiveSubscription(false);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('previewPlaying');
    
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setHasActiveSubscription(false);
  };

// Gera a chave específica do usuário para a biblioteca
const getUserLibraryKey = (userId) => {
  return `userLibrary_${userId}`;
};

// Função para adicionar livro à biblioteca
const addToLibrary = async (bookId: string) => {
  if (!isLoggedIn || !user?.id) return;
  
  try {
    const libraryKey = getUserLibraryKey(user.id);
    // Persistir no localStorage para consistência sem backend
    const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
    if (!libraryItems.includes(bookId)) {
      libraryItems.push(bookId);
      localStorage.setItem(libraryKey, JSON.stringify(libraryItems));
    }
    
    // Quando tiver backend implementado:
    // await libraryAPI.addToLibrary(bookId);
  } catch (error) {
    console.error('Erro ao adicionar livro à biblioteca:', error);
    throw error;
  }
};

// Função para remover livro da biblioteca
const removeFromLibrary = async (bookId: string) => {
  if (!isLoggedIn || !user?.id) return;
  
  try {
    const libraryKey = getUserLibraryKey(user.id);
    // Persistir no localStorage para consistência sem backend
    const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
    const updatedItems = libraryItems.filter(id => id !== bookId);
    localStorage.setItem(libraryKey, JSON.stringify(updatedItems));
    
    // Quando tiver backend implementado:
    // await libraryAPI.removeFromLibrary(bookId);
  } catch (error) {
    console.error('Erro ao remover livro da biblioteca:', error);
    throw error;
  }
};

// Função para verificar se um livro está na biblioteca
const checkBookInLibrary = async (bookId: string) => {
  if (!isLoggedIn || !user?.id) return false;
  
  try {
    const libraryKey = getUserLibraryKey(user.id);
    // Verificar no localStorage para consistência sem backend
    const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
    return libraryItems.includes(bookId);
    
    // Quando tiver backend implementado:
    // const { inLibrary } = await libraryAPI.checkBookInLibrary(bookId);
    // return inLibrary;
  } catch (error) {
    console.error('Erro ao verificar livro na biblioteca:', error);
    return false;
  }
};
  // Atualizar perfil
  const updateProfile = async () => {
    if (!isLoggedIn) return;
    // Implementar quando tiver backend
    await delay(300);
    return;
  };

  // Objeto de contexto
  const contextValue: AuthContextData = {
    user,
    isLoggedIn,
    isAdmin,
    hasActiveSubscription,
    login,
    register,
    logout,
    addToLibrary,
    removeFromLibrary,
    checkBookInLibrary,
    updateProfile
  };

  // Renderização do provedor
  return (
    <HakimAuthContext.Provider value={contextValue}>
      {children}
    </HakimAuthContext.Provider>
  );
}

// Hook para acessar o contexto
export function useHakimAuth() {
  const context = useContext(HakimAuthContext);
  
  if (context === undefined) {
    throw new Error('useHakimAuth deve ser usado dentro de um HakimAuthProvider');
  }
  
  return context;
}
