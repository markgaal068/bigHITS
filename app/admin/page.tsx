'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book, ShoppingBag, Users, BarChart2 } from 'lucide-react';

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [stats, setStats] = useState({
    blogs: 0,
    products: 0,
    tutors: 0,
    users: 0
  });

  useEffect(() => {
    // In a real application, these would be API calls to fetch data
    // For now, we're using placeholder data
    const fetchData = async () => {
      try {
        // Mock data fetching with a small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setStats({
          blogs: 12,
          products: 24,
          tutors: 8,
          users: 45
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (status === 'authenticated') {
      // Check if user has admin role, redirect if not
      if (session?.user?.role !== 'admin') {
        router.push('/');
      } else {
        fetchData();
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router]);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5 flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Blogs</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{stats.blogs}</dd>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/admin/blogs" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  Manage Blogs
                </Link>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5 flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <ShoppingBag className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{stats.products}</dd>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/admin/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  Manage Products
                </Link>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5 flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Tutors</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{stats.tutors}</dd>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/admin/tutors" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  Manage Tutors
                </Link>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5 flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <BarChart2 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Registered Users</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{stats.users}</dd>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <Link href="/admin/users" className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              <p className="mt-1 text-sm text-gray-500">Quickly add and manage content across your site.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <Link href="/admin/blogs/new" className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Add New Blog Post
                </Link>
                <Link href="/admin/products/new" className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                  Add New Product
                </Link>
                <Link href="/admin/tutors/new" className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  Add New Tutor
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              <p className="mt-1 text-sm text-gray-500">A list of the most recent activities across the platform.</p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                <li className="px-4 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Book className="h-4 w-4 text-indigo-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        New blog post created: &quot;How to Start a Successful Online Business&quot;
                      </p>
                      <p className="text-sm text-gray-500">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </li>
                <li className="px-4 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        New product added: &quot;Bluetooth Earbuds&quot;
                      </p>
                      <p className="text-sm text-gray-500">
                        3 hours ago
                      </p>
                    </div>
                  </div>
                </li>
                <li className="px-4 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        New tutor registered: &quot;David Williams&quot;
                      </p>
                      <p className="text-sm text-gray-500">
                        5 hours ago
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 