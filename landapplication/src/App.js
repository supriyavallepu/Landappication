import React from 'react';
import InfiniteScroll from './Infinitescrolls';

const App = () => {
  return (
    <div className="app-container">
      <h1>Land Listings</h1>
      <InfiniteScroll />
    </div>
  );
};

export default App;





// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import './App.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';

// const App = () => {
//   const [lands, setLands] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   Function to fetch data
//   const fetchData = useCallback(async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`
//       );
      
//       if (response.data.length === 0) {
//         setHasMore(false);
//       } else {
//         setLands((prevLands) => [...prevLands, response.data]);
//       }
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, loading, hasMore]);

//   Scroll event listener for infinite scroll
//   const handleScroll = () => {
//     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
//       fetchData();
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   console.log(lands, "lasdslists==========")
//   return (
//     <div className="App">
//       <div className="land-listings">
//         {lands.map((land, index) => (
//           <div key={index} className="land-item">
//             <div spaceBetween={10} slidesPerView={1} loop autoplay={{ delay: 3000 }}>
//               {land.images?.map((image, idx) => (
//                 <div key={idx}>
//                   <img src={image.url} alt={`Land ${index + 1}`} className="land-image" />
//                 </div>
//               ))}
//             </div>
//             <div className="land-details">
//               <h3>{land.title}</h3>
//               <p>{land.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {loading && <div className="loading-indicator">Loading...</div>}
//       {!hasMore && <div className="loading-indicator">No more lands to load</div>}
//     </div>
//   );
// };

// export default App;
