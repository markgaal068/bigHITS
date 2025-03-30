'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string;
  published: boolean;
}

const EditBlogPage = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = params;
  
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    tags: '',
    published: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Check authentication
    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/');
      } else {
        // Load categories (in a real app, this would come from an API)
        setCategories(['Business', 'Marketing', 'E-commerce', 'SEO', 'Personal Development']);
        
        // Fetch blog data by ID
        fetchBlogData(id);
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router, id]);

  const fetchBlogData = async (blogId: string) => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call to get the blog by ID
      // Mock data fetch with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock blog data
      const blogPost = {
        id: blogId,
        title: 'How to Optimize Your E-commerce for Mobile Users',
        slug: 'how-to-optimize-your-e-commerce-for-mobile-users',
        content: 'Mobile optimization is crucial for e-commerce success. With over 50% of web traffic coming from mobile devices, ensuring your online store is mobile-friendly is no longer optional—it\'s essential.\n\nHere are some tips to optimize your e-commerce site for mobile users:\n\n1. Implement responsive design\n2. Optimize images for faster loading\n3. Simplify the checkout process\n4. Use large, easy-to-tap buttons\n5. Ensure text is readable without zooming\n\nBy implementing these strategies, you can significantly improve the mobile shopping experience for your customers and boost your conversion rates.',
        excerpt: 'Learn how to make your online store mobile-friendly to increase conversions and improve customer satisfaction.',
        coverImage: 'https://example.com/images/mobile-ecommerce.jpg',
        category: 'E-commerce',
        tags: 'mobile,optimization,conversion',
        published: true,
        author: 'Jane Smith',
        createdAt: '2023-05-15T10:30:00Z',
      };
      
      setFormData({
        title: blogPost.title,
        slug: blogPost.slug,
        content: blogPost.content,
        excerpt: blogPost.excerpt,
        coverImage: blogPost.coverImage,
        category: blogPost.category,
        tags: blogPost.tags,
        published: blogPost.published
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load blog post:', error);
      setError('Failed to load blog post');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Automatically generate slug from title
    if (name === 'title') {
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
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate form
      if (!formData.title || !formData.content || !formData.excerpt || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      // In a real application, this would be an API call to update the blog
      // Mock successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to blog list page
      router.push('/admin/blogs');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      setIsSubmitting(false);
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
          <div className="mb-6 flex items-center">
            <Link href="/admin/blogs" className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blogs
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 required">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                {/* Slug */}
                <div>
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
                  <p className="mt-1 text-xs text-gray-500">URL-friendly version of the title</p>
                </div>
                
                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 required">
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="excerpt"
                    id="excerpt"
                    rows={2}
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="A short description of the blog post"
                  />
                  <p className="mt-1 text-xs text-gray-500">A brief summary that appears in blog listings (max 200 characters)</p>
                </div>
                
                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 required">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows={10}
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Write your blog post content here..."
                  />
                </div>
                
                {/* Cover Image */}
                <div>
                  <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    name="coverImage"
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="https://example.com/images/my-image.jpg"
                  />
                </div>
                
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 required">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="business, marketing, startup"
                  />
                  <p className="mt-1 text-xs text-gray-500">Comma separated list of tags</p>
                </div>
                
                {/* Published Status */}
                <div className="flex items-start">
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
                    <p className="text-gray-500">If unchecked, the post will be saved as a draft</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end space-x-3">
              <Link
                href="/admin/blogs"
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
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPage; 