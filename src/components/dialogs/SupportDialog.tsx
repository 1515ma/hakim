
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupportDialog = ({ open, onOpenChange }: SupportDialogProps) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request submitted",
      description: "Our team will get back to you shortly.",
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Customer Support</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            How can we help you today?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="text-hakim-gray hover:text-hakim-light">
              Billing Issues
            </Button>
            <Button variant="outline" className="text-hakim-gray hover:text-hakim-light">
              Technical Support
            </Button>
            <Button variant="outline" className="text-hakim-gray hover:text-hakim-light">
              Account Help
            </Button>
            <Button variant="outline" className="text-hakim-gray hover:text-hakim-light">
              Content Issues
            </Button>
          </div>
          
          <div className="pt-4 border-t border-hakim-medium/20">
            <p className="text-sm text-hakim-gray mb-4">
              Can't find what you're looking for? Submit a request and our support team will assist you.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-hakim-gray mb-1">
                  Describe your issue
                </label>
                <textarea
                  id="issue"
                  rows={3}
                  className="w-full p-2 bg-hakim-dark border border-hakim-medium/20 rounded-md text-hakim-light"
                  placeholder="Please provide details about your issue..."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;
