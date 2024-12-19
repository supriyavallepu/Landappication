import React, { useState, useEffect, useRef } from "react";
import ImageCarousel from "./ImageCarousel";
import './infinitescroll.css'

// Fetch land data from API
const fetchLandData = async (page) => {
  const response = await fetch(
    `https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`
  );
  return await response.json();
};

const InfiniteScroll = () => {
  const [lands, setLands] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  // Load data when the page number changes
  useEffect(() => {
    const loadData = async () => {
      if (loading) return;
      setLoading(true);
      const newData = await fetchLandData(page);
      if (newData.length === 0) {
        setHasMore(false); // Stop fetching if no more data
      } else {
        setLands((prevLands) => [...prevLands, newData]);
      }
      setLoading(false);
    };

    loadData();
  }, [page]);
console.log(lands, "lasdslists==========")
  // Intersection Observer to detect when the user reaches the bottom
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // Increment page when scrolled to bottom
        }
      },
      options
    );

    if (loader.current) {
      observer.observe(loader.current); // Observe the loader
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current); // Clean up observer
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="land-list">
      {lands?.map((land) => (
        <div key={land.results.division_info.id} className="land-card">
          <ImageCarousel images={land.results.land_media.image} /> Image carousel 
          <h3>{land.results.division_info.name}</h3>
          <p>{land.results.division_info.division_type}</p>
        </div>
      ))}
      
      {loading && <div className="loading-indicator">Loading...</div>}
      <div ref={loader}></div> {/* Invisible loader for IntersectionObserver */}
    </div>
  );
};

 export default InfiniteScroll;







// import React from 'react';
// import './Landlisting.css';  // CSS file for styling

// const LandImageWithStyles = () => {
//   return (
//     <div className="land-image-container">
//       <div className="land-image-wrapper">
//         {/* Displaying the provided image */}
//         <img
//           src="https://res.cloudinary.com/dy530bex0/image/upload/w_500,f_auto/v1/media/images/land_1_jdtjbk"
//           alt="Land for Sale"
//           className="land-image"
//         />
//       </div>
//       <div className="land-image-description">
//         <h2>Verified Land for Sale</h2>
//         <p>This is a verified land listing. A great opportunity for investment!</p>
//         <button className="inquire-button">Inquire Now</button>
//       </div>
//     </div>
//   );
// };

// export default LandImageWithStyles;


