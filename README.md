# Oak City Portfolio Demos

Astro-based monorepo containing portfolio demo websites for small business niches. These static sites are deployed to AWS S3 and CloudFront for showcase on oakcitysoftwaresolutions.com.

## 🏗️ Project Structure

This is an Astro monorepo with the following structure:

```
oakcity-portfolio-demos/
├── shared/                 # Shared components and styles
│   ├── components/         # Reusable Astro components
│   │   └── Layout.astro   # Main layout with header/footer
│   └── styles/            # Global CSS styles
│       └── global.css     # Shared utility styles
├── sites/                 # Individual demo sites
│   └── cleaning/          # Cleaning services demo
│       ├── src/
│       │   └── pages/     # Site pages
│       ├── public/        # Static assets
│       └── package.json   # Site-specific dependencies
└── package.json           # Root workspace configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/liljoker919/oakcity-portfolio-demos.git
cd oakcity-portfolio-demos
```

2. Install dependencies:
```bash
npm install
```

This will install dependencies for all workspaces in the monorepo.

## 🧞 Running Sites Locally

### Running the Cleaning Demo Site

```bash
# Development mode with hot reload
npm run dev:cleaning

# Build for production
npm run build:cleaning

# Preview production build
npm run preview:cleaning
```

The development server will typically run at `http://localhost:4321`

### Running Other Sites (Future)

As additional sites are added, you can run them with similar commands:

```bash
npm run dev:handyman
npm run dev:coach
npm run dev:ecommerce
```

## 📄 Pages Structure

Each demo site includes the following pages:

- **Home** (`/`) - Landing page with service highlights
- **Services** (`/services`) - Detailed service offerings
- **About** (`/about`) - Company information and values
- **Contact** (`/contact`) - Contact form and information

## 🎨 Shared Components

### Layout Component

Located at `shared/components/Layout.astro`, this component provides:

- Responsive navigation header
- Footer with contact information and links
- SEO meta tags
- Consistent styling across all sites

Usage in pages:
```astro
---
import Layout from '../../../shared/components/Layout.astro';
import '../../../shared/styles/global.css';
---

<Layout title="Page Title" description="Page description">
  <!-- Your page content -->
</Layout>
```

### Global Styles

Located at `shared/styles/global.css`, includes:

- CSS variables for consistent theming
- Utility classes (buttons, cards, grids)
- Form styles
- Responsive breakpoints

## 🚢 Deployment

### Build Process

Each site is built as a static site that can be deployed to any static hosting service:

```bash
# Build a specific site
npm run build:cleaning

# Output will be in sites/cleaning/dist/
```

### AWS Deployment

These sites are deployed to AWS S3 + CloudFront:

1. **Build the site** using the build command
2. **Upload to S3** - The `dist` folder contents are uploaded to an S3 bucket
3. **CloudFront Distribution** - Serves the content globally with CDN
4. **Custom Domain** (optional) - Configure Route 53 for custom domains

**Note:** Deployment credentials and configurations are managed separately and not included in this repository for security.

### Deployment Workflow

Recommended CI/CD workflow:

```yaml
# Example GitHub Actions workflow
- Build site on push to main
- Upload to S3 bucket
- Invalidate CloudFront cache
- Sites available at their respective URLs
```

## 🔄 Adding New Sites

To add a new demo site (e.g., handyman, coach, ecommerce):

1. Create a new directory in `sites/`:
```bash
mkdir sites/handyman
```

2. Copy the structure from an existing site:
```bash
cp -r sites/cleaning/* sites/handyman/
```

3. Update `sites/handyman/package.json`:
```json
{
  "name": "@oakcity/handyman",
  ...
}
```

4. Add scripts to root `package.json`:
```json
{
  "scripts": {
    "dev:handyman": "npm run dev --workspace=sites/handyman",
    "build:handyman": "npm run build --workspace=sites/handyman",
    "preview:handyman": "npm run preview --workspace=sites/handyman"
  }
}
```

5. Customize the content in the new site's pages

6. Install dependencies:
```bash
npm install
```

## 🛠️ Development

### File Organization

- **Site-specific** files go in `sites/[site-name]/`
- **Shared** components and styles go in `shared/`
- Each site imports shared components using relative paths

### TypeScript Configuration

Each site is configured with TypeScript support and includes path aliases for accessing shared resources:

```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["../../shared/*"]
    }
  }
}
```

### Best Practices

1. **Keep sites independent** - Each site should be able to build independently
2. **Share common components** - Use the `shared/` directory for reusable elements
3. **Consistent styling** - Leverage global styles for consistency
4. **SEO optimization** - Update title and description for each page
5. **Responsive design** - Test on multiple screen sizes

## 📦 Tech Stack

- **Framework:** [Astro](https://astro.build/) - Modern static site generator
- **TypeScript:** Type-safe development
- **CSS:** Vanilla CSS with modern features
- **Workspace:** npm workspaces for monorepo management

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with `npm run dev:[site]`
4. Build to verify with `npm run build:[site]`
5. Submit a pull request

## 📝 License

See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Astro Documentation](https://docs.astro.build/)
- [Oak City Software Solutions](https://oakcitysoftwaresolutions.com/)

---

Built with ❤️ using Astro
