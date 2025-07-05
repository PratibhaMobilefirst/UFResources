// import React from 'react';

// interface ThumbnailStripProps {
//   thumbnails: string[];
//   currentPage: number;
//   onPageSelect: (page: number) => void;
//   visiblePages?: number;
// }

// const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({ thumbnails, currentPage, onPageSelect, visiblePages = 4 }) => {
//   const [startIndex, setStartIndex] = React.useState(0);

//   const handleLeft = () => {
//     setStartIndex((i) => Math.max(i - visiblePages, 0));
//   };
//   const handleRight = () => {
//     setStartIndex((i) => Math.min(i + visiblePages, Math.max(thumbnails.length - visiblePages, 0)));
//   };

//   return (
//     <div className="flex items-center bg-[#FAFAFA] p-2 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-4">
//       <button
//         className="w-6 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
//         onClick={handleLeft}
//         disabled={startIndex === 0}
//         aria-label="Scroll left"
//       >
//         &#8592;
//       </button>
//       <div className="flex gap-2 overflow-x-hidden" style={{ width: 120 * visiblePages + 8 * (visiblePages - 1) }}>
//         {thumbnails.slice(startIndex, startIndex + visiblePages).map((thumbnail, idx) => (
//           <div
//             key={startIndex + idx}
//             className={`w-36 h-20 bg-white border rounded cursor-pointer transition-all relative ${
//               currentPage === startIndex + idx + 1 ? 'ring-2 ring-blue-500' : ''
//             }`}
//             onClick={() => onPageSelect(startIndex + idx + 1)}
//           >
//             <img src={thumbnail} alt={`Page ${startIndex + idx + 1}`} className="w-full h-full object-cover rounded" />
//             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5">
//               {startIndex + idx + 1}
//             </div>
//           </div>
//         ))}
//       </div>
//       <button
//         className="w-6 h-20 flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
//         onClick={handleRight}
//         disabled={startIndex + visiblePages >= thumbnails.length}
//         aria-label="Scroll right"
//       >
//         &#8594;
//       </button>
//     </div>
//   );
// };

// export default ThumbnailStrip; 
import React from 'react';

interface ThumbnailStripProps {
  thumbnails: string[];
  currentPage: number;
  onPageSelect: (page: number) => void;
  visiblePages?: number;
}

const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({
  thumbnails,
  currentPage,
  onPageSelect,
  visiblePages = 5,
}) => {
  const [startIndex, setStartIndex] = React.useState(0);

  const handleLeft = () => {
    setStartIndex((i) => Math.max(i - visiblePages, 0));
  };

  const handleRight = () => {
    setStartIndex((i) =>
      Math.min(i + visiblePages, Math.max(thumbnails.length - visiblePages, 0))
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-[65%] h-[90px] bg-[#FAFAFA] p-2 rounded-lg shadow-md flex items-center justify-between">
      
      {/* Left Arrow */}
      <button
        className="w-6 h-full flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
        onClick={handleLeft}
        disabled={startIndex === 0}
      >
        ←
      </button>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-hidden px-2 w-full justify-center">
        {thumbnails.slice(startIndex, startIndex + visiblePages).map((thumb, idx) => {
          const pageNum = startIndex + idx + 1;
          return (
            <div
              key={pageNum}
              className={`w-24 h-20 bg-white border rounded relative cursor-pointer ${
                currentPage === pageNum ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onPageSelect(pageNum)}
            >
              <img
                src={thumb}
                alt={`Page ${pageNum}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-50 text-white text-xs py-0.5">
                {pageNum}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        className="w-6 h-full flex items-center justify-center text-gray-400 hover:text-blue-700 disabled:opacity-30"
        onClick={handleRight}
        disabled={startIndex + visiblePages >= thumbnails.length}
      >
        →
      </button>
    </div>
  );
};

