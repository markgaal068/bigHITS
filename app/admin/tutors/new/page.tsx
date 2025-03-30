'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

interface TutorFormData {
  name: string;
  slug: string;
  bio: string;
  expertise: string;
  rate: string;
  calendlyLink: string;
  availability: string[];
  profileImage: string;
  published: boolean;
  featured: boolean;
}

const availabilityOptions = [
  { id: 'mon', label: 'Monday' },
  { id: 'tue', label: 'Tuesday' },
  { id: 'wed', label: 'Wednesday' },
  { id: 'thu', label: 'Thursday' },
  { id: 'fri', label: 'Friday' },
  { id: 'sat', label: 'Saturday' },
  { id: 'sun', label: 'Sunday' },
];

const expertiseOptions = [
  'Digital Marketing',
  'SEO',
  'Web Development',
  'JavaScript',
  'Business Strategy',
  'Entrepreneurship',
  'Content Marketing',
  'Social Media',
  'E-commerce',
  'Shopify',
  'Product Management',
  'UX Design'
];

const AddNewTutorPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState<TutorFormData>({
    name: '',
    slug: '',
    bio: '',
    expertise: '',
    rate: '',
    calendlyLink: '',
    availability: [],
    profileImage: '',
    published: false,
    featured: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check authentication
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/');
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      setFormData(prevData => ({
        ...prevData,
        slug
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.startsWith('day-')) {
      const day = name.replace('day-', '');
      if (checked) {
        setFormData(prevData => ({
          ...prevData,
          availability: [...prevData.availability, day]
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          availability: prevData.availability.filter(d => d !== day)
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    
    const expertiseValue = selectedOptions.join(', ');
    
    setFormData(prevData => ({
      ...prevData,
      [name]: expertiseValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate form
      if (!formData.name || !formData.bio || !formData.expertise || !formData.rate) {
        throw new Error('Please fill in all required fields');
      }

      // Validate rate
      if (isNaN(parseFloat(formData.rate)) || parseFloat(formData.rate) <= 0) {
        throw new Error('Rate must be a positive number');
      }

      // Validate calendly link format if provided
      if (formData.calendlyLink && !formData.calendlyLink.includes('calendly.com')) {
        throw new Error('Please enter a valid Calendly link');
      }

      // In a real application, this would be an API call to save the tutor
      // Mock successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to tutor list page
      router.push('/admin/tutors');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex items-center">
            <Link href="/admin/tutors" className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Tutors
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Add New Tutor</h1>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Tutor Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 required">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                {/* Slug */}
                <div className="md:col-span-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 required">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">URL-friendly version of the name (automatically generated)</p>
                </div>
                
                {/* Bio */}
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 required">
                    Bio <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={5}
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Professional bio and qualifications..."
                  />
                </div>
                
                {/* Expertise */}
                <div className="md:col-span-2">
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 required">
                    Expertise <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expertise"
                    id="expertise"
                    value={formData.expertise ? formData.expertise.split(', ') : []}
                    onChange={handleMultiSelectChange}
                    required
                    multiple
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    size={5}
                  >
                    {expertiseOptions.map(expertise => (
                      <option key={expertise} value={expertise}>{expertise}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd key to select multiple areas of expertise</p>
                </div>
                
                {/* Rate */}
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-700 required">
                    Hourly Rate ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="rate"
                      id="rate"
                      value={formData.rate}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                {/* Profile Image */}
                <div>
                  <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    name="profileImage"
                    id="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                {/* Calendly Link */}
                <div className="md:col-span-2">
                  <label htmlFor="calendlyLink" className="block text-sm font-medium text-gray-700">
                    Calendly Link
                  </label>
                  <input
                    type="text"
                    name="calendlyLink"
                    id="calendlyLink"
                    value={formData.calendlyLink}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="https://calendly.com/yourusername"
                  />
                  <p className="mt-1 text-xs text-gray-500">Link for scheduling sessions</p>
                </div>
                
                {/* Availability */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Days
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {availabilityOptions.map(option => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={`day-${option.id}`}
                          name={`day-${option.id}`}
                          type="checkbox"
                          checked={formData.availability.includes(option.id)}
                          onChange={handleCheckboxChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor={`day-${option.id}`} className="ml-2 block text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Published Status */}
                <div className="flex items-start md:col-span-1">
                  <div className="flex items-center h-5">
                    <input
                      id="published"
                      name="published"
                      type="checkbox"
                      checked={formData.published}
                      onChange={handleCheckboxChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="published" className="font-medium text-gray-700">Published</label>
                    <p className="text-gray-500">If unchecked, the tutor will be saved as a draft</p>
                  </div>
                </div>
                
                {/* Featured Status */}
                <div className="flex items-start md:col-span-1">
                  <div className="flex items-center h-5">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="featured" className="font-medium text-gray-700">Featured</label>
                    <p className="text-gray-500">If checked, the tutor will be showcased on the homepage</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end space-x-3">
              <Link
                href="/admin/tutors"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewTutorPage; 