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
    },
    {
      title: "Digital Banking di Era Modern",
      description: "Transformasi perbankan digital semakin mempercepat layanan finansial.",
      urlToImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Finance Today" }
    },
    {
      title: "Pendidikan Online Semakin Populer",
      description: "Sistem pembelajaran daring menjadi pilihan utama di era digital.",
      urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Education Portal" }
    },
    {
      title: "Kuliner Nusantara Go International",
      description: "Masakan tradisional Indonesia semakin dikenal di kancah global.",
      urlToImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Food Network" }
    },
    {
      title: "Real Estate Indonesia Tumbuh Stabil",
      description: "Pasar properti menunjukkan ketahanan di tengah gejolak ekonomi.",
      urlToImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Property News" }
    },
    {
      title: "Teknologi 5G Resmi Diluncurkan",
      description: "Jaringan 5G mulai beroperasi di kota-kota besar Indonesia.",
      urlToImage: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Telecom Update" }
    },
    {
      title: "Startup Fintech Tembus 1 Juta User",
      description: "Aplikasi finansial teknologi mencapai milestone pengguna yang signifikan.",
      urlToImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Fintech Review" }
    },
    {
      title: "Olahraga Ekstrem Semakin Digemari",
      description: "Generasi muda semakin tertarik dengan aktivitas olahraga menantang.",
      urlToImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Extreme Sports" }
    },
    {
      title: "Wisata Alam Indonesia Jadi Primadona",
      description: "Destinasi alam Indonesia semakin populer di kalangan traveler internasional.",
      urlToImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Travel Guide" }
    },
    {
      title: "Bisnis Kuliner Tahan Banting",
      description: "Industri makanan dan minuman menunjukkan ketahanan selama pandemi.",
      urlToImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Culinary Business" }
    },
    {
      title: "Teknologi Blockchain di Sektor Publik",
      description: "Pemanfaatan blockchain mulai diterapkan dalam layanan pemerintah.",
      urlToImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Blockchain News" }
    },
    {
      title: "Musik Indonesia di Panggung Global",
      description: "Musisi lokal semakin sering tampil di festival musik internasional.",
      urlToImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Music World" }
    },
    {
      title: "Inovasi Kendaraan Listrik Lokal",
      description: "Produsen dalam negeri mulai memproduksi kendaraan ramah lingkungan.",
      urlToImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Auto Tech" }
    },
    {
      title: "E-Commerce Tumbuh Eksponensial",
      description: "Perdagangan online mencatat pertumbuhan yang sangat signifikan.",
      urlToImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "E-Commerce Report" }
    },
    {
      title: "Seni Digital Jadi Tren Baru",
      description: "Karya seni digital semakin diminati kolektor dan investor.",
      urlToImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Art Gallery" }
    },
    {
      title: "Startup Agritech Dukung Petani",
      description: "Teknologi pertanian membantu meningkatkan produktivitas sektor agraris.",
      urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Agritech News" }
    },
    {
      title: "Fashion Lokal Go International",
      description: "Desainer Indonesia semakin dikenal di pasar fashion global.",
      urlToImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Fashion Update" }
    },
    {
      title: "Teknologi Medis Terkini",
      description: "Inovasi di bidang kesehatan semakin canggih dan terjangkau.",
      urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Medical Tech" }
    },
    {
      title: "Bisnis Kopi Tembus Pasar Ekspor",
      description: "Kopi premium Indonesia semakin diminati pasar internasional.",
      urlToImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Coffee Business" }
    },
    {
      title: "Game Developer Lokal Berkembang",
      description: "Pengembang game Indonesia semakin kreatif dan kompetitif.",
      urlToImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Gaming World" }
    },
    {
      title: "Sustainable Fashion Trending",
      description: "Fashion berkelanjutan menjadi perhatian utama industri mode.",
      urlToImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Eco Fashion" }
    },
    {
      title: "Digital Marketing Era Baru",
      description: "Strategi pemasaran digital terus berevolusi dengan teknologi terbaru.",
      urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Marketing Pro" }
    },
    {
      title: "Bisnis Kuliner Plant-Based",
      description: "Makanan berbasis nabati semakin populer di kalangan urban.",
      urlToImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Plant Based" }
    },
    {
      title: "Teknologi IoT di Rumah Tangga",
      description: "Perangkat rumah pintar semakin terjangkau dan canggih.",
      urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Smart Home" }
    },
    {
      title: "Startup EduTech Revolusi Pendidikan",
      description: "Platform edukasi digital mengubah cara belajar generasi muda.",
      urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "EduTech News" }
    },
    {
      title: "Bisnis Kreatif Tumbuh Pesat",
      description: "Industri kreatif menunjukkan kontribusi signifikan terhadap ekonomi.",
      urlToImage: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Creative Industry" }
    },
    {
      title: "Teknologi VR/AR Semakin Realistis",
      description: "Pengalaman virtual dan augmented reality semakin immersive.",
      urlToImage: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "VR World" }
    },
    {
      title: "Bisnis Susu Alternatif Berkembang",
      description: "Produk susu nabati semakin variatif dan diminati pasar.",
      urlToImage: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Food Innovation" }
    },
    {
      title: "Seni Street Art Semakin Diakui",
      description: "Karya seni jalanan mendapat apresiasi lebih luas.",
      urlToImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Street Art" }
    },
    {
      title: "Bisnis Kecantikan Lokal Tembus Global",
      description: "Produk kosmetik lokal semakin kompetitif di pasar internasional.",
      urlToImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Beauty Biz" }
    },
    {
      title: "Teknologi Drone untuk Pertanian",
      description: "Pemanfaatan drone meningkatkan efisiensi sektor pertanian.",
      urlToImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Drone Tech" }
    },
    {
      title: "Bisnis Jasa Finansial Digital",
      description: "Layanan keuangan digital semakin lengkap dan terintegrasi.",
      urlToImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Digital Finance" }
    },
    {
      title: "Konser Musik Live Kembali Ramai",
      description: "Event musik langsung kembali digelar dengan antusiasme tinggi.",
      urlToImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Live Music" }
    },
    {
      title: "Bisnis Sustainable Packaging",
      description: "Kemasan ramah lingkungan menjadi tren baru industri.",
      urlToImage: "https://images.unsplash.com/photo-1587334984665-04c1dc576ef0?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Eco Packaging" }
    },
    {
      title: "Teknologi Smart City Terus Berkembang",
      description: "Kota pintar semakin nyata dengan implementasi teknologi terbaru.",
      urlToImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Smart City" }
    },
    {
      title: "Bisnis Peternakan Modern",
      description: "Teknologi modern meningkatkan efisiensi produksi peternakan.",
      urlToImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Modern Farming" }
    },
    {
      title: "Seni Kerajinan Tradisional Diminati",
      description: "Karya kerajinan tangan tradisional kembali populer.",
      urlToImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Traditional Art" }
    },
    {
      title: "Bisnis Tour & Travel Pulih",
      description: "Sektor pariwisata menunjukkan tanda-tanda pemulihan yang kuat.",
      urlToImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Travel Biz" }
    },
    {
      title: "Teknologi Robotika di Industri",
      description: "Otomatisasi dengan robot semakin luas di berbagai sektor.",
      urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Robotics News" }
    },
    {
      title: "Bisnis Kafe Konsep Unik",
      description: "Kafe dengan tema spesifik semakin diminati anak muda.",
      urlToImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Cafe Culture" }
    },
    {
      title: "Seni Fotografi Digital Berkembang",
      description: "Fotografer lokal semakin kreatif dengan teknologi digital.",
      urlToImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Photography" }
    },
    {
      title: "Bisnis Jasa Pengiriman Tumbuh",
      description: "Layanan logistik dan pengiriman semakin efisien dan cepat.",
      urlToImage: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Logistics" }
    },
    {
      title: "Teknologi Cloud Computing Maju Pesat",
      description: "Layanan komputasi awan semakin essential bagi bisnis.",
      urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Cloud Tech" }
    },
    {
      title: "Bisnis Retail Hybrid Sukses",
      description: "Gabungan toko fisik dan online memberikan hasil optimal.",
      urlToImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "Retail News" }
    },
    {
      title: "Seni Digital NFT Semakin Populer",
      description: "Karya seni digital dalam bentuk NFT semakin diminati kolektor.",
      urlToImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      publishedAt: new Date().toISOString(),
      url: "#",
      source: { name: "NFT Art" }
    }
  ];

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

  return filteredNews.length > 0 ? filteredNews : baseNews;
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
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();

    if (data.status === 'ok' && data.articles && data.articles.length > 0) {
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } else {
      console.log('No articles from API, using fallback data');
      setArticles(getDummyNews(category, query));
      setTotalResults(50); 
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setArticles(getDummyNews(category, query));
    setTotalResults(50); 
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