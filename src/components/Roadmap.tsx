
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Roadmap = () => {
  const phases = [
    {
      id: "mvp",
      title: "MVP Launch",
      timeline: "Q2 2025",
      features: [
        "Spreadsheet upload & basic financial analysis",
        "WhatsApp chat log import functionality",
        "Simple, text-based business insights",
        "Customer service response time metrics",
        "Basic web dashboard",
        "Early access for beta testers"
      ]
    },
    {
      id: "growth",
      title: "Growth Phase",
      timeline: "Q3-Q4 2025",
      features: [
        "Direct WhatsApp Business API integration",
        "Enhanced visualization dashboard",
        "Email and SMS alerts for critical insights",
        "Customer sentiment analysis",
        "Conversation quality scoring",
        "Custom reporting options",
        "Mobile app launch (iOS & Android)"
      ]
    },
    {
      id: "expansion",
      title: "Expansion",
      timeline: "2026",
      features: [
        "Additional messaging platform integrations (Messenger, Instagram)",
        "Business intelligence API for third-party apps",
        "Advanced predictive analytics",
        "Industry-specific insight templates",
        "Team collaboration features",
        "White-label solution for agencies",
        "Enterprise security and compliance features"
      ]
    }
  ];

  const monetization = [
    {
      strategy: "Subscription Model",
      description: "Tiered monthly plans based on usage volume and feature access (Starter, Growth, Pro)."
    },
    {
      strategy: "Usage-Based Add-ons",
      description: "Pay for additional spreadsheet uploads or connected accounts beyond plan limits."
    },
    {
      strategy: "White-label & Agency Program",
      description: "Reseller program for consultants and agencies to offer to their clients."
    },
    {
      strategy: "Enterprise Customization",
      description: "Custom solutions and integrations for larger businesses with specific needs."
    },
    {
      strategy: "Industry Vertical Solutions",
      description: "Specialized versions with industry-specific metrics and benchmarks at premium prices."
    }
  ];

  return (
    <section id="roadmap" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Product Roadmap & Growth Strategy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our vision for SmartBiz Whisper and how we plan to grow and evolve the platform.
          </p>
        </div>
        
        <Tabs defaultValue="mvp" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mvp">MVP Launch</TabsTrigger>
            <TabsTrigger value="growth">Growth Phase</TabsTrigger>
            <TabsTrigger value="expansion">Expansion</TabsTrigger>
          </TabsList>
          {phases.map(phase => (
            <TabsContent key={phase.id} value={phase.id} className="mt-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{phase.title}</h3>
                    <p className="text-brand-blue font-medium">{phase.timeline}</p>
                  </div>
                  <div className="mt-4 md:mt-0 px-4 py-2 bg-brand-blue/10 rounded-full text-brand-blue font-medium">
                    Phase {phases.findIndex(p => p.id === phase.id) + 1}
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {phase.features.map((feature, index) => (
                    <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <div className="bg-brand-teal text-white p-1 rounded-full mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Monetization Strategy</h3>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {monetization.map((item, index) => (
                <div key={index} className="border-l-4 border-brand-blue pl-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.strategy}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
