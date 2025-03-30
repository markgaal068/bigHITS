'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, ChevronUp, ChevronDown, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface Tutor {
  id: string;
  name: string;
  expertise: string;
  rate: number;
  rating: number;
  availability: string;
  published: boolean;
  createdAt: string;
  slug: string;
}

const TutorsAdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Tutor>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    // Check authentication
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/');
      } else {
        fetchTutors();
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router]);
  
  const fetchTutors = async () => {
    try {
      // In a real application, this would be an API call to get tutors
      // Mock data fetch with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock tutor data
      const mockTutors: Tutor[] = [
        {
          id: '1',
          name: 'John Smith',
          expertise: 'Digital Marketing, SEO',
          rate: 75,
          rating: 4.8,
          availability: 'Mon, Wed, Fri',
          published: true,
          createdAt: '2023-06-10T08:30:00Z',
          slug: 'john-smith'
        },
        {
          id: '2',
          name: 'Emma Johnson',
          expertise: 'Web Development, JavaScript',
          rate: 85,
          rating: 4.9,
          availability: 'Tue, Thu, Sat',
          published: true,
          createdAt: '2023-06-15T10:15:00Z',
          slug: 'emma-johnson'
        },
        {
          id: '3',
          name: 'Michael Williams',
          expertise: 'Business Strategy, Entrepreneurship',
          rate: 95,
          rating: 4.7,
          availability: 'Mon, Tue, Wed, Thu, Fri',
          published: true,
          createdAt: '2023-06-18T14:00:00Z',
          slug: 'michael-williams'
        },
        {
          id: '4',
          name: 'Sophia Garcia',
          expertise: 'Content Marketing, Social Media',
          rate: 70,
          rating: 4.6,
          availability: 'Wed, Thu, Fri, Sat',
          published: true,
          createdAt: '2023-06-20T09:45:00Z',
          slug: 'sophia-garcia'
        },
        {
          id: '5',
          name: 'James Wilson',
          expertise: 'E-commerce, Shopify',
          rate: 80,
          rating: 4.5,
          availability: 'Mon, Wed, Fri, Sat',
          published: false,
          createdAt: '2023-06-22T11:30:00Z',
          slug: 'james-wilson'
        },
        {
          id: '6',
          name: 'Olivia Brown',
          expertise: 'Product Management, UX Design',
          rate: 90,
          rating: 4.9,
          availability: 'Tue, Thu, Sat, Sun',
          published: true,
          createdAt: '2023-06-25T13:20:00Z',
          slug: 'olivia-brown'
        }
      ];
      
      setTutors(mockTutors);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      setLoading(false);
    }
  };
  
  const handleSort = (field: keyof Tutor) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleTogglePublish = async (id: string) => {
    // In a real app, this would be an API call to toggle the published status
    setTutors(prevTutors => {
      return prevTutors.map(tutor => {
        if (tutor.id === id) {
          return {
            ...tutor,
            published: !tutor.published
          };
        }
        return tutor;
      });
    });
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tutor?')) {
      // In a real app, this would be an API call to delete the tutor
      setTutors(prevTutors => {
        return prevTutors.filter(tutor => tutor.id !== id);
      });
    }
  };
  
  const filteredTutors = tutors.filter(tutor => {
    return (
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.rate.toString().includes(searchTerm) ||
      tutor.availability.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const sortedTutors = [...filteredTutors].sort((a, b) => {
    if (sortField === 'rate' || sortField === 'rating') {
      return sortDirection === 'asc'
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      return sortDirection === 'asc'
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]));
    }
  });
  
  if (status === 'loading' || loading) {
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin" className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Tutors</h1>
            </div>
            <Link
              href="/admin/tutors/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Tutor
            </Link>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center w-full max-w-md">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search tutors..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Name
                          {sortField === 'name' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('expertise')}
                      >
                        <div className="flex items-center">
                          Expertise
                          {sortField === 'expertise' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('rate')}
                      >
                        <div className="flex items-center">
                          Rate
                          {sortField === 'rate' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('rating')}
                      >
                        <div className="flex items-center">
                          Rating
                          {sortField === 'rating' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('published')}
                      >
                        <div className="flex items-center">
                          Status
                          {sortField === 'published' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedTutors.length > 0 ? (
                      sortedTutors.map((tutor) => (
                        <tr key={tutor.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{tutor.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{tutor.expertise}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${tutor.rate}/hr</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{tutor.rating.toFixed(1)} ⭐</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tutor.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {tutor.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => handleTogglePublish(tutor.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                                title={tutor.published ? 'Unpublish' : 'Publish'}
                              >
                                {tutor.published ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                              <Link
                                href={`/admin/tutors/edit/${tutor.id}`}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit"
                              >
                                <Edit className="h-5 w-5" />
                              </Link>
                              <button
                                onClick={() => handleDelete(tutor.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-500">
                          No tutors found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsAdminPage; 