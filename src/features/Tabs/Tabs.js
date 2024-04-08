import React, { useState } from 'react';

//images are inconsistently brought up here so make sure to create another folder under assests for tabs images and 
// keep the image size consistent of all 9 image , container is resizing according to images so keep it consistent, better would be around 400 width and height try accordingly 
import image1 from '../../assets/categories/testtab.jpg';
import image2 from '../../assets/categories/testtab.jpg';
import image3 from '../../assets/categories/testtab.jpg';

import image4 from '../../assets/categories/home4.jpg';
import image5 from '../../assets/categories/personalcare1.jpg';
import image6 from '../../assets/categories/personalcare2.jpg';
import image7 from '../../assets/categories/personalcare3.jpg';
import image8 from '../../assets/categories/personalcare4.jpg';
import image9 from '../../assets/categories/watch1.jpg';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    { name: 'Affordable' }, 
    { name: 'Premium' }, 
    { name: 'Luxe' }
  ];

  // Define your own image URLs
  const imageData = [
    { src: image1, alt: 'Description of Image 1' },
    { src: image2, alt: 'Description of Image 2' },
    { src: image3, alt: 'Description of Image 3' },
    { src: image4, alt: 'Description of Image 3' },
    { src: image5, alt: 'Description of Image 3' },
    { src: image6, alt: 'Description of Image 3' },
    { src: image7, alt: 'Description of Image 3' },
    { src: image8, alt: 'Description of Image 3' },
    { src: image9, alt: 'Description of Image 3' },
    // Add more images as needed
  ];

  return (
    <div className="container mx-auto bg-white">

      <ul className="flex justify-center mt-5">
        {tabsData.map((tab, index) => (
          <li 
            key={index} 
            className={`mr-4 py-2 px-4 cursor-pointer ${index === activeTab ? 'text-red-500 border-t-2 border-red-500' : 'text-blue-500'}`}
            style={{
              fontFamily: "'Source Sans Pro', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 600,
              lineHeight: 1.24,
              letterSpacing: 'normal',
              textAlign: 'center',
              color: index === activeTab ? '#FF0000' : '#282c3f',
              textTransform: 'uppercase',
              borderBottomColor: '#FF0000',
            }}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap">
        {imageData.slice(activeTab * 3, (activeTab + 1) * 3).map((image, index) => (
          <div key={index} className="w-1/3 p-2">
            <div className="image-container">
              <img src={image.src} alt={image.alt} className="w-full h-400 object-cover image" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .image-container {
          overflow: hidden;
        }
        .image {
          transition: transform 0.2s ease-in-out;
        }
        .image:hover {
          transform: scale(1.1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Tabs;
