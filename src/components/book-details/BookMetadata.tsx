
import { Clock, Calendar, User } from 'lucide-react';

interface BookMetadataProps {
  narrator: string;
  duration: string;
  releaseDate: string;
  publisher: string;
  language: string;
  genre: string;
}

const BookMetadata = ({
  narrator,
  duration,
  releaseDate,
  publisher,
  language,
  genre
}: BookMetadataProps) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between">
        <span className="text-foreground/70">Narrator</span>
        <span className="font-medium">{narrator}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-foreground/70">Duration</span>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span className="font-medium">{duration}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-foreground/70">Released</span>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="font-medium">{releaseDate}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-foreground/70">Publisher</span>
        <span className="font-medium">{publisher}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-foreground/70">Language</span>
        <span className="font-medium">{language}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-foreground/70">Genre</span>
        <span className="font-medium">{genre}</span>
      </div>
    </div>
  );
};

export default BookMetadata;
