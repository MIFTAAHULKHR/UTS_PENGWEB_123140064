import React from 'react';

const DetailCard = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={article.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
        }}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.description || 'No description available'}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="font-semibold">{article.source.name}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
