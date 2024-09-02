const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export default async function DataFetcher() {
  const result = await fetch(BASE_URL);

  return result.json();
}