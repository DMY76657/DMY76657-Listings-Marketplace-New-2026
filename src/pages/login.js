export async function renderLogin(root) {
  root.innerHTML = `
    <h1 class="mb-3">Login</h1>
    <p class="text-muted">Next step: connect Supabase auth.</p>
    <a class="btn btn-outline-secondary" href="/index.html">Back</a>
  `
}
