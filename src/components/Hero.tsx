
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Business Data, 
            <span className="text-brand-blue block md:inline"> Finally Decoded</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Turn your business spreadsheets and customer chats into 
            <span className="text-brand-blue font-semibold"> actionable insights</span> — 
            no technical expertise required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button className="w-full sm:w-auto bg-brand-orange hover:bg-opacity-90 text-white px-8 py-6 text-lg">
              Get Early Access
            </Button>
            <Button variant="outline" className="w-full sm:w-auto border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-6 text-lg">
              See How It Works
            </Button>
          </div>
          
          <div className="bg-gray-100 rounded-xl p-6 md:p-10 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-semibold text-brand-blue mb-4">Business Insights</h3>
                <p className="text-gray-600 mb-4">
                  "Your revenue dropped by 22% last month compared to the previous three-month average."
                </p>
                <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                  Upload any spreadsheet, get clear insights
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-semibold text-brand-blue mb-4">Customer Service Analytics</h3>
                <p className="text-gray-600 mb-4">
                  "25% of yesterday's WhatsApp messages were unanswered. Response time is slowest between 1-3pm."
                </p>
                <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                  Connect WhatsApp or upload chat history
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
