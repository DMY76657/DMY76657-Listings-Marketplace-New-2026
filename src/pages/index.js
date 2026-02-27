export async function renderIndex(root) {
  root.innerHTML = `
    <h1 class="mb-3">Listings Marketplace</h1>
    <div class="d-flex gap-2 flex-wrap">
      <a class="btn btn-primary" href="/login.html">Login</a>
      <a class="btn btn-outline-primary" href="/register.html">Register</a>
      <a class="btn btn-outline-secondary" href="/profile.html">Profile</a>
      <a class="btn btn-outline-secondary" href="/listing-create.html">Create listing</a>
      <a class="btn btn-outline-secondary" href="/admin.html">Admin</a>
    </div>
    <p class="text-muted mt-3">UI skeleton ready. Next: Supabase + Auth.</p>
  `
}
