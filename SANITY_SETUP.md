# Sanity Setup

This project already has an embedded Sanity Studio at `/studio`. You do not need to create a separate Studio app.

## 1. Login From This Project

```bash
npx sanity login
```

This opens a browser login. Use the same account you registered with on Sanity.

## 2. Create Or Select A Sanity Project

If you already created a Sanity project, get the project ID from:

```txt
https://www.sanity.io/manage
```

If you have not created one yet:

```bash
npx sanity projects create auxano-solutions --dataset production
```

Then copy the project ID.

## 3. Configure Environment Variables

Create `.env.local` from `.env.example` and set:

```txt
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token_for_draft_preview
SANITY_REVALIDATE_SECRET=make_a_long_random_secret
```

For normal published website content, the simplest setup is a public Sanity dataset. If you make the dataset private, the Sanity client needs to be changed to send a read token for published requests too.

## 4. Add CORS Origins In Sanity

In Sanity Manage, add these CORS origins with credentials enabled:

```txt
http://localhost:3000
https://your-production-domain.com
```

You can also add them from the terminal:

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://your-production-domain.com --credentials
```

## 5. Run The Site And Open Studio

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/studio
```

## Blog Content

Create a new document with type `Posts`.

Required/recommended fields:

- `Title`: article headline
- `Slug`: generate from title
- `Category`: example `CCTV Planning`, `Managed IT`, `Networking`
- `Published At`: publication date
- `Reading Time`: example `5 min read`
- `Excerpt`: short summary for blog listing and SEO
- `Takeaways`: bullet points shown near the top of the article
- `Body`: paragraphs for the full article
- `SEO`: optional meta title and description

Published posts automatically appear at:

```txt
/blog
/blog/post-slug
```

## Careers Page

The site now has a fallback careers page at:

```txt
/careers
```

To control the top page content from Sanity, create a `Pages` document:

```txt
Title: Careers
Slug: careers
```

Add sections such as `Hero Section`, `Content Split`, `FAQ Block`, or `CTA Band`. The built-in fallback career sections will still render underneath the Sanity-controlled sections.

## Publishing Changes

After editing content in Sanity, the site refreshes cached content automatically on its normal revalidation window. For immediate updates, call the revalidation API with `SANITY_REVALIDATE_SECRET`.
