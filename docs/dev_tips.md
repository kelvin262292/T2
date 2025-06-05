# DevTips

**Development Tips Document**

**Application Type**: Web

**package.json Script Commands for Development**:

- **Command**: `npm install`
  - **Usage**: Run in terminal in project root
  - **Purpose**: Installs project dependencies defined in `package.json`. This should be run after scaffolding the app and after adding new dependencies.

- **Command**: `npm run dev` or `npm start`
  - **Usage**: Run in terminal in project root
  - **Purpose**: Starts the Next.js local development server with hot reloading.  This allows you to see changes to your code in real-time as you develop. Check `package.json` for the exact command.  `create-next-app` defaults to `npm run dev`.

- **Command**: `npm run build`
  - **Usage**: Run in terminal in project root
  - **Purpose**: Creates a production-ready build of your Next.js application. This is a crucial step to test your application's built output before deploying it.

- **Command**: `npm run lint` (Likely present due to `--eslint` flag)
   - **Usage**: Run in terminal in project root
   - **Purpose**: Lints your code to follow predefined style guidelines and identify potential errors, improving code quality and consistency.

**Example Usage**:

- **Step 1: Project Setup**
  Run: `npx create-next-app@latest my-app --typescript --tailwind --eslint --src-dir --app --import-alias "@/*"` to scaffold the initial Next.js project.

- **Step 2: Install Initial Dependencies**
  Navigate to the project `cd my-app` and run `npm install`. This will install the base dependencies created by `create-next-app`.

- **Step 3: Add tRPC and NextAuth Dependencies**
  Run: `npm install @trpc/client @trpc/react-query @trpc/server superjson zod react-query next-auth react-ga4`. This installs the additional dependencies as outlined in the implementation plan.

- **Step 4: Start Development Server**
  Run `npm run dev` to start the local development server and begin coding your application.

- **Step 5: Test Production Build**
  Periodically, or before deploying for production, run `npm run build` to ensure your application builds correctly.

**Additional Tips**:

- Always check the `package.json` file for available npm scripts beyond the standard `install`, `dev`, `build`, and any specific commands as described in the framework or library documentation.
- Use `npm run` (without any script name) in the terminal to list all available scripts defined in your `package.json` file. This is a helpful way to discover custom scripts or features provided by your project's setup.
- Read the create-next-app and framework documentation, and adjust scripts as you become more familiar with how to work and customize your web application.
