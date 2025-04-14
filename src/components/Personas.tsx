
import { Card, CardContent } from "@/components/ui/card";
import { User2, Building, Store, HeartPulse, ShoppingBag } from "lucide-react";

const Personas = () => {
  const personas = [
    {
      icon: <User2 className="h-10 w-10 text-brand-teal" />,
      title: "Solo Entrepreneurs",
      description: "Small business owners who manage everything themselves and need quick insights without technical skills.",
      pain: "Too busy for complex data analysis but needs to make informed decisions.",
      gain: "Gets clear business insights in plain language without learning data tools."
    },
    {
      icon: <Store className="h-10 w-10 text-brand-teal" />,
      title: "Retail Store Owners",
      description: "Shop owners who need to track inventory, sales trends, and customer service quality.",
      pain: "Overwhelmed by spreadsheets and customer messages across multiple channels.",
      gain: "Understands exactly what's selling, what's not, and how to improve customer experience."
    },
    {
      icon: <Building className="h-10 w-10 text-brand-teal" />,
      title: "Service Businesses",
      description: "Professional service providers who need to monitor client relationships and business health.",
      pain: "Struggles to track client satisfaction and identify service improvements.",
      gain: "Receives alerts about client concerns and suggestions to improve service delivery."
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-brand-teal" />,
      title: "Health & Wellness Providers",
      description: "Clinics and practitioners managing patient schedules, finances, and communications.",
      pain: "Limited time for administrative tasks and data analysis between appointments.",
      gain: "Quickly understands practice metrics and improves patient communication."
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-brand-teal" />,
      title: "E-commerce Sellers",
      description: "Online retailers tracking inventory, sales, shipping, and customer support across platforms.",
      pain: "Struggles to connect financial data with customer service metrics.",
      gain: "Identifies trends and opportunities from sales and customer conversations."
    }
  ];

  return (
    <section id="personas" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who Benefits Most</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SmartBiz Whisper is designed for business owners who know their data contains valuable insights, but don't have the time or technical skill to extract them.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-brand-lightBlue/10 p-3 rounded-full mr-4">
                    {persona.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{persona.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{persona.description}</p>
                <div className="bg-red-50 p-4 rounded-md mb-3">
                  <p className="text-red-700"><span className="font-semibold">Pain:</span> {persona.pain}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-700"><span className="font-semibold">Gain:</span> {persona.gain}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Competitive Advantage</h3>
          <div className="bg-brand-blue/5 rounded-lg p-6">
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <div className="bg-brand-blue text-white p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p><span className="font-semibold">No technical skills required</span> - Unlike BI tools that need data expertise, we translate everything into plain language</p>
              </li>
              <li className="flex items-start">
                <div className="bg-brand-blue text-white p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p><span className="font-semibold">Two-in-one solution</span> - Combines business analytics with customer service metrics, breaking down data silos</p>
              </li>
              <li className="flex items-start">
                <div className="bg-brand-blue text-white p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p><span className="font-semibold">No new workflows</span> - Uses data you already have (spreadsheets, chat logs) without requiring new processes</p>
              </li>
              <li className="flex items-start">
                <div className="bg-brand-blue text-white p-1 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p><span className="font-semibold">Actionable suggestions</span> - Doesn't just show data, but provides clear recommendations on what to do next</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personas;
