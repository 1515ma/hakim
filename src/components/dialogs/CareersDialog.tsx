
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CareersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CareersDialog = ({ open, onOpenChange }: CareersDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Careers at Hakim</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Join our team and help shape the future of audiobooks.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            At Hakim, we're passionate about connecting people with knowledge and stories through the power of audio.
          </p>
          <div className="border-t border-hakim-medium/20 pt-3 mt-3">
            <h3 className="text-hakim-light font-medium">Open Positions</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-hakim-gray">Senior React Developer (Remote)</li>
              <li className="text-sm text-hakim-gray">UX/UI Designer (Berlin)</li>
              <li className="text-sm text-hakim-gray">Content Marketing Specialist (Dubai)</li>
              <li className="text-sm text-hakim-gray">Audio Production Engineer (London)</li>
            </ul>
          </div>
          <p className="text-sm">
            To apply, please send your resume and cover letter to careers@hakim-audiobooks.com
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareersDialog;
