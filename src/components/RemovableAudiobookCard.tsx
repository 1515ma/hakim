
import { ReactNode } from "react";
import AudiobookCard from "@/components/AudiobookCard";
import RemoveButton from "@/components/RemoveButton";

interface RemovableAudiobookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  duration: string;
  rating?: number;
  category?: string;
  index?: number;
  onRemove: (id: string) => void;
  removeLabel?: string;
  children?: ReactNode;
}

const RemovableAudiobookCard = ({
  id,
  title,
  author,
  coverImage,
  duration,
  rating,
  category,
  index,
  onRemove,
  removeLabel,
  children
}: RemovableAudiobookCardProps) => {
  const handleRemove = () => {
    console.log("Remove clicked for book:", id);
    onRemove(id);
  };

  return (
    <div className="relative group">
      <AudiobookCard
        id={id}
        title={title}
        author={author}
        coverImage={coverImage}
        duration={duration}
        rating={rating}
        category={category}
        index={index}
      />
      <RemoveButton 
        onClick={handleRemove} 
        label={removeLabel}
      />
      {children}
    </div>
  );
};

export default RemovableAudiobookCard;
