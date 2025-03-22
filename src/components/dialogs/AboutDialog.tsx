
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">About Us</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Learn more about our company and mission.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Hakim Books was founded in 2023 with a simple mission: to make knowledge accessible to everyone, everywhere.
          </p>
          <p>
            Our platform brings together thousands of books and audiobooks from diverse authors and publishers around the world.
          </p>
          <p>
            We believe that reading is not just a pastime, but a transformative experience that can change lives, bridge cultural divides, and inspire innovation.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
