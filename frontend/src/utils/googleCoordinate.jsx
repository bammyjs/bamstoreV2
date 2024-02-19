export const getCoordinates = async (address) => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY; // Store your API key in an environment variable
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      return { lat, lng };
    } else {
      console.error("Geocoding failed:", data.status);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
  return null;
};

// Usage example
getCoordinates("1600 Amphitheatre Parkway, Mountain View, CA");
