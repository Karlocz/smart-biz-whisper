
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for solo entrepreneurs just getting started.",
      features: [
        "Upload up to 5 spreadsheets/month",
        "Connect 1 WhatsApp Business account",
        "Basic business insights",
        "24-hour data refresh",
        "7-day data history"
      ],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      name: "Growth",
      price: "$79",
      description: "For growing businesses with more advanced needs.",
      features: [
        "Upload up to 20 spreadsheets/month",
        "Connect 3 WhatsApp Business accounts",
        "Advanced insights & recommendations",
        "4-hour data refresh",
        "30-day data history",
        "Email alerts for critical insights",
        "CSV export functionality"
      ],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Pro",
      price: "$149",
      description: "Full-featured solution for established businesses.",
      features: [
        "Unlimited spreadsheet uploads",
        "Connect up to 10 WhatsApp Business accounts",
        "Premium insights & trend analysis",
        "Real-time data refresh",
        "90-day data history",
        "Custom alert configurations",
        "API access",
        "Priority support"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl overflow-hidden shadow-lg animate-fade-in ${plan.highlight ? 'ring-2 ring-brand-blue relative' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlight && (
                <div className="bg-brand-blue text-white py-1 px-4 text-center text-sm font-medium">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-brand-blue">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-brand-orange hover:bg-opacity-90' : 'bg-brand-blue hover:bg-opacity-90'} text-white mb-6`}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need a custom plan for your specific requirements?</p>
          <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
