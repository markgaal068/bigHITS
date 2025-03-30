import HeroSection from '@/src/components/HeroSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  // This would come from the database in a real implementation
  const featuredBlogs = [
    {
      id: 1,
      title: "How to Start a Successful Online Business",
      excerpt: "Learn the essential steps to launch and grow your online business in today's digital marketplace.",
      coverImage: "/images/blog/business.jpg",
      author: "John Doe",
      date: "2023-03-15",
      slug: "how-to-start-successful-online-business"
    },
    {
      id: 2,
      title: "10 Digital Marketing Strategies That Work",
      excerpt: "Discover proven marketing tactics that will help your business stand out in a crowded online space.",
      coverImage: "/images/blog/marketing.jpg",
      author: "Jane Smith",
      date: "2023-03-10",
      slug: "digital-marketing-strategies-that-work"
    },
    {
      id: 3,
      title: "The Future of E-commerce: Trends to Watch",
      excerpt: "Stay ahead of the curve with these emerging e-commerce trends that are shaping the future of online retail.",
      coverImage: "/images/blog/ecommerce.jpg",
      author: "Mike Johnson",
      date: "2023-03-05",
      slug: "future-of-ecommerce-trends"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Bluetooth Earbuds",
      price: 79.99,
      image: "/images/products/earbuds.jpg",
      slug: "bluetooth-earbuds"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149.99,
      image: "/images/products/smartwatch.jpg",
      slug: "smart-watch"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 59.99,
      image: "/images/products/backpack.jpg",
      slug: "laptop-backpack"
    }
  ];

  const featuredTutors = [
    {
      id: 1,
      name: "David Williams",
      specialty: "Mathematics",
      hourlyRate: 45,
      image: "/images/tutors/david.jpg",
      slug: "david-williams"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "English Literature",
      hourlyRate: 40,
      image: "/images/tutors/sarah.jpg",
      slug: "sarah-johnson"
    },
    {
      id: 3,
      name: "Michael Chen",
      specialty: "Computer Science",
      hourlyRate: 55,
      image: "/images/tutors/michael.jpg",
      slug: "michael-chen"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Blog Posts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Blog Posts</h2>
            <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              View all blogs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 bg-indigo-200 flex items-center justify-center">
                  <span className="text-indigo-800 font-medium">Blog Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {blog.author}</span>
                    <Link href={`/blog/${blog.slug}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Top Products</h2>
            <Link href="/shop" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-800 font-medium">Product Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-900 font-bold mb-4">${product.price}</p>
                  <Link href={`/shop/${product.slug}`} className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none text-center">
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Expert Tutors</h2>
            <Link href="/tutoring" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              View all tutors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <div key={tutor.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="h-48 bg-green-200 flex items-center justify-center">
                  <span className="text-green-800 font-medium">Tutor Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{tutor.name}</h3>
                  <p className="text-indigo-600 text-sm mb-3">{tutor.specialty}</p>
                  <p className="text-gray-900 font-medium mb-4">${tutor.hourlyRate}/hour</p>
                  <Link href={`/tutoring/${tutor.slug}`} className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none text-center">
                    Book a Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Create an account today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join our platform to access exclusive content, shop premium products, and connect with expert tutors.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link href="/auth/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
                Sign up for free
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link href="/auth/signin" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
