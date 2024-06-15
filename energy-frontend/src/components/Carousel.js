import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary
import image1 from '../assets/image1.jpg'; // Ensure this path is correct

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    logo,
    image1,
    // Add more image imports here
  ];

  return (
    <Box sx={{ width: '80%', mt: 4, mx: 'auto' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ textAlign: 'center', px: 1 }}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                borderRadius: '10px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
