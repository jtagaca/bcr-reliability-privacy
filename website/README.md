# BCR Reliability + Privacy website

This directory contains the public download and disclosure page for the unofficial BCR Reliability + Privacy preview.

Production: https://bcr-reliability-privacy.vercel.app

## Local development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run build
node --test tests/rendered-html.test.mjs
npm run build:vercel
```

The production Vercel deployment links release downloads to GitHub Releases rather than storing APK files in the website deployment.
