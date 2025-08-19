import React from 'react';
import { Plane, MapPin, Hotel, FileText, Truck, Package, Globe, Shield, Clock, Users } from 'lucide-react';

const Services = () => {
  const travelServices = [
    {
      icon: <Plane className="h-8 w-8 text-blue-600" />,
      title: 'Custom Tour Packages',
      description: 'Personalized itineraries designed around your interests, budget, and schedule. From adventure tours to luxury getaways.',
      features: ['Tailored itineraries', 'Local guide arrangements', 'Group & solo travel options', 'Cultural experiences']
    },
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: 'Flight Booking',
      description: 'Best deals on domestic and international flights with flexible booking options and 24/7 support.',
      features: ['Competitive prices', 'Multi-city options', 'Seat selection', 'Travel insurance']
    },
    {
      icon: <Hotel className="h-8 w-8 text-blue-600" />,
      title: 'Hotel Reservations',
      description: 'Wide selection of accommodations from budget-friendly to luxury hotels worldwide.',
      features: ['Best rate guarantee', 'Instant confirmation', 'Cancellation protection', 'Special requests handling']
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: 'Visa Assistance',
      description: 'Complete visa processing support including documentation, application submission, and tracking.',
      features: ['Document preparation', 'Application guidance', 'Status tracking', 'Expedited processing']
    }
  ];

  const logisticsServices = [
    {
      icon: <Package className="h-8 w-8 text-teal-600" />,
      title: 'Cargo Shipping',
      description: 'Reliable sea, air, and land freight services for cargo of all sizes to destinations worldwide.',
      features: ['Multiple shipping modes', 'Door-to-door service', 'Cargo insurance', 'Real-time tracking']
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      title: 'Freight Forwarding',
      description: 'End-to-end logistics coordination including route planning, carrier selection, and documentation.',
      features: ['Route optimization', 'Multi-modal transport', 'Cost-effective solutions', 'Global network']
    },
    {
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      title: 'Customs Clearance',
      description: 'Expert handling of import/export documentation and customs procedures to ensure smooth clearance.',
      features: ['Import/export permits', 'Duty calculation', 'Compliance management', 'Document preparation']
    },
    {
      icon: <Truck className="h-8 w-8 text-teal-600" />,
      title: 'Transportation',
      description: 'Local and regional transportation services including last-mile delivery and warehousing.',
      features: ['Local delivery', 'Warehousing', 'Distribution', 'Supply chain management']
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your travel and logistics needs'
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: 'Fully Insured',
      description: 'Comprehensive coverage for your peace of mind'
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Expert Team',
      description: 'Experienced professionals handling every detail'
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: 'Global Network',
      description: 'Partnerships worldwide ensuring reliable service'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Comprehensive travel and logistics solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Travel Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Travel Services</h2>
            <p className="text-xl text-gray-600">
              Creating unforgettable travel experiences around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-4 mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Logistics Services</h2>
            <p className="text-xl text-gray-600">
              Efficient and reliable logistics solutions for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logisticsServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-teal-100 rounded-full p-4 mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Our Services Stand Out</h2>
            <p className="text-xl text-gray-600">
              The advantages of choosing Nomad Travel and multiservices for your travel and logistics needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-xl text-gray-600">
              Our streamlined process ensures efficient service delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">We understand your specific requirements and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">Custom solution design with detailed planning and coordination</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Execution</h3>
              <p className="text-gray-600">Professional implementation with continuous monitoring</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">Ongoing assistance and follow-up to ensure satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us help you plan your next journey or streamline your logistics operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Book Travel
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Request Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;