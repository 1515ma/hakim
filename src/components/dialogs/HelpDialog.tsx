
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const HelpDialog = ({ open, onOpenChange, title }: HelpDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">{title}</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Get help with your Hakim experience.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {title === "FAQ" && (
            <>
              <div className="border-b border-hakim-medium/20 pb-3">
                <h3 className="text-hakim-light font-medium">How do I download audiobooks?</h3>
                <p className="text-sm text-hakim-gray mt-2">Simply navigate to your library, select the book you want to download, and click the download button.</p>
              </div>
              <div className="border-b border-hakim-medium/20 pb-3">
                <h3 className="text-hakim-light font-medium">Can I listen offline?</h3>
                <p className="text-sm text-hakim-gray mt-2">Yes! Downloaded books are available offline for up to 30 days.</p>
              </div>
              <div className="pb-3">
                <h3 className="text-hakim-light font-medium">How do I cancel my subscription?</h3>
                <p className="text-sm text-hakim-gray mt-2">Go to your account settings and select "Manage Subscription" to cancel at any time.</p>
              </div>
            </>
          )}
          
          {title === "Terms of Service" && (
            <>
              <p>By using Hakim's services, you agree to these Terms of Service, effective as of January 1, 2024.</p>
              <p>Hakim provides a platform for accessing and listening to audiobooks on a subscription or purchase basis.</p>
              <p>All content available through Hakim is protected by copyright and other intellectual property laws.</p>
            </>
          )}
          
          {title === "Privacy Policy" && (
            <>
              <p>Hakim is committed to protecting your privacy and handling your data with transparency.</p>
              <p>We collect information necessary to provide our services, including account details, usage data, and payment information.</p>
              <p>Your data is never sold to third parties and is only shared with partners essential to providing our services.</p>
            </>
          )}
          
          {title === "Support" && (
            <>
              <p>Our support team is available 24/7 to help with any issues you might encounter.</p>
              <p>For fastest response, please include your account email and detailed description of the problem.</p>
              <p>You can reach us at support@hakim-audiobooks.com or through the in-app chat feature.</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
