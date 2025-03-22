
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface FaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FaqDialog = ({ open, onOpenChange }: FaqDialogProps) => {
  const faqItems = [
    {
      question: "How does the subscription work?",
      answer: "Our subscription gives you unlimited access to our entire library of audiobooks. You can listen to as many titles as you want, anytime, anywhere."
    },
    {
      question: "Can I download audiobooks for offline listening?",
      answer: "Yes, you can download any audiobook to listen offline on your mobile device. Just look for the download button on the book details page."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Your subscription will remain active until the end of your current billing period."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 30-day free trial for new users. You'll need to provide payment details, but we won't charge you until your trial ends."
    },
    {
      question: "What devices can I use to listen?",
      answer: "You can listen on any device with a web browser, or download our apps for iOS and Android devices."
    }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-hakim-darkest text-hakim-light border-hakim-medium/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hakim-light">Frequently Asked Questions</DialogTitle>
          <DialogDescription className="text-hakim-gray">
            Find answers to commonly asked questions about Hakim Books.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-hakim-medium/20 pb-3 last:border-b-0">
              <h3 className="text-hakim-light font-medium">{item.question}</h3>
              <p className="text-sm text-hakim-gray mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FaqDialog;
