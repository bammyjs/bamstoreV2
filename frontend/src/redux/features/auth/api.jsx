export const url = "http://localhost:5000/api";
// export const url = "https://bamstore-store.onrender.com/api";

export const setHeaders = () => {
  const headers = {
    cookies: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  return headers;
};
