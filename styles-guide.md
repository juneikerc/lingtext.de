# LingText — Style Guide (UI)

This document defines practical rules for maintaining a **clean and
professional** style across the entire UI.

## Principles

- **Neutrals first**: most surfaces should be gray/white, with matching dark
  mode equivalents.
- **A single accent color**: use **indigo** for primary actions, links, and
  emphasis.
- **Gradients: almost never**: avoid `bg-gradient-*` and gradient-based
  `bg-clip-text` in headings or buttons. If you need more visual interest, use
  subtle low-opacity _blobs_.
- **Subtle motion**: avoid `hover:scale-*` and flashy transforms. Prefer color,
  border, and soft shadow changes.
- **Accessibility by default**: use `focus-visible` states, proper contrast, and
  comfortable touch targets.

---

## Recommended tokens (Tailwind)

### Background and sections

- **Page / base section**
  - `bg-white dark:bg-gray-950`
- **Alternate section** (to separate blocks)
  - `bg-gray-50 dark:bg-gray-950`
- **Section dividers**
  - `border-b border-gray-200 dark:border-gray-800`

### Surfaces (cards)

- **Standard card**
  - `bg-white dark:bg-gray-900`
  - `border border-gray-200 dark:border-gray-800`
  - `shadow-sm`

### Text

- **Headings**
  - `text-gray-900 dark:text-gray-100`
- **Body**
  - `text-gray-600 dark:text-gray-400`
- **Secondary text**
  - `text-gray-500 dark:text-gray-400`

### Brand accent (indigo)

- **Accent text**
  - `text-indigo-600 dark:text-indigo-400`
- **Accent background (primary CTA)**
  - `bg-indigo-600 hover:bg-indigo-700 text-white`
- **Focus ring (standard)**
  - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950`

### Semantic colors (specific use only)

- **Warning / sensitive action** (e.g. import backup)
  - `bg-amber-600 hover:bg-amber-700 text-white`
  - Ring: `focus-visible:ring-amber-500`
- **Danger** (delete, destructive actions)
  - `bg-red-600 hover:bg-red-700 text-white` or neutral buttons with
    `text-red-700` + `bg-red-50`

---

## Component patterns (base classes)

### Section wrapper

Recommendation (standard section):

```txt
relative overflow-hidden py-16 sm:py-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800
```

Recommendation (alternate section):

```txt
relative overflow-hidden py-16 sm:py-20 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800
```

### Decorative blobs (optional)

Only as subtle decoration with low opacity:

```txt
absolute inset-0 pointer-events-none
```

```txt
bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl
bg-sky-500/10 dark:bg-sky-400/5 rounded-full blur-3xl
```

Rules:

- Do not use more than 2 blobs per section.
- Keep opacity low (for example `/10` or `/5` in dark mode).
- Avoid gradients in blobs.

### Card

```txt
bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm
hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-200
```

### Badge / pill

```txt
inline-flex items-center px-4 py-2 text-sm font-medium
bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300
border border-gray-200 dark:border-gray-800 rounded-full
```

With dot:

```txt
w-2 h-2 bg-indigo-500 rounded-full mr-2
```

### Buttons

**Primary (CTA)**

```txt
inline-flex items-center justify-center
px-6 py-3 rounded-lg
bg-indigo-600 text-white font-medium
hover:bg-indigo-700 transition-colors duration-200
shadow-sm hover:shadow-md
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950
```

**Secondary (surface)**

```txt
inline-flex items-center justify-center
px-6 py-3 rounded-lg
bg-white dark:bg-gray-900
text-gray-700 dark:text-gray-200
border border-gray-300 dark:border-gray-700
hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950
```

**Icon button (icon only)**

- Must include `title` and/or `aria-label`.
- Use a neutral surface:

```txt
p-3 rounded-xl bg-gray-50 dark:bg-gray-800
text-gray-700 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
```

---

## Forms

### Input / textarea

```txt
w-full px-4 py-3 rounded-xl
border border-gray-300 dark:border-gray-700
bg-gray-50 dark:bg-gray-800
text-gray-900 dark:text-gray-100
placeholder-gray-500 dark:placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
transition-all duration-200
```

Notes:

- Avoid translucent backgrounds like `bg-white/80` except for overlays.
- Avoid `backdrop-blur-*` unless there is a real need for it, such as modals or
  very limited glass effects.

## Shadows, borders, and transitions

- **Shadows**
  - Default: `shadow-sm`
  - Hover: `hover:shadow-md`
  - Avoid `shadow-xl` and `shadow-2xl` on normal cards.

- **Transitions**
  - Prefer `transition-colors duration-200`
  - If shadow/border also changes: `transition duration-200`
  - Avoid `transform hover:scale-*` on buttons/cards. If used, it should be an
    exception.

---

## Dark mode

Rules:

- Always pair:
  - Background: `bg-*` + `dark:bg-*`
  - Text: `text-*` + `dark:text-*`
  - Borders: `border-*` + `dark:border-*`

Goal:

- Maintain enough contrast, especially for secondary text.

---

## Accessibility (checklist)

- **Visible focus** on links, buttons, and inputs.
- **Icon-only buttons**: include `aria-label`.
- **Targets**: use `py-3/py-4` on primary action buttons.
- **Do not rely only on color** to communicate state; use text, icons, or
  labels.
- Consider `motion-reduce:*` if animations are added.

---

## Quick checklist before shipping a change

- [ ] I did not introduce `bg-gradient-*` on primary surfaces.
- [ ] I used `indigo` as the main accent color, and semantic colors only when
      needed.
- [ ] Cards and sections use soft borders/shadows, not `shadow-xl`.
- [ ] I did not add `hover:scale-*` unless there was a justified need.
- [ ] I added `focus-visible` to interactive elements.
- [ ] I verified dark mode for background, text, and borders.
