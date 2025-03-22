
import { Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const LoginPrompt = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 p-6 bg-hakim-dark/20 rounded-xl border border-hakim-medium/20 text-center"
    >
      <div className="w-12 h-12 rounded-full bg-hakim-medium/10 flex items-center justify-center mx-auto mb-3">
        <Lock className="h-5 w-5 text-hakim-light" />
      </div>
      <h3 className="text-lg font-medium mb-2">Member-only content</h3>
      <p className="text-foreground/70 mb-6 max-w-md mx-auto">
        Sign in to access our extensive audiobook library, including previews, ratings, and more.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="default" onClick={handleLogin} className="px-6">
          Login
        </Button>
        <Button variant="outline" onClick={() => navigate('/signup')} className="px-6">
          Sign Up
        </Button>
      </div>
    </motion.div>
  );
};

export default LoginPrompt;
