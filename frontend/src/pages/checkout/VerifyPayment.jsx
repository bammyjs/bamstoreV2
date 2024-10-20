import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const VerifyPayment = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyPayment = async () => {
      const query = new URLSearchParams(location.search);
      const transaction_id = query.get("transaction_id");

      if (transaction_id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_URL}/api/order/verify-payment`,
            {
              params: { transaction_id },
              withCredentials: true,
            }
          );

          // Parse and handle the verification response
          if (response.data && response.data.paymentStatus === "completed") {
            setVerificationStatus("Payment verified successfully!");
            
            // Redirect to the order success page after a short delay
            setTimeout(() => {
              navigate(`/checkout-success?orderId=${response.data.orderId}`);
            }, 3000);
            dispatch(clearCart());
            
          } else {
            setVerificationStatus("Payment verification failed.");
          }
        } catch (error) {
          setVerificationStatus("Error verifying payment.");
        }
      } else {
        setVerificationStatus("Invalid or missing transaction ID.");
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="text-2xl text-black">
      <h2>{verificationStatus || "Verifying payment..."}</h2>
    </div>
  );
};

export default VerifyPayment;
