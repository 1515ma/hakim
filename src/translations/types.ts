export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  loading: {
    en: 'Loading...',
    es: 'Cargando...',
    fr: 'Chargement...',
    de: 'Laden...',
    pt: 'Carregando...'
  },
  searchBooks: {
    en: 'Search books...',
    es: 'Buscar libros...',
    fr: 'Rechercher des livres...',
    de: 'Bücher suchen...',
    pt: 'Buscar livros...'
  },
  categories: {
    en: 'Categories',
    es: 'Categorías',
    fr: 'Catégories',
    de: 'Kategorien',
    pt: 'Categorias'
  },
  viewAll: {
    en: 'View All',
    es: 'Ver todo',
    fr: 'Voir tout',
    de: 'Alle anzeigen',
    pt: 'Ver tudo'
  },
  home: {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    pt: 'Início'
  },
  explore: {
    en: 'Explore',
    es: 'Explorar',
    fr: 'Explorer',
    de: 'Entdecken',
    pt: 'Explorar'
  },
  by: {
    en: 'by',
    es: 'por',
    fr: 'par',
    de: 'von',
    pt: 'por'
  },
  goToPage: {
    en: 'Go to page',
    es: 'Ir a la página',
    fr: 'Aller à la page',
    de: 'Zur Seite gehen',
    pt: 'Ir para página'
  },
  login: {
    en: 'Login',
    es: 'Iniciar sesión',
    fr: 'Connexion',
    de: 'Anmelden',
    pt: 'Entrar'
  },
  signUp: {
    en: 'Sign up',
    es: 'Registrarse',
    fr: 'S\'inscrire',
    de: 'Registrieren',
    pt: 'Cadastrar'
  },
  myAccount: {
    en: 'My Account',
    es: 'Mi Cuenta',
    fr: 'Mon Compte',
    de: 'Mein Konto',
    pt: 'Minha Conta'
  },
  myLibrary: {
    en: 'My Library',
    es: 'Mi Biblioteca',
    fr: 'Ma Bibliothèque',
    de: 'Meine Bibliothek',
    pt: 'Minha Biblioteca'
  },
  ratedBooks: {
    en: 'Rated Books',
    es: 'Libros Calificados',
    fr: 'Livres Évalués',
    de: 'Bewertete Bücher',
    pt: 'Livros Avaliados'
  },
  logout: {
    en: 'Logout',
    es: 'Cerrar sesión',
    fr: 'Déconnexion',
    de: 'Abmelden',
    pt: 'Sair'
  },
  settings: {
    en: 'Settings',
    es: 'Configuración',
    fr: 'Paramètres',
    de: 'Einstellungen',
    pt: 'Configurações'
  },
  reviews: {
    en: 'Reviews',
    es: 'Reseñas',
    fr: 'Avis',
    de: 'Bewertungen',
    pt: 'Avaliações'
  },
  outOf5: {
    en: 'out of 5',
    es: 'de 5',
    fr: 'sur 5',
    de: 'von 5',
    pt: 'de 5'
  },
  writeReview: {
    en: 'Write a Review',
    es: 'Escribir una Reseña',
    fr: 'Écrire un Avis',
    de: 'Bewertung schreiben',
    pt: 'Escrever uma Avaliação'
  },
  loadMoreReviews: {
    en: 'Load More Reviews',
    es: 'Cargar más Reseñas',
    fr: 'Charger plus d\'Avis',
    de: 'Mehr Bewertungen laden',
    pt: 'Carregar mais Avaliações'
  },
  allChapters: {
    en: 'All Chapters',
    es: 'Todos los Capítulos',
    fr: 'Tous les Chapitres',
    de: 'Alle Kapitel',
    pt: 'Todos os Capítulos'
  },
  expand: {
    en: 'Expand',
    es: 'Expandir',
    fr: 'Développer',
    de: 'Erweitern',
    pt: 'Expandir'
  },
  freePreview: {
    en: 'Free Preview',
    es: 'Vista Previa Gratuita',
    fr: 'Aperçu Gratuit',
    de: 'Kostenlose Vorschau',
    pt: 'Prévia Gratuita'
  },
  showAllChapters: {
    en: 'Show All Chapters',
    es: 'Mostrar Todos los Capítulos',
    fr: 'Afficher Tous les Chapitres',
    de: 'Alle Kapitel anzeigen',
    pt: 'Mostrar Todos os Capítulos'
  },
  account: {
    en: 'Account',
    es: 'Cuenta',
    fr: 'Compte',
    de: 'Konto',
    pt: 'Conta'
  },
  security: {
    en: 'Security',
    es: 'Seguridad',
    fr: 'Sécurité',
    de: 'Sicherheit',
    pt: 'Segurança'
  },
  notifications: {
    en: 'Notifications',
    es: 'Notificaciones',
    fr: 'Notifications',
    de: 'Benachrichtigungen',
    pt: 'Notificações'
  },
  preferences: {
    en: 'Preferences',
    es: 'Preferencias',
    fr: 'Préférences',
    de: 'Einstellungen',
    pt: 'Preferências'
  },
  saveChanges: {
    en: 'Save Changes',
    es: 'Guardar Cambios',
    fr: 'Enregistrer les Modifications',
    de: 'Änderungen speichern',
    pt: 'Salvar Alterações'
  },
  language: {
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
    de: 'Sprache',
    pt: 'Idioma'
  },
  profileInfo: {
    en: 'Profile Information',
    es: 'Información de Perfil',
    fr: 'Informations de Profil',
    de: 'Profilinformationen',
    pt: 'Informações de Perfil'
  },
  updateProfile: {
    en: 'Update your profile details and information',
    es: 'Actualiza los detalles de tu perfil e información',
    fr: 'Mettez à jour les détails de votre profil et vos informations',
    de: 'Aktualisieren Sie Ihre Profildetails und Informationen',
    pt: 'Atualize os detalhes do seu perfil e informações'
  },
  fullName: {
    en: 'Full Name',
    es: 'Nombre Completo',
    fr: 'Nom Complet',
    de: 'Vollständiger Name',
    pt: 'Nome Completo'
  },
  email: {
    en: 'Email',
    es: 'Correo Electrónico',
    fr: 'Email',
    de: 'E-Mail',
    pt: 'E-mail'
  },
  dangerZone: {
    en: 'Danger Zone',
    es: 'Zona de Peligro',
    fr: 'Zone Dangereuse',
    de: 'Gefahrenzone',
    pt: 'Zona de Perigo'
  },
  deleteAccount: {
    en: 'Delete Account',
    es: 'Eliminar Cuenta',
    fr: 'Supprimer le Compte',
    de: 'Konto löschen',
    pt: 'Excluir Conta'
  },
  password: {
    en: 'Password',
    es: 'Contraseña',
    fr: 'Mot de Passe',
    de: 'Passwort',
    pt: 'Senha'
  },
  changePassword: {
    en: 'Change your password',
    es: 'Cambiar tu contraseña',
    fr: 'Changer votre mot de passe',
    de: 'Ändern Sie Ihr Passwort',
    pt: 'Alterar sua senha'
  },
  currentPassword: {
    en: 'Current Password',
    es: 'Contraseña Actual',
    fr: 'Mot de Passe Actuel',
    de: 'Aktuelles Passwort',
    pt: 'Senha Atual'
  },
  newPassword: {
    en: 'New Password',
    es: 'Nueva Contraseña',
    fr: 'Nouveau Mot de Passe',
    de: 'Neues Passwort',
    pt: 'Nova Senha'
  },
  confirmPassword: {
    en: 'Confirm New Password',
    es: 'Confirmar Nueva Contraseña',
    fr: 'Confirmer le Nouveau Mot de Passe',
    de: 'Neues Passwort bestätigen',
    pt: 'Confirmar Nova Senha'
  },
  updatePassword: {
    en: 'Update Password',
    es: 'Actualizar Contraseña',
    fr: 'Mettre à Jour le Mot de Passe',
    de: 'Passwort aktualisieren',
    pt: 'Atualizar Senha'
  },
  notificationSettings: {
    en: 'Notification Settings',
    es: 'Configuración de Notificaciones',
    fr: 'Paramètres de Notification',
    de: 'Benachrichtigungseinstellungen',
    pt: 'Configurações de Notificação'
  },
  chooseNotifications: {
    en: 'Choose what notifications you\'d like to receive',
    es: 'Elige qué notificaciones te gustaría recibir',
    fr: 'Choisissez les notifications que vous souhaitez recevoir',
    de: 'Wählen Sie aus, welche Benachrichtigungen Sie erhalten möchten',
    pt: 'Escolha quais notificações você gostaria de receber'
  },
  emailNotifications: {
    en: 'Email Notifications',
    es: 'Notificaciones por Correo',
    fr: 'Notifications par Email',
    de: 'E-Mail-Benachrichtigungen',
    pt: 'Notificações por E-mail'
  },
  receiveNotifications: {
    en: 'Receive notifications about new books and updates',
    es: 'Recibir notificaciones sobre nuevos libros y actualizaciones',
    fr: 'Recevoir des notifications concernant les nouveaux livres et les mises à jour',
    de: 'Erhalten Sie Benachrichtigungen über neue Bücher und Updates',
    pt: 'Receber notificações sobre novos livros e atualizações'
  },
  marketingEmails: {
    en: 'Marketing Emails',
    es: 'Correos de Marketing',
    fr: 'Emails Marketing',
    de: 'Marketing-E-Mails',
    pt: 'E-mails de Marketing'
  },
  receivePromotions: {
    en: 'Receive emails about promotions and special offers',
    es: 'Recibir correos sobre promociones y ofertas especiales',
    fr: 'Recevoir des emails concernant les promotions et offres spéciales',
    de: 'Erhalten Sie E-Mails über Werbeaktionen und Sonderangebote',
    pt: 'Receber e-mails sobre promoções e ofertas especiais'
  },
  savePreferences: {
    en: 'Save Preferences',
    es: 'Guardar Preferencias',
    fr: 'Enregistrer les Préférences',
    de: 'Einstellungen speichern',
    pt: 'Salvar Preferências'
  },
  languageRegion: {
    en: 'Language & Region',
    es: 'Idioma y Región',
    fr: 'Langue et Région',
    de: 'Sprache & Region',
    pt: 'Idioma e Região'
  },
  setLanguage: {
    en: 'Set your preferred language and region settings',
    es: 'Establece tu idioma y configuración regional preferidos',
    fr: 'Définissez votre langue et vos paramètres régionaux préférés',
    de: 'Legen Sie Ihre bevorzugte Sprache und Regioneinstellungen fest',
    pt: 'Defina seu idioma preferido e configurações regionais'
  },
  manageSettings: {
    en: 'Manage your account settings and preferences',
    es: 'Administra la configuración y preferencias de tu cuenta',
    fr: 'Gérez les paramètres et préférences de votre compte',
    de: 'Verwalten Sie Ihre Kontoeinstellungen und Präferenzen',
    pt: 'Gerencie as configurações e preferências da sua conta'
  },
  loginRequired: {
    en: 'You need to be logged in to access settings.',
    es: 'Debes iniciar sesión para acceder a la configuración.',
    fr: 'Vous devez être connecté pour accéder aux paramètres.',
    de: 'Sie müssen angemeldet sein, um auf die Einstellungen zuzugreifen.',
    pt: 'Você precisa estar logado para acessar as configurações.'
  },
  goToLogin: {
    en: 'Go to Login',
    es: 'Ir a Iniciar sesión',
    fr: 'Aller à la connexion',
    de: 'Zur Anmeldung',
    pt: 'Ir para Login'
  }
};
