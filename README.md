Step 'N Kicks

Deployment notes:
- The website files are in the `SIA` folder.
- For Vercel, either set the project Root Directory to `SIA`, or deploy the repository root (which includes a small redirecting `index.html`).
- All website file names and local references use lowercase to avoid case-sensitive deployment errors.
- The login page is `SIA/index.html`; the shop page is `SIA/shop.html`.

Shared inventory (buyer and admin use the same stock)
- Stock lives in Supabase (`products.stock`). Checkout calls the `place_order` database function, which subtracts stock and creates the order in one step.
- One-time setup:
  1. Supabase > Authentication > Users > Add user: create the admin account (email `admin@stepnkicks.com`, strong password).
  2. Supabase > SQL Editor: paste and run `supabase-setup.sql`. If your admin email is different, change it in the `admins` insert first.
  3. Deploy. Log in on `SIA/index.html` with the admin email and the password from step 1.
- New files: `SIA/db.js` (shared Supabase helper) and `supabase-setup.sql`.
