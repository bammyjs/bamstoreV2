const orderSuccessEmail = (
  firstName,
  cartItems,
  orderStatus,
  orderDate,
  // address,
  orderAmount
) => {
  const emailContent = {
    body: {
      name: firstName,
      intro: [
        "Thank you for your purchase!",
        `Order Status: ${orderStatus.toUpperCase()}`,
        `Order Date: ${orderDate}`,
        `Order Amount: ${orderAmount}NGN`,
      ],

      action: {
        instructions:
          "You can check the status of your order and more in your dashboard:",
        button: {
          color: "#3869D4",
          text: "View your order",
          link: "http://localhost:5173/order-preview/65e269f5c41f7281daedb5da",
        },
      },
      table: [
        {
          title: "Order Details",
          data: cartItems.map((item) => {
            return {
              product: item.name,
              price: `${item.price}NGN`,
              quantity: item.cartQuantity,
              total: item.price * item.cartQuantity,
            };
          }),
          columns: {
            // Optionally, customize the column widths
            customWidth: {
              product: "40%",
            },
            // Optionally, change column text alignment
            //   customAlignment: {
            //     price: "right",
            //   },
          },
        },
        {
          data: [
            {
              total: `${orderAmount}NGN`,
            },
          ],
          columns: {
            // Optionally, customize the column widths
            customWidth: {
              total: "50%",
            },
            // Optionally, change column text alignment
            customAlignment: {
              total: "right",
            },
          },
        },
      ],

      outro: [
        // `Address: ${address}`,
        `Date: ${new Date(Date.now())}`,
        `Address: "41 Alakure street Arakale, Akure, ON, Nigeria`,
      ],
    },
  };
  return emailContent;
};

module.exports = {
  orderSuccessEmail,
};
