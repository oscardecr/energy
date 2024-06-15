import React from 'react';
import { Button } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber, message }) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<FaWhatsapp />}
      onClick={handleClick}
      sx={{
        backgroundColor: '#25D366',
        '&:hover': {
          backgroundColor: '#1DA851',
        },
        mt: 2, // Adds some top margin to space it out
      }}
    >
      WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
