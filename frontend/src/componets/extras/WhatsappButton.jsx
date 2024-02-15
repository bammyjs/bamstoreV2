import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const WhatsappButton = () => {
  const phoneNumber = "+2349063897173"; // Your WhatsApp Business phone number
  const message = encodeURIComponent(
    "Hello, I'd like to inquire about a product I saw on your website."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "100",
        color: "green",
      }}
    >
      <IoLogoWhatsapp style={{ width: "60px", height: "60px" }} />
    </a>
  );
};

export default WhatsappButton;
