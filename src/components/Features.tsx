
import { ArrowRight, FileSpreadsheet, MessageSquare, ChartBar, Clock, AlertTriangle, Lightbulb } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FileSpreadsheet className="h-8 w-8 text-brand-blue" />,
      title: "Spreadsheet Analysis",
      description: "Upload your financial reports, sales data, or inventory spreadsheets in XLSX or CSV format.",
      delay: "0.1s"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-brand-blue" />,
      title: "Chat Analytics",
      description: "Connect to WhatsApp Business API or upload chat logs to analyze customer conversations.",
      delay: "0.2s"
    },
    {
      icon: <ChartBar className="h-8 w-8 text-brand-blue" />,
      title: "Visual Reports",
      description: "View simple, easy-to-understand visualizations of your business performance.",
      delay: "0.3s"
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-blue" />,
      title: "Response Metrics",
      description: "Track average response times, peak hours, and conversation quality with customers.",
      delay: "0.4s"
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-brand-blue" />,
      title: "Alert Detection",
      description: "Get notified of important trends, outliers, or issues that need your attention.",
      delay: "0.5s"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-brand-blue" />,
      title: "Smart Suggestions",
      description: "Receive actionable recommendations to improve your business and customer service.",
      delay: "0.6s"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SmartBiz Whisper Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform turns complex data into clear, actionable insights without requiring any technical skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in" 
              style={{ animationDelay: feature.delay }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <a href="#" className="text-brand-blue font-medium flex items-center hover:underline group">
                Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gradient-to-r from-brand-blue to-brand-teal rounded-lg text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">No More Spreadsheet Confusion</h3>
            <p className="text-lg mb-6">
              Our AI analyzes your data and translates complex information into simple insights anyone can understand.
            </p>
            <div className="bg-white/10 p-6 rounded-md backdrop-blur-sm">
              <p className="text-xl italic">
                "Client X represents 38% of your revenue, which is a 12% increase from last quarter. This creates a potential business risk."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
