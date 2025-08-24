'use client';

import React, { useState, useEffect } from 'react';

// Shadcn/UI Components
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    domain: '',
    registrationNumber: '',
    year: '',
    degree: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const selectedDomain = sessionStorage.getItem('selectedDomain');
    if (selectedDomain) {
      setFormData((prev) => ({ ...prev, domain: selectedDomain }));
      sessionStorage.removeItem('selectedDomain');
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required!';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required!';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number!';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required!';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required!';
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required!';
    }
    if (!formData.year) newErrors.year = 'Please select your college year!';
    if (!formData.domain) newErrors.domain = 'Please choose your domain!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles changes for both standard inputs and shadcn selects
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setMessage('');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(
          `🎉 Welcome to GCSRM, ${formData.name}! 🎉\n\nDomain: ${formData.domain}\nYear: ${formData.year}\nEmail: ${formData.email}\n\nYour adventure begins now! 🚀`
        );
        setFormData({ name: '', phone: '', domain: '', registrationNumber: '', year: '', degree: '', email: '' });
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) =>
    `w-full text-sm sm:text-base border-2 sm:border-3 rounded focus:outline-none focus:ring-2 transition-all ${
      errors[fieldName] ? 'border-red-500 focus:ring-red-400' : 'border-black focus:ring-blue-400'
    } ${formData[fieldName] ? 'text-black' : 'text-gray-500'}`;

  return (
    <div
      id="registration-section"
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center py-12 lg:py-16 px-4 sm:px-6 lg:px-24"
      style={{ backgroundColor: '#33a1fd' }}
    >
      <style jsx>{`
        /* Super Mario Font Definition */
        @font-face {
          font-family: 'Super Mario 256';
          src: url('/fonts/SuperMario256.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        
        /* NEW: Diagonal slide-in animation */
        @keyframes slideInFromDiagonal {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
          }
        }
        
        .animate-slide-in-diagonal {
          animation: slideInFromDiagonal 0.8s ease-out forwards;
        }

        /* Mario-style font with text outline */
        .mario-font {
          font-family: 'Super Mario 256', sans-serif;
          color: #FFD93D;
          text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        }
        
        /* Floating clouds animation */
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-gentle-float {
          animation: gentleFloat 8s ease-in-out infinite;
        }

        /* Ensure placeholders in shadcn components are visible */
        [data-placeholder] { color: #6b7280 !important; }
      `}</style>
      
      {/* Floating Clouds */}
      <div className="absolute top-8 left-8 w-24 h-16 opacity-40 animate-gentle-float hidden sm:block">
        <div className="w-full h-full bg-white/30 rounded-full"></div>
      </div>
      <div
        className="absolute top-12 right-12 w-28 h-18 opacity-40 animate-gentle-float hidden sm:block"
        style={{ animationDelay: '2s' }}>
        <div className="w-full h-full bg-white/30 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl px-2 sm:px-4">
        
        <h1 className="mario-font text-4xl sm:text-5xl md:text-6xl text-center mb-6 sm:mb-8">
          Start Your Challenge
        </h1>
        
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto animate-slide-in-diagonal">
          <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg border-2 sm:border-3 md:border-4 border-black shadow-xl sm:shadow-2xl p-3 sm:p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              
              {/* Form Fields using Shadcn/UI */}
              <div>
                <Input type="text" name="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required className={inputClasses('name')} placeholder="Enter your full name" />
                {errors.name && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.name}</p>)}
              </div>
              <div>
                <Input type="tel" name="phone" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} required className={inputClasses('phone')} placeholder="Enter your phone number" />
                {errors.phone && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.phone}</p>)}
              </div>
              <div>
                <Input type="email" name="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required className={inputClasses('email')} placeholder="Enter your email address" />
                {errors.email && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.email}</p>)}
              </div>
              <div>
                <Input type="text" name="degree" value={formData.degree} onChange={(e) => handleChange('degree', e.target.value)} required className={inputClasses('degree')} placeholder="Degree (e.g. B.Tech - CSE)" />
                {errors.degree && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.degree}</p>)}
              </div>
              <div>
                <Input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={(e) => handleChange('registrationNumber', e.target.value)} required className={inputClasses('registrationNumber')} placeholder="Enter registration number" />
                {errors.registrationNumber && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.registrationNumber}</p>)}
              </div>

              {/* Year Select */}
              <div>
                <Select name="year" value={formData.year} onValueChange={(value) => handleChange('year', value)} required>
                  <SelectTrigger className={inputClasses('year')} style={{ backgroundColor: '#f6c100' }}><SelectValue placeholder="Select your year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                  </SelectContent>
                </Select>
                {errors.year && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.year}</p>)}
              </div>

              {/* Domain Select */}
              <div>
                <Select name="domain" value={formData.domain} onValueChange={(value) => handleChange('domain', value)} required>
                  <SelectTrigger className={inputClasses('domain')} style={{ backgroundColor: '#f4bb00' }}><SelectValue placeholder="Select your domain" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
                {errors.domain && (<p className="text-red-600 text-xs font-bold mt-1">❌ {errors.domain}</p>)}
              </div>
              
              {/* Submit Button */}
              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting} className={`w-full font-bold py-3 sm:py-3.5 px-4 rounded border-2 sm:border-3 border-black shadow-lg transition-all duration-200 text-sm sm:text-base ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 active:scale-95 transform hover:scale-105'}`} style={{ fontFamily: 'Arial Black, sans-serif', minHeight: '44px' }}>
                  {isSubmitting ? 'JOINING...' : 'JOIN THE ADVENTURE!'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success/Error Message Modal */}
      {message && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-4">{message}</pre>
              <Button onClick={() => setMessage('')} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Brick Ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 z-5 bg-gradient-to-b from-amber-600 to-amber-800"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 32px, rgba(0,0,0,0.1) 32px, rgba(0,0,0,0.1) 34px)',
          backgroundSize: '32px 100%',
        }}
      />
    </div>
  );
};

export default RegistrationForm;
