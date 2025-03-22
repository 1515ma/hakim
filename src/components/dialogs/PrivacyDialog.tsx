
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PrivacyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyDialog = ({ open, onOpenChange }: PrivacyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Privacy Policy</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            How we collect, use, and protect your personal information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">1. Information We Collect</strong><br />
            We collect information when you register for an account, make a purchase, or use our services. This may include your name, email address, payment information, and usage data.
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">2. How We Use Your Information</strong><br />
            We use the information we collect to:
            <br />- Provide, maintain, and improve our services
            <br />- Process transactions and send related information
            <br />- Send notifications, updates, and promotional content
            <br />- Respond to comments, questions, and customer service requests
            <br />- Analyze usage patterns and improve user experience
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">3. Information Sharing</strong><br />
            We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this policy.
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">4. Data Security</strong><br />
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">5. Your Choices</strong><br />
            You can access, update, or delete your account information at any time through your account settings. You may also opt-out of receiving promotional communications from us.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyDialog;
