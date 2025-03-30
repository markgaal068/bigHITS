'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Trash2, PlusCircle, Search, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  published: boolean;
  slug: string;
}

const BlogsAdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState({ field: 'date', direction: 'desc' });

  useEffect(() => {
    // In a real application, these would be API calls to fetch data
    const fetchBlogs = async () => {
      try {
        // Mock data fetching with a small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Example blog data
        const mockBlogs: Blog[] = [
          {
            id: 1,
            title: "How to Start a Successful Online Business",
            excerpt: "Learn the essential steps to launch and grow your online business in today's digital marketplace.",
            author: "John Doe",
            category: "Business",
            date: "2023-03-15",
            published: true,
            slug: "how-to-start-successful-online-business"
          },
          {
            id: 2,
            title: "10 Digital Marketing Strategies That Work",
            excerpt: "Discover proven marketing tactics that will help your business stand out in a crowded online space.",
            author: "Jane Smith",
            category: "Marketing",
            date: "2023-03-10",
            published: true,
            slug: "digital-marketing-strategies-that-work"
          },
          {
            id: 3,
            title: "The Future of E-commerce: Trends to Watch",
            excerpt: "Stay ahead of the curve with these emerging e-commerce trends that are shaping the future of online retail.",
            author: "Mike Johnson",
            category: "E-commerce",
            date: "2023-03-05",
            published: true,
            slug: "future-of-ecommerce-trends"
          },
          {
            id: 4,
            title: "Ultimate Guide to Social Media Marketing",
            excerpt: "Learn how to leverage social media platforms to grow your brand and connect with your audience.",
            author: "Sarah Williams",
            category: "Marketing",
            date: "2023-02-28",
            published: true,
            slug: "ultimate-guide-social-media-marketing"
          },
          {
            id: 5,
            title: "How to Optimize Your Website for SEO",
            excerpt: "Improve your website's visibility in search engines with these proven SEO techniques.",
            author: "David Chen",
            category: "SEO",
            date: "2023-02-20",
            published: false,
            slug: "how-to-optimize-website-seo"
          },
          {
            id: 6,
            title: "Building a Personal Brand Online",
            excerpt: "Discover strategies to create a strong personal brand that sets you apart in your industry.",
            author: "Emma Thompson",
            category: "Personal Development",
            date: "2023-02-15",
            published: true,
            slug: "building-personal-brand-online"
          }
        ];
        
        setBlogs(mockBlogs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      // Check if user has admin role, redirect if not
      if (session?.user?.role !== 'admin') {
        router.push('/');
      } else {
        fetchBlogs();
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router]);

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort blogs based on sort state
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const aValue = a[sort.field as keyof Blog];
    const bValue = b[sort.field as keyof Blog];
    
    if (sort.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDelete = async (id: number) => {
    // In a real application, this would be an API call to delete the blog
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        // Mock delete operation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Update local state to remove the deleted blog
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const togglePublishStatus = async (id: number, currentStatus: boolean) => {
    // In a real application, this would be an API call to update the blog
    try {
      // Mock update operation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state to change the publish status
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === id ? { ...blog, published: !currentStatus } : blog
        )
      );
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  if (status === 'loading' || isLoading) {
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
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Link href="/admin" className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Manage Blog Posts</h1>
            </div>
            <Link
              href="/admin/blogs/new"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Blog Post
            </Link>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search blogs by title, category, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Blog List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('title')}>
                      <div className="flex items-center">
                        Title
                        {sort.field === 'title' && (
                          sort.direction === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                      <div className="flex items-center">
                        Category
                        {sort.field === 'category' && (
                          sort.direction === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('author')}>
                      <div className="flex items-center">
                        Author
                        {sort.field === 'author' && (
                          sort.direction === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        Date
                        {sort.field === 'date' && (
                          sort.direction === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('published')}>
                      <div className="flex items-center">
                        Status
                        {sort.field === 'published' && (
                          sort.direction === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No blog posts found
                      </td>
                    </tr>
                  ) : (
                    sortedBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{blog.excerpt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {blog.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {blog.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                              blog.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                            onClick={() => togglePublishStatus(blog.id, blog.published)}
                          >
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link 
                              href={`/admin/blogs/edit/${blog.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button 
                              onClick={() => handleDelete(blog.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsAdminPage; 