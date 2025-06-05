# Rules

```
# Project Overview
- Application Type: Web Application
- Core Development/Framework: Next.js 15 (App Router)

<coding_guidelines>
- My project's programming language is Typescript.
- Use the Next.js App Router.
- Prefer server components when possible for performance and security.
- Utilize client components only when necessary for interactivity.
</coding_guidelines>

<styling_guidelines>
- Use Tailwind CSS for styling.
- Maintain consistency in styling across the application.
</styling_guidelines>

<data_fetching_guidelines>
- Use tRPC for type-safe API communication between the client and server.
- Structure tRPC procedures logically and follow best practices for data fetching in Next.js.
</data_fetching_guidelines>

<authentication_guidelines>
- Implement authentication using NextAuth.js.
- Configure NextAuth.js with appropriate providers (e.g., credentials, Google, etc.).
</authentication_guidelines>

# Cart Implementation
- The current cart implementation uses `CartContext`. Assume client-side storage (local storage or cookies) unless explicitly told to use a database.
- If persistence across devices/sessions is required, use database to save cart for logged-in users..

```
