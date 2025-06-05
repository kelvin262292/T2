# DevFlow

**Beginner’s Development Workflow Guide**
**Application Type**: Web
**Goal**: Build missing pages for an e-commerce Next.js app.
**Technology Stack**: Next.js 15 (App Router), tRPC, Tailwind CSS, TypeScript, NextAuth.js, Vercel.

**Development Steps**:

1.  **Set up project & folder structure** - Make sure you have the Next.js project source code in your local machine. Create the appropriate folder structure for the new pages mentioned below. For example, `/app/products/[id]` for dynamic product detail pages.
    -   **What’s this?** Good organization helps you find and change code later.
    -   **Tip**: Keep similar files together in folders.

2.  **Build the Product Detail Pages (PDP)** - Create pages that show information about specific products.
    -   **Task**: Create the product using Next.js components to fetch product data from the database using tRPC, and render the details using existing Tailwind CSS components.
        ```javascript
        // Example: app/products/[id]/page.tsx
        async function ProductPage({ params }: { params: { id: string } }) {
          const product = await tRPC.getProduct({ id: params.id }); // Using tRPC to fetch data
          if (!product) {
            return <div>Product not found</div>;
          }
          return (
            <div>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              {/* More product details */}
            </div>
          );
        }
        export default ProductPage;
        ```
    -   **What’s this?** A page is a file that Next.js uses to create a web page. `id` is a variable passed in the URL. tRPC fetches data from your backend in a typesafe way.
    -   **Tip**: Use placeholder text and images first, then replace them with real data. Test your changes in your browser for a single item.

3.  **Implement the Cart Page** - Show users what's in their cart and allow them to adjust quantities.
    -   **Task**: Create new `CartPage` to displays the contents of `CartContext`. Create a form to allow modification of quantity. Modify `CartContext` functionality if needed.
        ```javascript
        // Example: app/cart/page.tsx
        import { CartContext } from './utils/cart-context'; // Assuming CartContext exists
        import { useContext } from 'react';

        function CartPage() {
          const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

          return (
            <div>
              <h2>Your Cart</h2>
              {cartItems.map(item => (
                <div key={item.id}>
                  <p>{item.name} - Quantity: {item.quantity}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))}
            </div>
          );
        }

        export default CartPage;
        ```
    -   **What’s this?** The cart page lets users see what they're about to buy, and manage quantities.
    -   **Tip**: Make sure the `CartContext` is also setup by doing `console.log(cartItems)` to check if the data is passed along the cart functionality.

4.  **Create the Checkout Flow** - Guide users through the process of paying and placing their order.
    -   **Task**: Build new `CheckoutPage` to allow the user to do checkout with their `CartItems`, include steps for shipping info, payment details, order confirmation. Implement a backend API endpoint to receive the order and process the information.
        ```javascript
        // Example Structure: app/checkout/page.tsx
        function CheckoutPage() {
            const [stage, setStage] = React.useState<'Shipping' | 'Payment' | 'Confirmation'>('Shipping');

             // Example Shipping Stage
            if(stage === 'Shipping')
                return (<Shipping setStage={setStage} />);
            else if (stage === 'Payment')
                return (<Payment />);

            return (<Confirmation />);
        }
        interface ShippingProps {
            setStage: Dispatch<SetStateAction<'Shipping' | 'Payment' | 'Confirmation'>>
        }
        function Shipping({ setStage }: ShippingProps): JSX.Element {
            return <div>
                <input type="text" value="" />
                <button onClick={() => setStage('Payment')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Payment</button>
            </div>
        }
        ```
        Implement `tRPC` checkout procedure
        ```typescript
        // Example tRPC procedure - /server/trpc/routers/example.ts
        checkout: publicProcedure
        .input(z.string().nullish())
        .mutation(({ input }) => {
            return {
            greeting: `Hello ${input ? input : "world"}`,
            };
        }),
        ```
    -   **What’s this?** The checkout flow takes the user from cart to confirmed order.
    -   **Tip**: Break the process into smaller steps (shipping, payment, confirmation).

