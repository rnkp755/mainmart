import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing arrow icons from react-icons
import WatchIcon from '@mui/icons-material/Watch'; // Importing icon from MUI
import BlenderIcon from '@mui/icons-material/Blender';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import StadiumIcon from '@mui/icons-material/Stadium';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

import IronIcon from '@mui/icons-material/Iron';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
// Import your 12 images statically 
// place 12 images in assets/categories with names such as shown below 

// image 1 and  for kitchen/appliances and kitchen/builtin
// image 2, 3, 4, 5, 6 for home/appliances, home/cleaning aid, home/garment, and home/other
// image 7, 8, 9, 10 for personal care/fragrance, personal care/body care, personal care/skin care, personal care/makeup 
// image 11, 12, 13, for watches by movement, watches by functionality, watches by style
// so bring images accordingly and in order, some images might be inconsistent

import image1 from '../../assets/categories/home2.jpg';
import image2 from '../../assets/categories/home2.jpg';

import image3 from '../../assets/categories/home3.jpg';
import image4 from '../../assets/categories/home4.jpg';
import image5 from '../../assets/categories/personalcare1.jpg';
import image6 from '../../assets/categories/personalcare2.jpg';
import image7 from '../../assets/categories/personalcare3.jpg';
import image8 from '../../assets/categories/personalcare4.jpg';
import image9 from '../../assets/categories/watch1.jpg';
import image10 from '../../assets/categories/watch2.jpg';
import image11 from '../../assets/categories/watch3.jpg';
import image12 from '../../assets/categories/watch4.jpg';
import image13 from '../../assets/categories/watch4.jpg';
import { Watch } from '@mui/icons-material';

function ImageCarousel() {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const toggleExpansion = (itemId, itemsToShow) => {
    setExpandedItemId(prevExpandedItemId =>
      prevExpandedItemId === itemId ? null : itemId
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    spaceBetween: 24,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const items = [
    {
      id: 1,
      name: "Appliances",
      itemsToShow: [
        { name: "Toaster" },
        { name: "Sandwich Maker" },
        { name: "Rice Cooker" },
        { name: "Electric Kettle" },
        { name: "Juice Maker", icon: <BlenderIcon /> },
        { name: "Induction" },
        { name: "Mixer Grinder", icon: <BlenderIcon /> },
        { name: "Food Processor" },
        { name: "Blender", icon: <BlenderIcon /> },
        { name: "Hand Mixer", icon: <BlenderIcon /> },
        { name: "OTG" },
        { name: "Air Fry" },
        { name: "Microwave", icon: <MicrowaveIcon /> }
      ]
    },
    {
      id: 2,
      name: "Built-in",
      itemsToShow: [
        { name: "Built-in Microwaves/BBQ", icon: <MicrowaveIcon /> },
        { name: "Built-in Oven", icon: <MicrowaveIcon /> },
        { name: "Chimney" },
        { name: "Hobbs" }
      ]
    },
    {
      id: 3,
      name: "Appliances",
      itemsToShow: [
        { name: "Ceramic/Oil Fan" },
        { name: "Air Purifier" },
        { name: "Heater", icon: <StadiumIcon /> }
      ]
    },
    {
      id: 4,
      name: "Cleaning Aid",
      itemsToShow: [
        { name: "Vacuum Cleaner" },
        { name: "Dish Washer", icon: <LocalLaundryServiceIcon /> },
        { name: "Cloth Dryer", icon: <LocalLaundryServiceIcon /> }
      ]
    },
    {
      id: 5,
      name: "Garment",
      itemsToShow: [
        { name: "Garment Steamer", icon: <IronIcon /> },
        { name: "Steam and Dry Iron", icon: <IronIcon /> }
      ]
    },
    {
      id: 6,
      name: "Other",
      itemsToShow: [
        { name: "Trimmer" },
        { name: "Hair Dryer" },
        { name: "Shaver" }
      ]
    },
    {
      id: 7,
      name: "Fragrance",
      itemsToShow: [
        { name: "Eau de Toilette" },
        { name: "Eau de Parfum" },
        { name: "Eau de Cologne" },
        { name: "Parfum" },
        { name: "Eau Fraiche" }
      ]
    },
    {
      id: 8,
      name: "Body Care",
      itemsToShow: [
        { name: "Body Gel" },
        { name: "Body Lotion" },
        { name: "Bath and Shower" }
      ]
    },
    {
      id: 9,
      name: "Skin Care",
      itemsToShow: [
        { name: "Moisturizer" },
        { name: "Cleanser" },
        { name: "Mask Toner" },
        { name: "Sun Screen" },
        { name: "Lips" }
      ]
    },
    {
      id: 10,
      name: "Makeup",
      itemsToShow: [
        { name: "Face", icon: <FaceRetouchingNaturalIcon /> },
        { name: "Eyes", icon: <FaceRetouchingNaturalIcon /> },
        { name: "Lips", icon: <FaceRetouchingNaturalIcon /> }
      ]
    },
    {
      id: 11,
      name: "Watches by Movement",
      itemsToShow: [
        { name: "Quartz Watch", icon: <WatchIcon /> },
        { name: "Solar Watch", icon: <WatchIcon /> },
        { name: "Automatic Watch", icon: <WatchIcon /> },
        { name: "Smart Watch", icon: <WatchIcon /> }
      ]
    },
    {
      id: 12,
      name: "Watches by Functionality",
      itemsToShow: [
        { name: "Analogue Watch", icon: <WatchIcon /> },
        { name: "Digital Watch", icon: <WatchIcon /> },
        { name: "Chronograph Watch", icon: <WatchIcon /> }
      ]
    },
    {
      id: 13,
      name: "Watches by Style",
      itemsToShow: [
        { name: "Casual Watch", icon: <WatchIcon /> },
        { name: "Dress Watch", icon: <WatchIcon /> },
        { name: "Sports Watch", icon: <WatchIcon /> }
      ],
      icon: <WatchIcon />
    }
  ];


  // Create an array of images
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13];

  return (
    <div className="flex justify-start items-center bg-gray-100 overflow-x-hidden ">
      <Slider {...settings} className="w-full px-4">
        {items.map((item, index) => (
          <div key={item.id} className="p-4">
            <div className="rounded-full bg-gray-200 h-32 w-32 overflow-hidden relative">
              <img
                src={images[index]} // Use the image from the array
                alt={`Item ${item.id}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="text-center mr-2 cursor-pointer text-gray-800 hover:text-red-500"
                onClick={() => toggleExpansion(item.id, item.itemsToShow)}
                style={{ color: expandedItemId === item.id ? 'blue' : 'inherit' }}
              >
                {item.name}
              </button>
              <ArrowButton
                expanded={expandedItemId === item.id}
                onClick={() => toggleExpansion(item.id, item.itemsToShow)}
              />
            </div>
            {expandedItemId === item.id && (
              <div>
                {item.itemsToShow.map((subitem, index) => (
                  <div key={index} className="flex items-center">
                    {/* {item.icon} Material-UI icon */}
                    <button className="expanded-item bg-white text-gray-800 hover:text-red-500 py-2 px-4 rounded cursor-pointer">
                      {subitem.icon}
                      {subitem.name}

                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

const ArrowButton = ({ expanded, onClick }) => (
  <button onClick={onClick} className="focus:outline-none">
    {expanded ? <FaChevronUp /> : <FaChevronDown />}
  </button>
);

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} left-arrow`} onClick={onClick}>
      {/* <FaChevronLeft /> */}
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} right-arrow`} onClick={onClick}>
      {/* <FaChevronRight /> */}
    </div>
  );
};

export default ImageCarousel;
