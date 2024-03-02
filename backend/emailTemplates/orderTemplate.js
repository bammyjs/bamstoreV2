const orderSuccessEmail = (
  firstName,
  cartItems,
  orderStatus,
  orderDate,
  address,
  city,
  state,
  zipCode,
  country,
  phone,
  orderAmount
) => {
  const addressDetails = `
  <p style="color: #333; font-size: 16px;">Shipping Details:</p>
<p style="color: #555; font-size: 14px;">
  ${address},<br>
  ${city},<br>
  ${state}, ${zipCode},<br>
  ${country}.<br>
  ${phone}.
</p>`;

  const emailContent = {
    body: {
      name: firstName,
      intro: [
        "Thank you for your purchase!",
        `<div style=" max-width: 80%; font-size: 18px;  padding: 5px; display: flex; align-items: center;" >Order Status: <p style=" background-color: green; padding: 2px; color: white; "> ${orderStatus.toUpperCase()}</p></div>`,
        `Order Date: ${orderDate}`,
        `Order Amount: ${orderAmount + "NGN"}`,
      ],

      action: {
        instructions:
          "You can check the status of your order and more in your dashboard:",
        button: {
          color: "#3869D4",
          text: "View your order",
          link: "http://localhost:5173/orders",
        },
      },
      table: [
        {
          title: "Order Details",
          data: cartItems.map((item) => {
            const productImage = item.image?.[0];
            return {
              product: `<div  style="display: flex; align-items: center;">
                  <img src="${productImage}" style="width: 100%; max-width: 30px; height: auto; margin-right: 10px;"> 
                  <p>${item.name}</p>
                </div>`,
              price: `${item.price}NGN`,
              quantity: item.cartQuantity,
              total: item.price * item.cartQuantity + " NGN",
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
              total: `${orderAmount + "NGN"}`,
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
        addressDetails,
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
