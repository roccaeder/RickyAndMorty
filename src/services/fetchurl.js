export function FetchUrl(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
}
