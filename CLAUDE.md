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

## Project Architecture

This is a Next.js 15 concrete calculator web application built with React 19, TypeScript, and Tailwind CSS 4.

### Key Architecture Patterns

**App Router Structure:** Uses Next.js App Router with file-based routing in `src/app/`
- `/` - Home page (src/app/page.tsx)
- `/calculator/` - General calculator page
- `/slab-calculator/` - Specialized slab calculator
- `/about/` - About page

**Component Organization:**
- `src/components/` - Reusable React components
- All components are client-side ('use client' directive) for interactivity
- Components use TypeScript interfaces for props and state
- Consistent naming: kebab-case for files, PascalCase for component names

**Calculator Architecture:**
- Two main calculator components:
  - `concrete-calculator.tsx` - General purpose calculator supporting multiple project types (rectangular, driveway, foundation, floor, column, wall, stairs)
  - `slab-calculator.tsx` - Specialized calculator for rectangular slabs with enhanced validation and thickness recommendations
- Both calculators share similar patterns:
  - State management with React hooks (useState, useCallback)
  - Form validation with error handling
  - Unit conversion (metric/imperial for slab-calculator, multiple units for concrete-calculator)
  - Material quantity calculations based on concrete grades (C15-C40)
  - Export functionality for results (TXT for concrete-calculator, JSON for slab-calculator)
- Key differences:
  - `concrete-calculator.tsx` supports 7 different project types with dynamic form fields
  - `slab-calculator.tsx` focuses on slabs only but provides thickness recommendations and warnings

**Theming & UI:**
- Uses `next-themes` for dark/light mode support
- Tailwind CSS 4 with CSS custom properties for theming
- Components include: Navigation, Breadcrumb, Footer, ThemeToggle, ThemeProvider
- Lucide React icons throughout
- Design follows shadcn/ui-style component patterns

**SEO Optimization:**
- Comprehensive metadata in root layout (src/app/layout.tsx)
- Structured data (JSON-LD) for WebApplication schema
- OpenGraph and Twitter meta tags
- Google Analytics integration via @next/third-parties (GA ID placeholder: G-XXXXXXXXXX)
- Robots meta tags configured for indexing

### Data Models

**Concrete Ratios:** Predefined ratios (per cubic meter) for different concrete grades:
- C15-C40 grades with specific cement, sand, gravel, and water quantities
- Identical ratio data used across both calculators

**Calculation Results:**
- `CalculationResult` interface (concrete-calculator): volume, volumeImperial, cement, cementBags, sand, gravel, water, totalCost
- `SlabCalculationResult` interface (slab-calculator): adds area and thicknessRecommendation fields

**Project Parameters:**
- Dynamic based on project type (length/width/height for rectangular, diameter/height for column, steps/dimensions for stairs)
- Each dimension has its own unit selector in concrete-calculator
- Unified unit system (metric/imperial) in slab-calculator

## Development Guidelines

When working with this codebase:

1. **Component Development:** Follow existing patterns in calculator components for state management, validation, and UI consistency. All interactive components must use 'use client' directive.

2. **Type Safety:** Use TypeScript interfaces for all component props, state, and calculation parameters. Path alias `@/*` maps to `./src/*`.

3. **Styling:** Use Tailwind 4 classes following the existing design system patterns. Maintain theme compatibility for dark/light modes using CSS custom properties.

4. **Calculator Logic:** When adding new project types or calculations, follow the existing pattern: validation → calculation → result formatting. Cement bag weight is standardized at 50kg.

5. **Internationalization:** The codebase contains Chinese comments in calculator files - maintain this bilingual approach when adding new features.

6. **Font System:** Uses Geist Sans and Geist Mono from next/font/google with CSS variables (--font-geist-sans, --font-geist-mono).