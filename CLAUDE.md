# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development Server:**
```bash
npm run dev          # Start Next.js development server on http://localhost:3000
```

**Build & Production:**
```bash
npm run build        # Build optimized production bundle
npm run start        # Start production server
```

**Code Quality:**
```bash
npm run lint         # Run ESLint to check code quality
```

## Environment Configuration

**Google Analytics Setup:**

This project uses Google Analytics 4 (GA4) for tracking via Next.js third-party library integration.

1. **Get your GA4 Measurement ID:**
   - Visit [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property or use an existing one
   - Find your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Configure the environment variable:**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and set your GA4 Measurement ID:
     ```
     NEXT_PUBLIC_GA_ID=G-YOUR-MEASUREMENT-ID
     ```

3. **How it works:**
   - The `GoogleAnalytics` component from `@next/third-parties/google` is included in `src/app/layout.tsx`
   - It only loads when `NEXT_PUBLIC_GA_ID` is set
   - No analytics will be loaded in development if the variable is not set

4. **Reference:**
   - [Next.js Third-Party Libraries - Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)
   - [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)

**Important Notes:**
- `.env.local` is gitignored and should never be committed
- Use `.env.example` as a template for required environment variables
- The `NEXT_PUBLIC_` prefix makes the variable accessible in the browser

## Project Architecture

This is a Next.js 15 concrete calculator web application built with React 19, TypeScript, and Tailwind CSS 4.

### Key Architecture Patterns

**App Router Structure:** Uses Next.js App Router with file-based routing in `src/app/`

The application has 19+ specialized calculator pages, each following the pattern:
- Route: `src/app/[calculator-name]/page.tsx`
- Component: `src/components/[calculator-name].tsx`

Main calculator types include:
- General concrete calculators: `/calculator/`, `/slab-calculator/`, `/yard-calculator/`, `/volume-calculator/`
- Foundation-specific: `/footing-calculator/`
- Material-specific: `/bag-calculator/`, `/cement-calculator/`, `/block-calculator/`
- Brand-specific: `/quikrete-calculator/`, `/sakrete-calculator/`
- Related materials: `/gravel-calculator/`, `/pea-gravel-calculator/`, `/board-foot-calculator/`
- Utility calculators: `/cost-calculator/`, `/weight-calculator/`
- Static pages: `/about/`, `/contact/`, `/privacy/`, `/terms/`

**Component Organization:**
- `src/components/` - Reusable React components
- All components are client-side ('use client' directive) for interactivity
- Components use TypeScript interfaces for props and state
- Consistent naming: kebab-case for files, PascalCase for component names

**Calculator Architecture:**

All calculator components follow a consistent pattern:
- Client-side rendering with `'use client'` directive
- State management using React hooks (useState, useCallback)
- Form validation with error handling
- Unit conversion support (feet, inches, yards, meters, centimeters)
- Material quantity calculations
- Export/download functionality for results
- Common UI elements: Calculator icon, Reset button, Download button (from lucide-react)

Calculator categories:
- **Multi-project calculators**: Support multiple project types (slabs, footings, tubes, curbs, stairs) with dynamic form fields based on selection
- **Specialized calculators**: Single-purpose calculators optimized for specific use cases (slabs, footings, yards, bags, etc.)
- **Material calculators**: Focus on specific materials (cement, gravel, blocks) with tailored calculations
- **Brand calculators**: Pre-configured for specific product brands (Quikrete, Sakrete)

Common interfaces across calculators:
- `ProjectType`: Enum for supported project shapes/types
- `UnitType`: Enum for measurement units
- `CalculationResult`: Output data structure (volume, weight, material quantities, costs)
- `ProjectParams`: Input parameters with unit selectors for each dimension

**Theming & UI:**
- Uses `next-themes` for dark/light mode support
- Tailwind CSS 4 with CSS custom properties for theming
- Core layout components:
  - `Navigation`: Sticky header with site logo and main navigation links
  - `Breadcrumb`: Dynamic breadcrumb navigation based on current route
  - `Footer`: Site footer with quick links and contact information
  - `ThemeToggle`: Dark/light mode switcher
  - `ThemeProvider`: Context provider for theme management
- FAQ components: `faq-item.tsx`, `slab-faq-item.tsx`, `block-faq-item.tsx` for calculator-specific help
- Lucide React icons throughout (Calculator, Home, Blocks, Mountain, Layers, RotateCcw, Download, Info, etc.)
- Design follows shadcn/ui-style component patterns with consistent spacing, borders, and color usage

**SEO Optimization:**
- Comprehensive metadata in root layout (src/app/layout.tsx)
- Structured data (JSON-LD) for WebApplication schema
- OpenGraph and Twitter meta tags
- Google Analytics 4 integration via @next/third-parties (configured via NEXT_PUBLIC_GA_ID environment variable)
- Robots meta tags configured for indexing

### Data Models

**Concrete Ratios:** Predefined ratios (per cubic meter) for different concrete grades:
- C15-C40 grades with specific cement, sand, gravel, and water quantities
- Identical ratio data used across both calculators

**Calculation Results:**
- Standard `CalculationResult` interface includes:
  - Volume measurements: volumeCubicFeet, volumeCubicYards, volumeCubicMeters
  - Weight calculations: weightLbs, weightKg
  - Bag quantities: bags60lb, bags80lb
  - Material components: cement (kg), cementBags, sand (kg), gravel (kg), water (kg)
  - Cost: totalCost
- Specialized calculators may extend or modify this interface for specific use cases

**Project Parameters:**
- `ProjectParams` interface defines all possible input dimensions with corresponding unit selectors
- Common dimensions: length, width, height, depth, diameter, quantity
- Project-specific dimensions:
  - Circular shapes: diameter, outerDiameter, innerDiameter
  - Curbs: curbDepth, gutterWidth, curbHeight, flagThickness
  - Stairs: run, rise, stairWidth, platformDepth, numberOfSteps
- Each dimension field has an associated unit field (e.g., `lengthUnit`, `widthUnit`)
- Multi-project calculators support per-dimension unit selection for flexibility

## Development Guidelines

When working with this codebase:

1. **Component Development:** Follow existing patterns in calculator components for state management, validation, and UI consistency. All interactive components must use 'use client' directive.

2. **Type Safety:** Use TypeScript interfaces for all component props, state, and calculation parameters. Path alias `@/*` maps to `./src/*`.

3. **Styling:** Use Tailwind 4 classes following the existing design system patterns. Maintain theme compatibility for dark/light modes using CSS custom properties.

4. **Calculator Logic:** When adding new project types or calculations, follow the existing pattern: validation → calculation → result formatting. Cement bag weight is standardized at 50kg.

5. **Internationalization:** The codebase contains Chinese comments in calculator files - maintain this bilingual approach when adding new features.

6. **Font System:** Uses Geist Sans and Geist Mono from next/font/google with CSS variables (--font-geist-sans, --font-geist-mono).

### Adding New Calculators

When creating a new calculator, follow this pattern:

1. **Create the component** (`src/components/new-calculator.tsx`):
   - Add `'use client'` directive at the top
   - Define TypeScript types: `ProjectType`, `UnitType`, `CalculationResult`, `ProjectParams`
   - Implement state management with useState for params and results
   - Create calculation function with proper unit conversions
   - Include reset and export/download functionality
   - Follow existing UI patterns (card layout, form structure, results display)

2. **Create the page** (`src/app/new-calculator/page.tsx`):
   - Import the calculator component
   - Add comprehensive metadata for SEO (title, description, keywords, OpenGraph, Twitter)
   - Structure the page with heading, description, calculator component, and optional FAQ section

3. **Update navigation** (if needed):
   - Add route to `src/components/navigation.tsx` navigation array
   - Add link to `src/components/footer.tsx` quick links section

4. **SEO Considerations**:
   - Each calculator page should have unique, descriptive metadata
   - Follow existing metadata patterns in `src/app/layout.tsx`
   - Include relevant keywords for search optimization