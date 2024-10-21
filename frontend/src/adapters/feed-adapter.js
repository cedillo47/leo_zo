import { fetchHandler } from "../utils/fetchingUtils";

const baseUrl = '/api/feed';

export const loadFeed = async (page, limit) => {
  return fetchHandler(`${baseUrl}?page=${page}&limit=${limit}`);
};
