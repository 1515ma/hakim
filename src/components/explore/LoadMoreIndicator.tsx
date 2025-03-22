
interface LoadMoreIndicatorProps {
  loading: boolean;
  hasMore: boolean;
}

const LoadMoreIndicator = ({ loading, hasMore }: LoadMoreIndicatorProps) => {
  if (!hasMore) return null;
  
  return (
    <div className="w-full h-20 flex items-center justify-center">
      {loading && (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-hakim-light"></div>
      )}
    </div>
  );
};

export default LoadMoreIndicator;
