'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">
                <span style={{ color: '#3A50E0' }}>bigH</span>
                <span style={{ color: '#E02020' }}>!</span>
                <span style={{ color: '#3A50E0' }}>TS</span>
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Blog
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Shop
            </Link>
            <Link href="/tutoring" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Tutoring
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-indigo-600 p-2 rounded-full">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            
            {session ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-700">{session.user.name}</div>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign out
                  </button>
                  {session.user.role === 'admin' && (
                    <Link href="/admin" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                      Admin
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <User className="h-4 w-4 mr-2" />
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <Link href="/cart" className="text-gray-700 hover:text-indigo-600 p-2 rounded-full mr-2">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
              Blog
            </Link>
            <Link href="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
              Shop
            </Link>
            <Link href="/tutoring" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
              Tutoring
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {session ? (
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{session.user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
                </div>
                <div className="mt-3 space-y-1 px-5">
                  {session.user.role === 'admin' && (
                    <Link href="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5">
                <Link href="/auth/signin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 