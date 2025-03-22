
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BlogDialog = ({ open, onOpenChange }: BlogDialogProps) => {
  const blogPosts = [
    {
      title: "The Top 10 Books of 2024 (So Far)",
      date: "June 15, 2024",
      excerpt: "Discover the most captivating reads that have captured readers' attention this year."
    },
    {
      title: "Why Audiobooks Are Changing How We Read",
      date: "May 27, 2024",
      excerpt: "The rise of audiobooks is transforming our relationship with literature in surprising ways."
    },
    {
      title: "Interview with Bestselling Author Maya Johnson",
      date: "April 10, 2024",
      excerpt: "We sat down with Maya Johnson to discuss her creative process and upcoming novel."
    }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Blog</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Latest articles and insights from Hakim Books.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <div key={index} className="border-b border-hakim-medium/20 pb-3 last:border-b-0">
              <h3 className="text-hakim-light font-medium">{post.title}</h3>
              <p className="text-xs text-hakim-gray mt-1">{post.date}</p>
              <p className="text-sm text-hakim-gray mt-2">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDialog;
