import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Therapy Journal — Mental Health Insights | Stillness" },
      { name: "description", content: "Read calm therapy insights on mental health, relationships, emotional burnout, boundaries, and personal growth." },
      { property: "og:title", content: "Journal — Stillness" },
      { property: "og:description", content: "Therapy insights for mental health, relationships, burnout, and personal growth." },
    ],
  }),
  component: Blog,
});

const posts = [
  { 
    cat: "Mental health", 
    title: "How to manage overthinking when the night is long", 
    time: "6 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    excerpt: "Learn practical techniques to calm racing thoughts and find peace in quiet moments."
  },
  { 
    cat: "Relationships", 
    title: "Understanding emotional burnout — yours, and theirs", 
    time: "8 min",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70504504?w=600&h=400&fit=crop",
    excerpt: "Recognize the signs of burnout and build sustainable connections with others."
  },
  { 
    cat: "Personal growth", 
    title: "Building healthy relationships starts with one quiet boundary", 
    time: "5 min",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70504504?w=600&h=400&fit=crop",
    excerpt: "Discover how small, intentional boundaries create lasting positive change."
  },
  { 
    cat: "Mental health", 
    title: "The weight of unread thoughts, and how to put them down", 
    time: "7 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    excerpt: "Release mental clutter and create space for clarity and peace."
  },
  { 
    cat: "Personal growth", 
    title: "Why slow progress is the only kind that lasts", 
    time: "4 min",
    image: "https://images.unsplash.com/photo-1553531088-2353dda11fab?w=600&h=400&fit=crop",
    excerpt: "Embrace the journey of gradual transformation and sustainable growth."
  },
];

function Blog() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 md:px-10 pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in-up">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-600 mb-6 opacity-0 animate-fadeInDown" style={{ animationDelay: "0.2s" }}>
              Welcome to Stillness
            </p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-slate-900 leading-tight mb-6 opacity-0 animate-fadeInDown" style={{ animationDelay: "0.4s" }}>
              Thoughts for a clearer mind.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg opacity-0 animate-fadeInDown" style={{ animationDelay: "0.6s" }}>
              Explore insights on mental health, relationships, and personal growth. Therapy-inspired articles to help you navigate life with greater clarity and peace.
            </p>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
              {["Mental health", "Relationships", "Personal growth"].map((c) => (
                <span 
                  key={c} 
                  className="px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-500 cursor-pointer hover:shadow-lg"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4 opacity-0 animate-fadeInRight" style={{ animationDelay: "0.5s" }}>
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop" 
                alt="Mental wellness"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f70504504?w=400&h=400&fit=crop" 
                alt="Relationships"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1553531088-2353dda11fab?w=400&h=400&fit=crop" 
                alt="Personal growth"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1512821776333-480c8e680c5d?w=400&h=400&fit=crop" 
                alt="Mindfulness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stat Section */}
      <section className="px-6 md:px-10 py-16 bg-white/40 backdrop-blur border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">500+</div>
            <p className="text-slate-600">Readers per month</p>
          </div>
          <div className="fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">45+</div>
            <p className="text-slate-600">Articles published</p>
          </div>
          <div className="fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">4.9/5</div>
            <p className="text-slate-600">Reader satisfaction</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">Latest Articles</h2>
          <p className="text-slate-600 max-w-2xl">Discover thoughtfully crafted insights to support your mental wellness journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <Post key={i} post={p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-10 py-24 bg-gradient-to-r from-blue-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl" style={{ top: "-50%", right: "-25%" }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 opacity-0 animate-fadeInDown" style={{ animationDelay: "0.2s" }}>
            Ready to explore your thoughts?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10 opacity-0 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            Subscribe to get weekly therapy insights delivered to your inbox, designed to support your mental wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
            />
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="opacity-0 animate-fadeInLeft" style={{ animationDelay: "0.2s" }}>
            <div className="border-l-4 border-emerald-600 pl-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600 mb-4">Journal Focus</p>
              <h3 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
                Helpful reading between therapy sessions
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our thoughtfully curated articles help you name what you feel, notice patterns in your thoughts and behaviors, and carry greater clarity into your daily life. Each piece is designed to complement your therapeutic work.
              </p>
            </div>
          </div>

          <div className="opacity-0 animate-fadeInRight" style={{ animationDelay: "0.4s" }}>
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-200">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600 mb-6">Popular Themes</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold text-lg mt-1">✓</span>
                  <span className="text-slate-700">Managing overthinking and racing thoughts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold text-lg mt-1">✓</span>
                  <span className="text-slate-700">Understanding emotional burnout</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold text-lg mt-1">✓</span>
                  <span className="text-slate-700">Building healthy relationships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold text-lg mt-1">✓</span>
                  <span className="text-slate-700">Regaining calm after stress</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function Post({ post, index }: { post: { cat: string; title: string; time: string; image: string; excerpt: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#"
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-5 aspect-video shadow-lg">
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-xs uppercase tracking-[0.2em] font-semibold text-slate-900 rounded-full">
          {post.cat}
        </span>
        
        {/* Read Time Badge */}
        <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur text-xs text-white rounded-full">
          {post.time} read
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="pt-3 flex items-center text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read Article <span className="ml-2">→</span>
        </div>
      </div>
    </a>
  );
}