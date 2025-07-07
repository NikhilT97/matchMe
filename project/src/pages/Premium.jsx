import React from 'react';
import { Check, Star, Zap, Heart, Users, MessageCircle } from 'lucide-react';

const Premium = () => {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Unlimited Likes',
      description: 'Like as many profiles as you want without restrictions',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'See Who Likes You',
      description: 'Get a complete list of people who have liked your profile',
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Unlimited Messages',
      description: 'Send unlimited messages to all your matches',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Boost Your Profile',
      description: 'Get 10x more profile views with our boost feature',
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Advanced Filters',
      description: 'Filter by income, lifestyle, and more specific criteria',
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: 'Priority Support',
      description: 'Get priority customer support and faster response times',
    },
  ];

  const plans = [
    {
      name: 'Premium',
      price: '$29.99',
      period: '/ month',
      popular: false,
      features: [
        'Unlimited likes',
        'See who likes you',
        'Unlimited messages',
        'Profile boost once per month',
        'Advanced filters',
        'Priority support',
      ],
    },
    {
      name: 'Premium Plus',
      price: '$19.99',
      period: '/ month',
      popular: true,
      originalPrice: '$29.99',
      features: [
        'All Premium features',
        'Weekly profile boosts',
        'Read receipts',
        'Advanced compatibility insights',
        'VIP profile badge',
        'Personal matchmaker consultation',
      ],
    },
    {
      name: 'Premium Gold',
      price: '$39.99',
      period: '/ month',
      popular: false,
      features: [
        'All Premium Plus features',
        'Daily profile boosts',
        'See who viewed your profile',
        'Advanced personality insights',
        'Exclusive events access',
        'Personal dating coach',
      ],
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
              <Star className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited access to all features and find your perfect match faster than ever
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-pink-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-gray-500 line-through text-sm mt-1">
                      {plan.originalPrice} / month
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-pink-100 max-w-2xl mx-auto">
              Join thousands of premium members who found love on MatchMe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  J & S
                </div>
                <div>
                  <h4 className="font-semibold">John & Sarah</h4>
                  <p className="text-pink-100 text-sm">Married after 8 months</p>
                </div>
              </div>
              <p className="text-pink-100">
                "Premium features helped us connect instantly. The compatibility insights were spot on!"
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  M & L
                </div>
                <div>
                  <h4 className="font-semibold">Mike & Lisa</h4>
                  <p className="text-pink-100 text-sm">Engaged after 6 months</p>
                </div>
              </div>
              <p className="text-pink-100">
                "The advanced filters helped me find exactly what I was looking for. Best investment ever!"
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  R & E
                </div>
                <div>
                  <h4 className="font-semibold">Robert & Emma</h4>
                  <p className="text-pink-100 text-sm">Together for 2 years</p>
                </div>
              </div>
              <p className="text-pink-100">
                "Profile boosts got me 10x more matches. Found my soulmate within a month!"
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens to my matches if I downgrade?
              </h3>
              <p className="text-gray-600">
                Your existing matches will remain, but you'll be limited to the free plan's messaging and viewing restrictions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is my payment information secure?
              </h3>
              <p className="text-gray-600">
                Yes, we use industry-standard encryption and work with trusted payment processors to ensure your information is completely secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;