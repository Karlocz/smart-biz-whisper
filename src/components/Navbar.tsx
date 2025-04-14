
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0">
              <span className="text-xl font-bold text-brand-blue">
                SmartBiz<span className="text-brand-orange">Whisper</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#features" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#personas" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Who It's For</a>
              <a href="#pricing" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
              <a href="#roadmap" className="text-gray-600 hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium">Roadmap</a>
              <Button className="ml-4 bg-brand-orange hover:bg-opacity-90 text-white">Get Early Access</Button>
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
            <a href="#features" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#personas" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Who It's For</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
            <a href="#roadmap" className="text-gray-600 hover:text-brand-blue block px-3 py-2 rounded-md text-base font-medium">Roadmap</a>
            <Button className="mt-2 w-full bg-brand-orange hover:bg-opacity-90 text-white">Get Early Access</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