5.  **Setup Authentication Pages** - Add pages for user login, registration, and password reset.
    -   **Task**: Install and configure NextAuth.js and implement the frontend for login, registration, and password reset pages. Use NextAuth configuration to integrate with existing database or authentication provider as needed.
        ```bash
        npm install next-auth
        ```
        Create api route in `pages/api/auth/[...nextauth].js`
        ```javascript
        // Example: pages/api/auth/[...nextauth].js
        import NextAuth from 'next-auth'
        import GithubProvider from 'next-auth/providers/github'

        export const authOptions = {
          // Configure one or more authentication providers
          providers: [
            GithubProvider({
              clientId: process.env.GITHUB_ID,
              clientSecret: process.env.GITHUB_SECRET,
            }),
            // ...add more providers here
          ],
        }

        export default NextAuth(authOptions)
        ```
        ```javascript
        // Example: app/login/page.tsx
        import { signIn, signOut, useSession } from 'next-auth/react'

        export default function Component() {
          const { data: session } = useSession()
          if (session) {
            return (
              <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
              </>
            )
          }
          return (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )
        }
        ```
    -   **What’s this?** Authentication ensures only authorized users can access certain features.
    -   **Tip**: Start with simple email/password login, then add other methods like Google or Facebook.

6.  **Build User Account Pages** - Let users manage their profile, orders, and addresses.
    -   **Task**: Create pages to display user information, order history, and address management forms, all using Next.js components and Tailwind CSS for styling. Connect the forms to tRPC endpoints to update the user information.
       ```javascript
        // Example: app/profile/page.tsx
        "use client";
        import { useSession } from "next-auth/react";

        function Profile() {
            const { data: session } = useSession();

            return <>{session?.user?.name}</>
        }
       ```
    -   **What’s this?** User account pages allow users to control their information.
    -   **Tip**: For more advanced account handling, you will need to connect to a database.

7.  **Implement Search Results** - Allow users to search and display products matching their query.
    -   **Task**: Build a search input, handle the search query, call a tRPC procedure to search the database, and render the results in an organized list.
        ```javascript
        // Example: app/search/page.tsx
        async function SearchPage({ searchParams }: {
            searchParams: {
              query: string
            }
          }) {
           const products = await tRPC.getProductsBySearch({ query: searchParams.query }); // Using tRPC to fetch data
            return <div>Search results for {searchParams.query}</div>
        }
        ```
    -   **What’s this?** The search results page lets users find products quickly.
    -   **Tip**: Implement debounce to prevent calling the server too often when a user is typing.

8.  **Create Error Pages** - Design custom error pages (404, 500) to handle common issues.
   -  **Task**: Override Next.js’s default error pages. Create `/app/not-found.tsx` for 404 errors and `/app/error.tsx` for other errors.
        ```javascript
            // Example: app/not-found.tsx
            import Link from 'next/link'

            export default function NotFound() {
            return (
                <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
                </div>
            )
            }
        ```
    -   **What’s this?** Custom error pages make your app look more professional.
    -   **Tip**: Provide a way for users to return to the homepage on error pages.

9.  **Deploy Your App** - Put your app online for others to see.
    -   **Task**: Commit your code to your Git repository (e.g., GitHub), then connect your repository to Vercel. Vercel will automatically build and deploy your application!
    -   **What’s this?** Deployment makes your website accessible to everyone on the internet.
    -   **Tip**: Check Vercel’s dashboard for build logs and error messages.

**Best Practices**:

*   **Save code often with Git:** Git helps you track changes to your code and undo mistakes.
*   **Work on one feature at a time:** Don't try to do everything at once.
*   **Check your work after each change:** Test your app frequently in your browser.

**Next Steps**:

*   Add more features (reviews, wishlists, internationalization).
*   Improve the design and user experience (add animations, accessibility features).
*   Promote your e-commerce site (SEO, social media).
