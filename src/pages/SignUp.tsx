
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!terms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = register(email, password, name);
      if (success) {
        toast({
          title: "Sign up successful",
          description: "You have successfully signed up.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="bg-hakim-dark/30 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-hakim-light mb-6">
            {t('createAccount')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-hakim-light">
                {t('name')}
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder={t('yourName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-hakim-gray" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-hakim-light">
                {t('email')}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder={t('yourEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-hakim-gray" />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-hakim-light">
                {t('password')}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder={t('yourPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-hakim-gray" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={terms} 
                onCheckedChange={(checked) => setTerms(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm text-hakim-light cursor-pointer">
                {t('iAgreeToThe')} <Link to="/terms" className="text-primary">{t('termsOfService')}</Link>
              </Label>
            </div>
            <Button className="w-full" type="submit">
              {t('signUp')}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-hakim-gray">{t('alreadyHaveAnAccount')}?</span>
            <Link to="/login" className="text-sm text-primary hover:underline ml-1">
              {t('signIn')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
