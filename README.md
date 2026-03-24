# __ Test

This repository contains two related projects:

- `app/`: React + Vite + TypeScript web app
- `extension/`: WXT browser extension for __

## Project Structure

```text
__ Test/
├─ app/
└─ extension/
```

## Prerequisites

- Node.js 18+
- pnpm

## Setup

Install dependencies in each project:

```bash
cd app
pnpm install

cd ../extension
pnpm install
```

## Run The Web App

```bash
cd app
pnpm dev
```

Default local URL: `http://localhost:5173`

## Run The Extension In Dev Mode

```bash
cd extension
pnpm dev
```

For Firefox:

```bash
cd extension
pnpm dev:firefox
```

## Build

Web app build:

```bash
cd app
pnpm build
```

Extension build:

```bash
cd extension
pnpm build
```

## Optional Commands

App quality checks:

```bash
cd app
pnpm lint
pnpm typecheck
```

Extension packaging:

```bash
cd extension
pnpm zip
```

## Notes

- The app and extension are managed independently with separate `package.json` files.
- If you are developing both at once, run each in a separate terminal.
