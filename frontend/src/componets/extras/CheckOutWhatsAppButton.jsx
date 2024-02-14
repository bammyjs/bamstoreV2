import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Link } from "react-router-dom";

const CheckOutWhatsAppButton = ({ message }) => {
  const phoneNumber = "+2349063897173"; // Your WhatsApp Business phone number
  const encodedMessage = encodeURIComponent(
    message || "Hello, I'd like to inquire about something on your website."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      to={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex btn btn-secondary"
    >
      <p>Buy Now</p>
      <IoLogoWhatsapp style={{ fontSize: "20px" }} />
    </Link>
  );
};

export default CheckOutWhatsAppButton;
