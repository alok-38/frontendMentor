// This function runs ONLY on the server
async function getData() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  return res.json();
}

export default async function Home() {
  const repo = await getData();

  return (
    <main>
      <h1>Next.js Repo Info</h1>

      <p><strong>Name:</strong> {repo.name}</p>
      <p><strong>Description:</strong> {repo.description}</p>
      <p><strong>Stars:</strong> {repo.stargazers_count}</p>
      <p>Fetched at: {new Date().toLocaleTimeString()}</p>

    </main>
  );
}
