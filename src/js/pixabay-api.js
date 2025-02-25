import axios from "axios";

const API_KEY = "48879353-852d93d42efc708c69048a712";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40; // Changed to 40 (4 columns × 10 rows)

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: PER_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}