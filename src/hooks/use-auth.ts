// Este arquivo agora apenas redireciona para a nova implementação
// Não precisamos alterar as importações em todo o projeto

import { useHakimAuth, HakimAuthProvider } from '../context/HakimAuthContext';

// Re-exportamos com os nomes originais
export const useAuth = useHakimAuth;
export { HakimAuthProvider as AuthProvider };

// Isso permite que todo código que usava useAuth e AuthProvider continue funcionando