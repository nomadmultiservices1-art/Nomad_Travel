import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Truck, MapPin, Star, ArrowRight, Users, Globe, Shield } from 'lucide-react';

const Home = () => {
  const destinations = [
    { name: 'Tokyo, Japan', image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$1,299' },
    { name: 'Paris, France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$899' },
    { name: 'Bali, Indonesia', image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$1,099' },
  ];

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: 'Global Reach',
      description: 'Connecting destinations worldwide with our extensive network'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Expert Team',
      description: '24/7 support from experienced travel and logistics professionals'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Secure & Reliable',
      description: 'Licensed and insured services you can trust'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Gateway to the World
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Seamless travel experiences and reliable logistics solutions, 
            connecting people and businesses globally
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Book Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel & Logistics Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're planning your next adventure or shipping cargo across continents, 
              we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-4">
                  <Plane className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Travel Services</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Tour Packages & Custom Itineraries</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Flight & Hotel Booking</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Visa Assistance & Documentation</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Travel Insurance & Support</li>
              </ul>
              <Link 
                to="/services" 
                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 rounded-full p-4">
                  <Truck className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Logistics Services</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Cargo Shipping & Freight Forwarding</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Customs Clearance & Documentation</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Warehousing & Distribution</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Transportation & Delivery</li>
              </ul>
              <Link 
                to="/services" 
                className="text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing places with our curated travel packages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">From {destination.price}</span>
                    <Link 
                      to="/booking" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GlobalMove?
            </h2>
            <p className="text-xl text-gray-600">
              We're committed to making your journey seamless and successful
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to begin planning your next adventure or to discuss 
            your logistics requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;