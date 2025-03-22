
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Contact Us</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Have questions or feedback? Reach out to our team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-hakim-gray mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 bg-hakim-dark border border-hakim-medium/20 rounded-md text-hakim-light"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-hakim-gray mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-hakim-dark border border-hakim-medium/20 rounded-md text-hakim-light"
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-hakim-gray mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-2 bg-hakim-dark border border-hakim-medium/20 rounded-md text-hakim-light"
              placeholder="Your message"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
