import { useState } from 'react';
import { cn } from '@/utils/cn';
import { states, categories } from '@/data/schemes';
import { validateProfile } from '@/utils/recommender';
import type { UserProfile } from '@/types';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading?: boolean;
}

export function UserProfileForm({ onSubmit, isLoading = false }: UserProfileFormProps) {
  const [formData, setFormData] = useState({
    state: '',
    age: '',
    annualIncome: '',
    category: '',
    gender: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: Partial<UserProfile> = {
      state: formData.state,
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      annualIncome: formData.annualIncome ? parseInt(formData.annualIncome, 10) : undefined,
      category: formData.category,
      gender: formData.gender as 'Male' | 'Female' | 'Other' | undefined
    };

    const validation = validateProfile(profile);
    
    if (!validation.isValid) {
      const errorMap: { [key: string]: string } = {};
      validation.errors.forEach(err => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return;
    }

    onSubmit(profile as UserProfile);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 bg-white";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Enter Your Profile</h2>
            <p className="text-blue-100 text-sm">Fill in your details to get personalized recommendations</p>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* State Selection */}
        <div>
          <label htmlFor="state" className={labelClasses}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              State / Union Territory
            </span>
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={cn(inputClasses, errors.state && "border-red-400 focus:border-red-500")}
          >
            <option value="">Select your state</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className={errorClasses}>{errors.state}</p>}
        </div>

        {/* Age and Gender Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className={labelClasses}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Age (in years)
              </span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              max="120"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className={cn(inputClasses, errors.age && "border-red-400 focus:border-red-500")}
            />
            {errors.age && <p className={errorClasses}>{errors.age}</p>}
          </div>

          <div>
            <label htmlFor="gender" className={labelClasses}>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Gender (Optional)
              </span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Annual Income */}
        <div>
          <label htmlFor="annualIncome" className={labelClasses}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Annual Income (in ₹)
            </span>
          </label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            min="0"
            placeholder="Enter your annual income (e.g., 200000)"
            value={formData.annualIncome}
            onChange={handleChange}
            className={cn(inputClasses, errors.annualIncome && "border-red-400 focus:border-red-500")}
          />
          {errors.annualIncome && <p className={errorClasses}>{errors.annualIncome}</p>}
          <p className="text-gray-500 text-xs mt-1">
            Enter total family annual income in rupees
          </p>
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="category" className={labelClasses}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Category / Area of Interest
            </span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={cn(inputClasses, errors.category && "border-red-400 focus:border-red-500")}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className={errorClasses}>{errors.category}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform",
            "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
            "hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5",
            "focus:outline-none focus:ring-4 focus:ring-blue-300",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
            "flex items-center justify-center gap-3"
          )}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Schemes...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Get AI Recommendations
            </>
          )}
        </button>
      </form>

      {/* Form Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        <p className="text-center text-gray-500 text-sm">
          🔒 Your information is secure and used only for scheme matching
        </p>
      </div>
    </div>
  );
}
