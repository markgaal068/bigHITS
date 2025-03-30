import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Multipurpose Platform',
  description: 'Read our latest articles and insights on various topics',
};

export default function BlogPage() {
  // This would come from the database in a real implementation
  const blogs = [
    {
      id: 1,
      title: "How to Start a Successful Online Business",
      excerpt: "Learn the essential steps to launch and grow your online business in today's digital marketplace.",
      coverImage: "/images/blog/business.jpg",
      author: "John Doe",
      date: "2023-03-15",
      category: "Business",
      slug: "how-to-start-successful-online-business"
    },
    {
      id: 2,
      title: "10 Digital Marketing Strategies That Work",
      excerpt: "Discover proven marketing tactics that will help your business stand out in a crowded online space.",
      coverImage: "/images/blog/marketing.jpg",
      author: "Jane Smith",
      date: "2023-03-10",
      category: "Marketing",
      slug: "digital-marketing-strategies-that-work"
    },
    {
      id: 3,
      title: "The Future of E-commerce: Trends to Watch",
      excerpt: "Stay ahead of the curve with these emerging e-commerce trends that are shaping the future of online retail.",
      coverImage: "/images/blog/ecommerce.jpg",
      author: "Mike Johnson",
      date: "2023-03-05",
      category: "E-commerce",
      slug: "future-of-ecommerce-trends"
    },
    {
      id: 4,
      title: "Ultimate Guide to Social Media Marketing",
      excerpt: "Learn how to leverage social media platforms to grow your brand and connect with your audience.",
      coverImage: "/images/blog/social-media.jpg",
      author: "Sarah Williams",
      date: "2023-02-28",
      category: "Marketing",
      slug: "ultimate-guide-social-media-marketing"
    },
    {
      id: 5,
      title: "How to Optimize Your Website for SEO",
      excerpt: "Improve your website's visibility in search engines with these proven SEO techniques.",
      coverImage: "/images/blog/seo.jpg",
      author: "David Chen",
      date: "2023-02-20",
      category: "SEO",
      slug: "how-to-optimize-website-seo"
    },
    {
      id: 6,
      title: "Building a Personal Brand Online",
      excerpt: "Discover strategies to create a strong personal brand that sets you apart in your industry.",
      coverImage: "/images/blog/personal-brand.jpg",
      author: "Emma Thompson",
      date: "2023-02-15",
      category: "Personal Development",
      slug: "building-personal-brand-online"
    }
  ];

  // Group blogs by category
  const categories = [...new Set(blogs.map(blog => blog.category))];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the latest articles, guides, and insights to help you learn and grow
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium">
            All
          </button>
          {categories.map((category) => (
            <button 
              key={category} 
              className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium">Blog Image</span>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {blog.category}
                  </span>
                  <span className="ml-3 text-xs text-gray-500">{blog.date}</span>
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600">{blog.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">By {blog.author}</span>
                  <Link href={`/blog/${blog.slug}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-indigo-600">
              1
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
} 