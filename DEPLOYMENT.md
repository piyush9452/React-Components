# Deployment Guide

This document provides step-by-step instructions for deploying the React Component Library.

## GitHub Deployment

1. Create a new GitHub repository

2. Initialize Git in your local project (if not already done)
   ```bash
   git init
   ```

3. Add your files to Git
   ```bash
   git add .
   ```

4. Commit your changes
   ```bash
   git commit -m "Initial commit"
   ```

5. Add your GitHub repository as a remote
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```

6. Push your code to GitHub
   ```bash
   git push -u origin main
   ```

## Storybook Deployment with Chromatic

[Chromatic](https://www.chromatic.com/) is a visual testing and review platform made by the Storybook maintainers. It allows you to deploy your Storybook to a public URL.

1. Sign up for a Chromatic account at https://www.chromatic.com/

2. Link your GitHub repository to Chromatic

3. Install the Chromatic CLI
   ```bash
   npm install --save-dev chromatic
   ```

4. Deploy your Storybook to Chromatic
   ```bash
   npx chromatic --project-token=<your-token>
   ```
   Replace `<your-token>` with the project token provided by Chromatic.

5. After deployment, Chromatic will provide you with a URL to your published Storybook.

6. (Optional) Add Chromatic deployment to your CI/CD pipeline for automatic deployments.

## Vercel Deployment (Optional)

To deploy a demo application using Vercel:

1. Sign up for a Vercel account at https://vercel.com/

2. Install the Vercel CLI
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel
   ```bash
   vercel login
   ```

4. Deploy your application
   ```bash
   vercel
   ```

5. Follow the prompts to configure your deployment.

6. (Optional) Connect your GitHub repository to Vercel for automatic deployments.

## Continuous Integration

You can set up GitHub Actions to automatically run tests and deploy your Storybook when changes are pushed to your repository.

1. Create a `.github/workflows` directory in your project

2. Create a workflow file, e.g., `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  deploy-storybook:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

3. Add your Chromatic project token as a secret in your GitHub repository settings.

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check your dependencies are correctly installed
   - Verify your build scripts in package.json

2. **Storybook Deployment Issues**
   - Ensure your Storybook configuration is correct
   - Check that your stories are properly formatted

3. **GitHub Authentication Issues**
   - Verify your SSH keys or personal access tokens
   - Check your repository permissions

### Getting Help

If you encounter issues with deployment:

- Check the documentation for [Chromatic](https://www.chromatic.com/docs/)
- Visit the [Storybook documentation](https://storybook.js.org/docs/react/deploy/publish-storybook)
- Consult the [Vercel documentation](https://vercel.com/docs) for Vercel deployments