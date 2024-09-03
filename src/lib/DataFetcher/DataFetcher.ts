const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export default async function DataFetcher() {
  try {
    const result = await fetch(BASE_URL);
    return result.json();
  } catch {
    return([]);
  }

  
}