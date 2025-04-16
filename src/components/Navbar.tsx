
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message,
      });
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-brand-blue">
                SmartBiz<span className="text-brand-orange">Whisper</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Recursos</a>
              <a href="#personas" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Para Quem</a>
              <a href="#pricing" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Preços</a>
              <a href="#roadmap" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Roadmap</a>
              {user ? (
                <Button onClick={handleSignOut} variant="outline">Sair</Button>
              ) : (
                <Button onClick={() => navigate('/auth')} className="ml-4 bg-brand-orange hover:bg-opacity-90 text-white">
                  Entrar
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#features" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Recursos</a>
            <a href="#personas" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Para Quem</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Preços</a>
            <a href="#roadmap" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Roadmap</a>
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="w-full">Sair</Button>
            ) : (
              <Button onClick={() => navigate('/auth')} className="w-full bg-brand-orange hover:bg-opacity-90 text-white">
                Entrar
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
