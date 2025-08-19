import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Customer First',
      description: 'Your satisfaction and success are our top priorities in everything we do.'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in service quality and reliability.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'Global Perspective',
      description: 'Understanding diverse cultures and markets to serve you better worldwide.'
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: 'Teamwork',
      description: 'Collaborative partnerships that create value for all stakeholders.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '15+ years in international business and logistics'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Travel Services',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Travel industry expert with global destination knowledge'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Logistics Director',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Specialized in freight forwarding and supply chain management'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Nomad Travel and multiservices</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Connecting the world through exceptional travel experiences and reliable logistics solutions
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2010, Nomad Travel and multiservices began as a small travel agency with a big dream: 
                to make world-class travel and logistics services accessible to everyone. 
                What started with a single office has grown into a trusted global network.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the years, we've expanded our services to include comprehensive logistics 
                solutions, helping businesses move their goods as efficiently as we help 
                individuals explore the world.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to have served over 50,000 customers across 80+ countries, 
                building lasting relationships based on trust, reliability, and exceptional service.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Global network" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-6">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600">
                To provide seamless, reliable, and innovative travel and logistics solutions 
                that connect people, cultures, and businesses across the globe. We're committed 
                to making every journey—whether personal or commercial—a success story.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600">
                To be the world's most trusted partner in travel and logistics, recognized 
                for our unwavering commitment to customer satisfaction, operational excellence, 
                and innovative solutions that make global connectivity effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The experienced professionals behind your journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">
              What sets us apart in the travel and logistics industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-8 text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">80+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="bg-green-50 rounded-xl p-8 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Licensed & Insured</h3>
                <p className="text-gray-600 mb-4">
                  Fully licensed travel agency and freight forwarder with comprehensive 
                  insurance coverage for your peace of mind.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Expertise</h3>
                <p className="text-gray-600 mb-4">
                  Our team brings decades of combined experience in travel planning 
                  and international logistics management.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology-Driven</h3>
                <p className="text-gray-600 mb-4">
                  Advanced booking systems and tracking technology ensure efficient 
                  service delivery and real-time updates.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Service</h3>
                <p className="text-gray-600 mb-4">
                  Every client receives dedicated attention with customized solutions 
                  tailored to their unique needs and requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;