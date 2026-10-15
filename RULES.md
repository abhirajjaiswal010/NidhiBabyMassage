# Nidhi's Baby Massage — Development Rules & Engineering Standards

## 1. UI Quality Comes First
- Build a premium, warm, pastel-themed baby massage website.
- Prioritise visual hierarchy, spacing, typography, photography, and responsive layouts.
- Use smooth scroll reveals, subtle transitions, elegant hover effects, and polished mobile interactions.
- Never sacrifice visual quality just to simplify implementation.
- Avoid excessive animations, distracting effects, and unnecessary motion.

## 2. Keep the Architecture Simple
- Use React + Vite + JavaScript + Tailwind CSS.
- Prefer small, understandable components.
- Keep each component focused on one clear responsibility.
- Extract a component only when reuse, complexity, or readability justifies it.
- Avoid unnecessary providers, custom hooks, context, managers, factories, and abstraction layers.
- No backend, database, authentication, or state-management library unless an actual requirement emerges.

## 3. Write Human-Readable Tailwind
- Write short, logically grouped `className` expressions.
- Keep spacing, typography, colours, layout, and interaction styles easy to identify.
- Use Tailwind utilities directly for ordinary styling.
- Use line breaks for multi-attribute class lists to keep them easy to scan and edit.
- Define a small number of meaningful theme tokens in `tailwind.config.js` (`warm-ivory`, `muted-sage`, `dusty-peach`, `soft-terracotta`, `blush-pink`, `warm-charcoal`, `muted-brown`) instead of scattering arbitrary hex values.
- Avoid arbitrary values when a standard Tailwind utility or a meaningful design token works.

## 4. Smooth Animation Without Overengineering
Use the simplest tool that produces the desired effect:
- **Button hover & focus:** CSS transition
- **Card hover & image zoom:** CSS transition
- **Hero text entrance:** Framer Motion
- **Scroll-triggered section reveals:** Framer Motion (`whileInView`, `viewport: { once: true }`)
- **FAQ accordion:** Framer Motion `AnimatePresence` or CSS transition
- **Mobile navigation:** CSS transitions / Framer Motion
- **Decorative floating elements:** Lightweight CSS animation
- **Smooth anchor navigation:** Native CSS `scroll-behavior: smooth`
- Support `prefers-reduced-motion` at all times.

## 5. Keep Dependencies Under Control
Only install essentials:
- `react`, `react-dom`
- `lucide-react` (for clean, lightweight icons)
- `framer-motion` (for viewport reveals and smooth accordion)
- `tailwindcss`, `postcss`, `autoprefixer`

No heavy carousels, no state management libraries, no unnecessary utility libraries.

## 6. Incremental Vibe-Coding Workflow
1. **Plan:** Finalise the section, visual direction, content, and booking flow.
2. **Build:** Implement one meaningful section at a time.
3. **Inspect:** Run the website and evaluate the real rendered UI.
4. **Refine:** Improve spacing, typography, imagery, animation, and responsive behaviour.
5. **Verify:** Check console, responsiveness, accessibility, and booking actions.
6. **Clean up:** Remove dead code and unnecessary abstractions before moving on.

## 7. Business & Indore Focus
- Focus on converting Indore parents into genuine enquiries.
- Prominent WhatsApp booking & call triggers.
- Authentic tone: reassurance, hygiene, baby comfort, zero medical overclaims.
- Localized service areas in Indore (Vijay Nagar, Palasia, Saket, Rau, Bypass, Super Corridor, etc.).
