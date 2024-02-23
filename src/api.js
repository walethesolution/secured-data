const API_BASE_URL = "https://your-api-gateway-url.com"; // Replace this with your actual API Gateway URL

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers like authentication tokens here if needed
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
