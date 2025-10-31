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
  
  const API_KEY = 'c55a2ef964ec4367883e121fd4af23dc'; // Ganti dengan NewsAPI key kamu
  const pageSize = 9;

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
      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } else {
        console.error('API Error:', data.message);
        setArticles([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setArticles([]);
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
