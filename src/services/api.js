import axios from 'axios';
const API_KEY = '26514629-430be561a74f355a42f6b7f19';

axios.defaults.baseURL = 'https://pixabay.com/api';

export async function getImages(filter, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: filter,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 12,
  });
  const response = await axios.get(`/?${searchParams}`);
  return response.data;
}
