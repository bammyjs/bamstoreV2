const orderUpdateEmail = (
  firstName,
  orderStatus,
  orderDate,
  orderAmount,
  address
) => {
  const emailContent = {
    body: {
      name: firstName,
      intro: [
        "New update on your order!",
        `Order Status: ${orderStatus.toUpperCase()}`,
        `Order Date: ${orderDate}`,
        `Order Amount: ${orderAmount}NGN`,
      ],

      action: {
        instructions:
          "You can check the status of your order and more in your order details:",
        button: {
          color: "#3869D4",
          text: "View your order",
          link: `http://localhost:5173/order-preview`,
        },
      },
      outro: [
        `If you have any questions about your order, please contact us. \nOrder Date: ${orderDate}\nTotal Amount: ${orderAmount}NGN\nDelivery Address: ${address}``Date: ${new Date(
          Date.now(toLocaleDateString("en-US"))
        )}`,
        `Address: "41 Alakure street Arakale, Akure, ON, Nigeria`,
      ],
    },
  };
  return emailContent;
};

module.exports = {
  orderUpdateEmail,
};
