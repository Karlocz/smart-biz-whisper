
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-teal text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Drowning in Data, Start Making Smarter Decisions
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join the waitlist today and be among the first to experience how SmartBiz Whisper can transform your business data into actionable insights.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-brand-orange hover:bg-opacity-90 text-white px-6 py-3">
                Join Waitlist
              </Button>
            </div>
            <p className="text-sm text-white/70">
              By signing up, you'll receive updates about our launch and exclusive early access offers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
