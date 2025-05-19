# Vue Frontend for Root Access Design

This project is a Vue.js single-page application (SPA) built with Vite.

## Prerequisites

*   Node.js and npm (or yarn) installed.
*   A Netlify account.
*   Git installed and your project pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).

## Development

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd vue-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will typically start the server at `http://localhost:5173` (Vite's default).

## Building for Production

To create a production build, run:

```bash
npm run build
# or
# yarn build
```
This will generate the static files in the `dist` directory.

## Deployment to Netlify

There are two main ways to deploy to Netlify:

### Method 1: Connecting Your Git Repository (Recommended)

This is the easiest and most common method, enabling continuous deployment.

1.  **Push your code to a Git provider:** Ensure your latest code, including the `netlify.toml` file, is pushed to your repository on GitHub, GitLab, or Bitbucket.

2.  **Log in to Netlify:** Go to [app.netlify.com](https://app.netlify.com) and log in.

3.  **Add a new site:**
    *   Click on "Add new site" (or "Sites" then "Add new site").
    *   Choose "Import an existing project".

4.  **Connect to your Git provider:** Select the Git provider where your repository is hosted and authorize Netlify.

5.  **Pick your repository:** Search for and select your `vue-frontend` repository.

6.  **Configure deployment settings:**
    *   **Branch to deploy:** Usually `main` or `master`.
    *   **Build command:** Netlify should auto-detect this from your `netlify.toml` as `npm run build`.
    *   **Publish directory:** Netlify should auto-detect this from your `netlify.toml` as `dist`.
    *   If Netlify doesn't auto-detect these, you can enter them manually.

7.  **Deploy site:** Click the "Deploy site" button.

Netlify will now build and deploy your site. Future pushes to your selected branch will automatically trigger new deployments.

### Method 2: Manual Drag & Drop Deployment

This method is useful for quick tests or one-off deployments if you don't want to connect a Git repository.

1.  **Build your project locally:**
    ```bash
    npm run build
    ```

2.  **Log in to Netlify:** Go to [app.netlify.com](https://app.netlify.com).

3.  **Go to the "Sites" page.**

4.  **Drag and drop your build folder:** Drag the entire `vue-frontend/dist` folder onto the area designated for manual deploys (it usually says something like "Drag and drop your site output folder here").

Netlify will upload the files and deploy your site.

## Important Notes

*   **Environment Variables:** If your application requires environment variables (e.g., API keys), you can set them up in Netlify under "Site settings" > "Build & deploy" > "Environment".
*   **Custom Domain:** After deploying, you can set up a custom domain in Netlify under "Site settings" > "Domain management".
*   **Vue Router:** The `netlify.toml` file includes a redirect rule (`[[redirects]]`) that is crucial for SPAs using client-side routing like Vue Router. This ensures that direct navigation to sub-paths (e.g., `your-site.netlify.app/team`) works correctly by serving the `index.html` file, allowing Vue Router to handle the routing.

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
