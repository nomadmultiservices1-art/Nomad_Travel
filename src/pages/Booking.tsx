import React, { useState } from 'react';
import { Plane, Truck, Calendar, Users, MapPin, Package } from 'lucide-react';

const Booking = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [travelForm, setTravelForm] = useState({
    destination: '',
    departure: '',
    return: '',
    travelers: '1',
    travelType: '',
    budget: '',
    preferences: ''
  });
  const [logisticsForm, setLogisticsForm] = useState({
    origin: '',
    destination: '',
    cargoType: '',
    weight: '',
    dimensions: '',
    value: '',
    shipping: '',
    urgency: '',
    description: ''
  });

  const handleTravelInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTravelForm({
      ...travelForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLogisticsInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLogisticsForm({
      ...logisticsForm,
      [e.target.name]: e.target.value
    });
  };

  const handleTravelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Travel booking submitted:', travelForm);
    alert('Thank you for your travel booking request! We\'ll contact you within 2 hours with a customized itinerary and pricing.');
    setTravelForm({
      destination: '',
      departure: '',
      return: '',
      travelers: '1',
      travelType: '',
      budget: '',
      preferences: ''
    });
  };

  const handleLogisticsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logistics quote submitted:', logisticsForm);
    alert('Thank you for your logistics quote request! Our team will provide you with a detailed quote within 24 hours.');
    setLogisticsForm({
      origin: '',
      destination: '',
      cargoType: '',
      weight: '',
      dimensions: '',
      value: '',
      shipping: '',
      urgency: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Journey</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Start your next adventure or request a logistics quote - we're here to make it happen
          </p>
        </div>
      </section>

      {/* Booking Tabs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => setActiveTab('travel')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'travel' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Plane className="h-5 w-5 mr-2" />
                Travel Booking
              </button>
              <button
                onClick={() => setActiveTab('logistics')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ml-2 ${
                  activeTab === 'logistics' 
                    ? 'bg-teal-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Truck className="h-5 w-5 mr-2" />
                Logistics Quote
              </button>
            </div>
          </div>

          {/* Travel Booking Form */}
          {activeTab === 'travel' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Travel Booking Request</h2>
                  <p className="text-gray-600">Tell us about your dream destination and preferences</p>
                </div>
              </div>

              <form onSubmit={handleTravelSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Destination *
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      required
                      value={travelForm.destination}
                      onChange={handleTravelInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Tokyo, Japan"
                    />
                  </div>
                  <div>
                    <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Type *
                    </label>
                    <select
                      id="travelType"
                      name="travelType"
                      required
                      value={travelForm.travelType}
                      onChange={handleTravelInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select travel type</option>
                      <option value="leisure">Leisure/Vacation</option>
                      <option value="business">Business Travel</option>
                      <option value="adventure">Adventure Tour</option>
                      <option value="cultural">Cultural Experience</option>
                      <option value="luxury">Luxury Travel</option>
                      <option value="family">Family Trip</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Departure Date *
                    </label>
                    <input
                      type="date"
                      id="departure"
                      name="departure"
                      required
                      value={travelForm.departure}
                      onChange={handleTravelInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Return Date
                    </label>
                    <input
                      type="date"
                      id="return"
                      name="return"
                      value={travelForm.return}
                      onChange={handleTravelInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Number of Travelers *
                    </label>
                    <select
                      id="travelers"
                      name="travelers"
                      required
                      value={travelForm.travelers}
                      onChange={handleTravelInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Traveler' : 'Travelers'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range (per person)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={travelForm.budget}
                    onChange={handleTravelInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="over-10000">Over $10,000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Preferences & Requirements
                  </label>
                  <textarea
                    id="preferences"
                    name="preferences"
                    rows={4}
                    value={travelForm.preferences}
                    onChange={handleTravelInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about any special requirements, interests, dietary restrictions, accessibility needs, or preferences..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  <Plane className="mr-2 h-5 w-5" />
                  Request Travel Booking
                </button>
              </form>
            </div>
          )}

          {/* Logistics Quote Form */}
          {activeTab === 'logistics' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 rounded-full p-3 mr-4">
                  <Truck className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Logistics Quote Request</h2>
                  <p className="text-gray-600">Get a customized quote for your shipping needs</p>
                </div>
              </div>

              <form onSubmit={handleLogisticsSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Origin (From) *
                    </label>
                    <input
                      type="text"
                      id="origin"
                      name="origin"
                      required
                      value={logisticsForm.origin}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="City, Country or Port"
                    />
                  </div>
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Destination (To) *
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      required
                      value={logisticsForm.destination}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="City, Country or Port"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cargoType" className="block text-sm font-medium text-gray-700 mb-2">
                      <Package className="inline h-4 w-4 mr-1" />
                      Cargo Type *
                    </label>
                    <select
                      id="cargoType"
                      name="cargoType"
                      required
                      value={logisticsForm.cargoType}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select cargo type</option>
                      <option value="general">General Cargo</option>
                      <option value="electronics">Electronics</option>
                      <option value="textiles">Textiles & Clothing</option>
                      <option value="machinery">Machinery & Equipment</option>
                      <option value="automotive">Automotive Parts</option>
                      <option value="food">Food & Beverages</option>
                      <option value="chemicals">Chemicals</option>
                      <option value="furniture">Furniture</option>
                      <option value="documents">Documents</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                      Total Weight *
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      required
                      value={logisticsForm.weight}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., 500 kg or 1,200 lbs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions (L x W x H)
                    </label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      value={logisticsForm.dimensions}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., 120 x 80 x 100 cm"
                    />
                  </div>
                  <div>
                    <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo Value (USD)
                    </label>
                    <input
                      type="text"
                      id="value"
                      name="value"
                      value={logisticsForm.value}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., $5,000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="shipping" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Shipping Method *
                    </label>
                    <select
                      id="shipping"
                      name="shipping"
                      required
                      value={logisticsForm.shipping}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select shipping method</option>
                      <option value="sea">Sea Freight</option>
                      <option value="air">Air Freight</option>
                      <option value="land">Land Transportation</option>
                      <option value="multimodal">Multimodal</option>
                      <option value="courier">Express Courier</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level *
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      required
                      value={logisticsForm.urgency}
                      onChange={handleLogisticsInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select urgency</option>
                      <option value="standard">Standard (4-6 weeks)</option>
                      <option value="expedited">Expedited (2-3 weeks)</option>
                      <option value="urgent">Urgent (1-2 weeks)</option>
                      <option value="emergency">Emergency (3-7 days)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={logisticsForm.description}
                    onChange={handleLogisticsInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Provide any additional information about special handling requirements, packaging needs, customs considerations, etc."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  <Truck className="mr-2 h-5 w-5" />
                  Request Logistics Quote
                </button>
              </form>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Travel Services Include:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Custom itinerary planning</li>
                <li>• Flight and hotel booking</li>
                <li>• Visa and documentation assistance</li>
                <li>• Travel insurance options</li>
                <li>• 24/7 travel support</li>
                <li>• Local guide arrangements</li>
              </ul>
            </div>
            <div className="bg-teal-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Logistics Services Include:</h3>
              <ul className="space-y-2 text-teal-800">
                <li>• Door-to-door delivery</li>
                <li>• Customs clearance assistance</li>
                <li>• Cargo insurance options</li>
                <li>• Real-time tracking</li>
                <li>• Packaging and handling</li>
                <li>• Documentation support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;