
interface BookDescriptionProps {
  description: string;
  additionalText?: string;
}

const BookDescription = ({ description, additionalText }: BookDescriptionProps) => {
  return (
    <div className="prose max-w-none">
      <p className="mb-4 leading-relaxed text-white/90 font-light tracking-wide">
        {description}
      </p>
      {additionalText && (
        <p className="text-hakim-light/80 italic text-sm font-light tracking-wide border-l-2 border-hakim-light/30 pl-3 mt-3">
          {additionalText}
        </p>
      )}
    </div>
  );
};

export default BookDescription;
