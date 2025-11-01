import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('technology');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'c55a2ef964ec4367883e121fd4af23dc';
  const pageSize = 9;

  // FALLBACK DATA FUNCTION
  const getDummyNews = (category, query) => {
    const baseNews = [
      {
        title: "Perkembangan Teknologi AI di Indonesia",
        description: "Artificial Intelligence semakin berkembang dan diterapkan di berbagai sektor industri Indonesia.",
        urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Tech News" }
      },
      {
        title: "Inovasi Terbaru di Bidang Teknologi",
        description: "Berbagai inovasi teknologi terbaru yang akan mengubah cara kita bekerja dan hidup.",
        urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Innovation Daily" }
      },
      {
        title: "Update Terkini Sepak Bola Liga Indonesia",
        description: "Hasil pertandingan dan berita terbaru dari Liga 1 Indonesia musim ini.",
        urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Sports Update" }
      },
      {
        title: "Pasar Bisnis Indonesia Tumbuh Positif",
        description: "Ekonomi Indonesia menunjukkan pertumbuhan yang stabil di tengah tantangan global.",
        urlToImage: "https://images.unsplash.com/photo-1665686377065-08f8896a5d2e?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Business Report" }
      },
      {
        title: "Kesehatan: Tips Hidup Sehat di Era Digital",
        description: "Panduan menjaga kesehatan fisik dan mental di tengah kesibukan kerja digital.",
        urlToImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Health Magazine" }
      },
      {
        title: "Entertainment: Film Indonesia Raih Penghargaan",
        description: "Film-film lokal semakin diakui di kancah internasional dengan berbagai penghargaan.",
        urlToImage: "https://images.unsplash.com/photo-1489599809505-7c7c3a8fbd78?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Entertainment News" }
      },
      {
        title: "Startup Teknologi Indonesia Dapat Pendanaan",
        description: "Startup lokal berhasil mendapatkan pendanaan series B dari investor internasional.",
        urlToImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Tech Startup" }
      },
      {
        title: "E-Sports Indonesia di Kancah Global",
        description: "Tim e-sports Indonesia berhasil mencapai babak final turnamen internasional.",
        urlToImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "E-Sports News" }
      },
      {
        title: "Energi Terbarukan di Indonesia",
        description: "Pengembangan energi surya dan angin semakin masif di berbagai daerah Indonesia.",
        urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
        publishedAt: new Date().toISOString(),
        url: "#",
        source: { name: "Energy Update" }
      }
    ];

    // Filter by category or search query
    let filteredNews = baseNews;
    if (category && category !== 'general') {
      filteredNews = baseNews.filter(article => 
        article.title.toLowerCase().includes(category.toLowerCase()) ||
        article.description.toLowerCase().includes(category.toLowerCase()) ||
        article.source.name.toLowerCase().includes(category.toLowerCase())
      );
    }
    if (query) {
      filteredNews = baseNews.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filteredNews.length > 0 ? filteredNews : baseNews.slice(0, 6);
  };

  const fetchNews = async (category, page = 1, query = '', dates = {}) => {
    setLoading(true);
    try {
      let url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
      
      if (query) {
        url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
      }
      if (dates.from) url += `&from=${dates.from}`;
      if (dates.to) url += `&to=${dates.to}`;

      const response = await fetch(url);
      
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.status === 'ok' && data.articles && data.articles.length > 0) {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } else {
        // If API returns no articles, use fallback data
        console.log('No articles from API, using fallback data');
        setArticles(getDummyNews(category, query));
        setTotalResults(9);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // Use fallback data when API fails
      setArticles(getDummyNews(category, query));
      setTotalResults(9);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeCategory, currentPage, searchQuery, dateRange);
  }, [activeCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setSearchQuery('');
    setDateRange({ from: '', to: '' });
  };

  const handleSearch = (keyword) => {
    setSearchQuery(keyword);
    setCurrentPage(1);
    fetchNews(activeCategory, 1, keyword, dateRange);
  };

  const handleDateFilter = (dates) => {
    setDateRange(dates);
    setCurrentPage(1);
    fetchNews(activeCategory, 1, searchQuery, dates);
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      
      <div className="container mx-auto px-4 py-8">
        <SearchForm 
          onSearch={handleSearch} 
          onDateFilter={handleDateFilter}
          dateRange={dateRange}
        />
        
        <DataTable articles={articles} loading={loading} />
        
        {!loading && articles.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Digit 4 News Portal - Powered by NewsAPI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;