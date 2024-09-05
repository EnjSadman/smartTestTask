export default async function DataFetcher() {
  try {
    const result = await fetch(process.env.REACT_APP_BASE_URL ?? "");
    return result.json();
  } catch {
    return([]);
  }

  
}