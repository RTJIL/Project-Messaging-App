export default function formatUrl(url) {
  return url.endsWith('/') ? url : `${url}/`
}
