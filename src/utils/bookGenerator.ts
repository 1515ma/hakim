
import { Book } from "@/types/book";

const bookCategories = [
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Business",
  "Self-Help",
  "Technology",
  "Cookbooks"
];

const sampleAuthors = [
  "Emma Thompson",
  "James Anderson",
  "Sarah Williams",
  "Michael Chen",
  "Rachel Barnes",
  "David Miller",
  "Laura Martinez",
  "Robert Wilson",
  "Patricia Lee",
  "Thomas Brown"
];

const sampleImages = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  "https://images.unsplash.com/photo-1603284569248-821525309698",
  "https://images.unsplash.com/photo-1618666012174-83b441c0bc76",
  "https://images.unsplash.com/photo-1531901599143-ab65d4a8d748",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf"
];

const generateRandomDuration = () => {
  const hours = Math.floor(Math.random() * 20) + 1;
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m`;
};

const generateRandomTitle = (category: string) => {
  const adjectives = ["The", "A", "Lost", "Hidden", "Secret", "Eternal", "Dark", "Light", "Ancient", "Modern"];
  const nouns = ["Journey", "Story", "Tale", "Path", "Mystery", "Adventure", "Chronicle", "Legacy", "Saga", "Epic"];
  
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} of ${category}`;
};

const generateRandomDescription = (title: string, category: string) => {
  return `An engaging ${category.toLowerCase()} book that takes readers on an unforgettable journey. ${title} explores themes of discovery, growth, and transformation in ways that will captivate audiences from beginning to end.`;
};

export const generateRandomBooks = (count: number): Book[] => {
  const books: Book[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = bookCategories[Math.floor(Math.random() * bookCategories.length)];
    const title = generateRandomTitle(category);
    
    books.push({
      id: `book-${i + 1}`,
      title,
      author: sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)],
      coverImage: `${sampleImages[Math.floor(Math.random() * sampleImages.length)]}?${i}`,
      duration: generateRandomDuration(),
      rating: Number((3 + Math.random() * 2).toFixed(1)), // Random rating between 3.0 and 5.0
      category,
      description: generateRandomDescription(title, category)
    });
  }
  
  return books;
};

export const categories = bookCategories;
