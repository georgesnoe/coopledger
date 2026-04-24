# AGENTS.md - CoopLedger

## Project Context
- **Goal**: Blockchain-based platform to restore trust, prevent embezzlement, and unlock bank financing for agricultural cooperatives in Togo.
- **Key Data (for content)**: 
  - Agricultural loans are only ~0.2% of total bank loans.
  - 15-20% of collective funds are embezzled annually.
  - 70% of members cite lack of transparency as the main reason for distrust.
- **Localization**: Bilingual site (French and English) using `next-intl`.

## Technical Stack
- **Framework**: Next.js 16 (App Router) with `next-intl`.
- **Styling**: Tailwind CSS 4, `shadcn` UI, `class-variance-authority`.
- **Typography**: `Libre Baskerville` (Headings), `Plus Jakarta Sans` (Body).

## Developer Commands
- `npm run dev`: Start development server.
- `npm run format`: Run Prettier.
- `npm run lint`: Run ESLint.
- `npm run typecheck`: Run TypeScript check.
- **Verification Pipeline**: `npm run lint` $\rightarrow$ `npm run typecheck` $\rightarrow$ `npm run build`.

## Landing Page Components
The landing page must implement the following structure:
- **Navbar**: Logo (Wheat + Chain), Links (Solution, Impact, Technologie, Équipe), "Lancer l'App" button (#7cc6fe pill).
- **Hero**: Field image background, Glassmorphism mobile UI overlay, Bilingual hooks.
- **ProblemSection**: "Shock of Numbers" cards (Opacity 60%+, Embezzlement 15-20%, Distrust 70%, Loan Exclusion 0.2%).
- **SolutionSection**: Three pillars: Immutable Ledger, Digital Democracy (Smart Contracts/Voting), Real-time Financial Dashboard.
- **ImpactSection**: Outcome cards: Revenue increase (+30-50%) and Funding increase (3x via Banks/IFAD).
- **Footer**: Institutional contact form and "Prosperous & Transparent" slogan.
