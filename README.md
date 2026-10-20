# Step 'N Kicks

Online sneaker store: static HTML/CSS/JS front end (folder `SIA/`) + [Supabase](https://supabase.com) backend (auth, database, storage). Deploys to Vercel as a static site (`vercel.json` serves `SIA/`).

## 1. Set up Supabase (once)
1. **Authentication → Providers → Email:** keep **Confirm email** ON.
2. **Authentication → Users → Add user:** create your admin account.
3. **SQL Editor:** paste and run all of [`supabase-setup.sql`](supabase-setup.sql) (safe to re-run). Then run the `insert into public.admins …` snippet at the bottom of that file with your admin email.
4. **Authentication → URL Configuration:** set *Site URL* to your deployed domain and add it (and `http://localhost:3000`) to *Redirect URLs*. Password-reset and confirmation emails use these.
5. The URL and publishable key at the top of `SIA/db.js` must be your project's. The publishable key is safe in the browser: Row Level Security decides who can do what.

## 2. Run / deploy
- Local: `cd SIA && python3 -m http.server 3000`
- Vercel: import the repo, no build command; `vercel.json` already sets the output folder to `SIA`.

## 3. Before you launch
- [ ] Replace **YOUR-DOMAIN** in `SIA/robots.txt` and `SIA/sitemap.xml`.
- [ ] Fill every highlighted `[bracketed]` item in `SIA/privacy.html`, `SIA/terms.html`, `SIA/contact.html` (business name, DTI/SEC no., address, DPO, support email) and have a lawyer review both policies. Change `support@your-domain.com` in the admin settings default.
- [ ] Check the delivery times, ₱150 fee / free over ₱5,000, and 7-day return text match your real policy. The pricing rule lives in **two places that must match**: `place_order()` in the SQL and `SNKRules` in `SIA/cart.js`.
- [ ] Place a test order end to end: sign up → confirm email → add address → order → admin changes status → customer sees it → review after "Delivered".
- [ ] Supabase **Project Settings → Auth**: enable CAPTCHA and review rate limits.

## What the site does now
- Real accounts (sign up, email confirmation, login, forgot/reset password, logout), saved addresses, profile editing
- Checkout requires login and a delivery address; the **server** recomputes prices, shipping and the ₱500 first-order voucher
- Orders live in the database per customer; customers can cancel pending orders; status updates appear live
- Reviews only from customers with a delivered order ("Verified buyer" is real); live ratings on the shop
- Per-size cart lines, stock checks, real pagination, "Notify me" requests saved to `stock_alerts`
- Admin (`SIA/admin-inventory.html`) shows each order's customer email and delivery address
- Policy/help pages, size guide, contact form (messages land in the `contact_messages` table), 404 page, SEO meta + product structured data, optimized images

## Not done yet
- **Online payments (GCash/Maya):** buttons are disabled; only cash on delivery works. The server rejects other methods for customers (see `PAYMENT_UNAVAILABLE` in the SQL).
- **Per-size stock:** stock is still one number per product. Needs a `product_sizes` table plus admin UI changes.
- **Emails:** order confirmations, shipping updates and back-in-stock alerts are not sent. Use a Supabase Edge Function + an email service (Resend, Postmark…), triggered by `orders` / `products` changes. Back-in-stock requests are already stored in `stock_alerts`.
- **Contact messages and stock alerts** are only visible in the Supabase table editor (no admin screens yet).
- The settings page notification toggles are stored on the device only.
- Product URLs use `product.html?id=…` (fine for sharing; slug URLs would need rewrites).
- Add a Content-Security-Policy header once you've tested it against your real domain.
