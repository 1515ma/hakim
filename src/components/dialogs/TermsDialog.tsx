
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsDialog = ({ open, onOpenChange }: TermsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Terms of Service</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Please read these terms carefully before using our service.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">1. Acceptance of Terms</strong><br />
            By accessing and using Hakim Books, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">2. Use License</strong><br />
            Permission is granted to temporarily access the materials on Hakim Books for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license, you may not:
            <br />- Modify or copy the materials
            <br />- Use the materials for any commercial purpose
            <br />- Remove any copyright or other proprietary notations from the materials
            <br />- Transfer the materials to another person or "mirror" the materials on any other server
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">3. Disclaimer</strong><br />
            The materials on Hakim Books are provided on an 'as is' basis. Hakim Books makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
          </p>
          
          <p className="text-sm text-hakim-gray">
            <strong className="text-hakim-light">4. Limitations</strong><br />
            In no event shall Hakim Books or its suppliers be liable for any damages arising out of the use or inability to use the materials on Hakim Books.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
