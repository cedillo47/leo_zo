// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/posts';

export const createPost = async ({ title, body }) => {
  return fetchHandler(baseUrl, getPostOptions({ title, body }))
};
