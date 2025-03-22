
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ExploreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const ExploreDialog = ({ open, onOpenChange, title }: ExploreDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">{title}</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Explore our collection in this category.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Discover a carefully curated selection of audiobooks in our {title.toLowerCase()} section.
          </p>
          <p>
            Our expert team regularly updates this collection to bring you the best titles from around the world.
          </p>
          <p>
            Whether you're a longtime fan or new to this genre, you'll find something captivating to listen to.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExploreDialog;
