import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import { Metadata } from 'next';

// In a real app, this would be fetched from a database
const getBlogPost = (slug: string) => {
  // Mock data for our example
  const posts = [
    {
      slug: 'how-to-start-successful-online-business',
      title: 'How to Start a Successful Online Business',
      content: `
        <p>Starting an online business can be an exciting and rewarding venture. With the right approach, you can build a successful business that reaches customers around the world.</p>
        
        <h2>1. Find Your Niche</h2>
        <p>The first step in starting any business is identifying your niche. What products or services will you offer? Who is your target audience? What problems will you solve for them?</p>
        
        <h2>2. Research the Market</h2>
        <p>Before investing time and money, research your market thoroughly. Understand your competition, identify gaps in the market, and determine if there&apos;s sufficient demand for your offering.</p>
        
        <h2>3. Create a Business Plan</h2>
        <p>A well-thought-out business plan is essential. It should outline your business model, marketing strategy, financial projections, and goals for the future.</p>
        
        <h2>4. Build Your Online Presence</h2>
        <p>Create a professional website that showcases your products or services. Ensure it&apos;s user-friendly, mobile-responsive, and optimized for search engines.</p>
        
        <h2>5. Establish Your Brand</h2>
        <p>Develop a strong brand identity that resonates with your target audience. This includes your logo, color scheme, messaging, and overall aesthetic.</p>
        
        <h2>6. Set Up Your Operations</h2>
        <p>Determine how you&apos;ll handle inventory, shipping, customer service, and other operational aspects of your business.</p>
        
        <h2>7. Market Your Business</h2>
        <p>Implement a comprehensive marketing strategy that includes social media, content marketing, email campaigns, and possibly paid advertising.</p>
        
        <h2>8. Launch and Iterate</h2>
        <p>Once you&apos;re ready, launch your business and be prepared to adapt based on customer feedback and market response.</p>
        
        <p>Remember, building a successful online business takes time and persistence. Stay focused on providing value to your customers, and be willing to evolve as you grow.</p>
      `,
      coverImage: '/images/blog/business.jpg',
      author: 'John Doe',
      authorImage: '/images/authors/john.jpg',
      date: 'March 15, 2023',
      category: 'Business',
      tags: ['business', 'entrepreneurship', 'ecommerce', 'startup'],
      excerpt: "Learn the essential steps to launch and grow your online business in today&apos;s digital marketplace."
    },
    // Add more blog posts as needed
  ];

  return posts.find(post => post.slug === slug) || null;
};

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | Multipurpose Platform Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author],
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/blog" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
        
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              {post.category}
            </div>
          </div>
          
          <div className="h-80 bg-indigo-100 rounded-lg flex items-center justify-center mb-8">
            <span className="text-indigo-800 font-medium">Featured Image</span>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="prose prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* Tags */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link href={`/blog/tag/${tag}`} key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Share */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center text-gray-500 hover:text-indigo-600">
            <Share2 className="h-5 w-5 mr-2" />
            Share this post
          </button>
        </div>
        
        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium">Blog Image</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">10 Digital Marketing Strategies That Work</h3>
                <Link href="/blog/digital-marketing-strategies-that-work" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Read more
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium">Blog Image</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">The Future of E-commerce: Trends to Watch</h3>
                <Link href="/blog/future-of-ecommerce-trends" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 