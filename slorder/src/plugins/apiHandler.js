import axios from "axios";

const baseUrl = process.env.VUE_APP_API_URL

function get(addUrl) {
  if (isInvalidBaseUrl()) {
    throw new ApiHandlerException('illegal baseURL');
  }
  if (isInvalidUrl(addUrl)) {
    throw new ApiHandlerException('illegal addURL');
  }
  return axios.get(baseUrl + addUrl)
}

function isInvalidBaseUrl() {
  console.log(baseUrl);
  return baseUrl === undefined
    || typeof baseUrl !== 'string'
    || !baseUrl
}
function isInvalidUrl(url) {
  return url === undefined 
    || typeof url !== 'string'
}

class ApiHandlerException extends Error {
  constructor(...err) {
    super(err)
  }
}

export {get}