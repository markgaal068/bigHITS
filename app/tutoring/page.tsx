import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, Star, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tutoring | Multipurpose Platform',
  description: 'Find expert tutors for various subjects and book sessions',
};

export default function TutoringPage() {
  // This would come from the database in a real implementation
  const tutors = [
    {
      id: 1,
      name: "David Williams",
      specialty: "Mathematics",
      subjects: ["Calculus", "Algebra", "Statistics"],
      hourlyRate: 45,
      experience: 8,
      rating: 4.9,
      reviews: 134,
      image: "/images/tutors/david.jpg",
      availability: "weekdays",
      slug: "david-williams"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "English Literature",
      subjects: ["Essay Writing", "Poetry", "Literary Analysis"],
      hourlyRate: 40,
      experience: 6,
      rating: 4.7,
      reviews: 98,
      image: "/images/tutors/sarah.jpg",
      availability: "both",
      slug: "sarah-johnson"
    },
    {
      id: 3,
      name: "Michael Chen",
      specialty: "Computer Science",
      subjects: ["Programming", "Data Structures", "Algorithms"],
      hourlyRate: 55,
      experience: 10,
      rating: 5.0,
      reviews: 156,
      image: "/images/tutors/michael.jpg",
      availability: "weekends",
      slug: "michael-chen"
    },
    {
      id: 4,
      name: "Jennifer Rodriguez",
      specialty: "Chemistry",
      subjects: ["Organic Chemistry", "Inorganic Chemistry", "Biochemistry"],
      hourlyRate: 48,
      experience: 7,
      rating: 4.8,
      reviews: 112,
      image: "/images/tutors/jennifer.jpg",
      availability: "both",
      slug: "jennifer-rodriguez"
    },
    {
      id: 5,
      name: "Robert Kim",
      specialty: "Physics",
      subjects: ["Mechanics", "Electromagnetism", "Quantum Physics"],
      hourlyRate: 50,
      experience: 9,
      rating: 4.6,
      reviews: 87,
      image: "/images/tutors/robert.jpg",
      availability: "weekdays",
      slug: "robert-kim"
    },
    {
      id: 6,
      name: "Emily Brown",
      specialty: "History",
      subjects: ["World History", "American History", "European History"],
      hourlyRate: 38,
      experience: 5,
      rating: 4.5,
      reviews: 76,
      image: "/images/tutors/emily.jpg",
      availability: "both",
      slug: "emily-brown"
    }
  ];

  // Get unique subjects for filter
  const allSubjects = tutors.flatMap(tutor => tutor.subjects);
  const uniqueSubjects = [...new Set(allSubjects)];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Tutor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with expert tutors for personalized learning experiences in a variety of subjects
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-2/3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search tutors by name or subject..."
              />
            </div>
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All Subjects</option>
                  {uniqueSubjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="h-64 bg-green-100 relative">
                <div className="h-full flex items-center justify-center">
                  <span className="text-green-800 font-medium">Tutor Image</span>
                </div>
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700 shadow">
                  ${tutor.hourlyRate}/hr
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-sm font-medium text-gray-700">{tutor.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({tutor.reviews})</span>
                  </div>
                </div>
                <p className="text-indigo-600 font-medium mb-3">{tutor.specialty}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.subjects.map((subject) => (
                    <span key={subject} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {subject}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{tutor.experience} years experience</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Available: {' '}
                    {tutor.availability === 'both' 
                      ? 'Weekdays & Weekends' 
                      : tutor.availability === 'weekdays'
                        ? 'Weekdays only'
                        : 'Weekends only'
                    }
                  </span>
                </div>
                <Link 
                  href={`/tutoring/${tutor.slug}`}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Process Info */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Our Tutoring Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Browse Tutors</h3>
              <p className="text-gray-600">Find the perfect tutor by browsing through our selection of qualified professionals</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Book a Session</h3>
              <p className="text-gray-600">Schedule a session at a time that works for you using our integrated booking system</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Learning</h3>
              <p className="text-gray-600">Connect with your tutor online or in-person and begin your personalized learning journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 