import React from 'react';
import { Newspaper } from 'lucide-react';
import DetailCard from './DetailCard';

const DataTable = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-xl">No articles found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <DetailCard key={index} article={article} />
      ))}
    </div>
  );
};

export default DataTable;
