# Design System Inspired by This Is Menopause

## 1. Visual Theme & Atmosphere

This Is Menopause embodies a modern, approachable, and inclusive digital community designed to destigmatize menopause conversations. The visual identity balances professional expertise with warmth and relatability—combining bold, energetic purples and blues with clean, spacious layouts that feel inviting rather than clinical. The design prioritizes clarity and accessibility, using generous whitespace and straightforward navigation to make complex health information digestible. Photography and imagery emphasize real women's experiences and connection, while the typography conveys both confidence and empathy. The overall atmosphere is one of supportive intelligence: authoritative without being alarmist, modern without being cold, and distinctly designed for adult women seeking genuine guidance.

**Key Characteristics**

- Bold, vibrant accent colors (rich purple and cobalt blue) paired with dark navy anchors
- Clean, minimal layouts with generous whitespace and breathing room
- Rounded, soft corner radii that feel approachable and contemporary
- High-contrast text on light backgrounds for legibility and focus
- Organized hierarchy that guides users through complex health topics
- Warm, inclusive photography and illustrated elements
- Community-driven visual language emphasizing peer connection
- Accessible color and typography combinations throughout

## 2. Color Palette & Roles

### Primary

- **Navy Dark** (`#0D1B29`): Dominant text color, primary headings, body copy, high-confidence elements; creates strong visual foundation across the interface
- **Deep Navy** (`#071527`): Darkest brand element, used sparingly for maximum emphasis on critical content

### Accent Colors

- **Menopause Purple** (`#A441BC`): Brand signature accent, used for logo lockup, featured section highlights, and thematic brand moments; conveys energy and inclusion
- **Cobalt Blue** (`#0F57A8`): Secondary brand accent, primary interactive elements (buttons, links), calls-to-action; suggests trust and expertise
- **Light Periwinkle** (`#4F81E5`): Softer blue variant, hover states, secondary interactive treatments
- **Light Lavender** (`#DBE5F9`): Very light accent, background tints for informational sections, gentle visual separation

### Interactive

- **Primary CTA Blue** (`#0F57A8`): Main buttons, primary navigation links, primary actions
- **Secondary CTA Blue** (`#4F81E5`): Hover states, secondary actions, loading indicators
- **Ghost Link Blue** (`#0F57A8`): Text-only links with no background, underlined or inline styling

### Neutral Scale

- **Black** (`#000000`): Text hierarchy secondary, bold statements, dark mode considerations
- **Dark Gray** (`#626B74`): Secondary body text, muted captions, disabled states
- **Medium Gray** (`#666666`): Tertiary text, subtle annotations, hints
- **Light Gray** (`#999999`): Divider lines, very light UI elements
- **Lighter Gray** (`#C1C1C1`): Soft borders, light backgrounds
- **Pale Gray** (`#CCCCCC`): Input borders, light dividers
- **Softest Gray** (`#808080`): Alternative secondary text
- **White** (`#FFFFFF`): Primary background, card fills, contrast surfaces

### Surface & Borders

- **Light Border Gray** (`#DBDDDF`): Card borders, subtle dividers, form field separators; creates visual containment without heaviness
- **Input Border** (`#C1C1C1`): Form field borders, search input separators
- **Card Background** (`#FFFFFF`): Primary content containers, elevated surfaces

## 3. Typography Rules

### Font Family

**Primary:** Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif

**Secondary:** Times New Roman, Georgia, serif (minimal use for specific contexts)

**Monospace:** "Courier New", Courier, monospace (for code or technical snippets if needed)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / H1 | Lato | 28px | 600 | 36px | 0px | Hero headline, major section titles; bold and commanding presence |
| Heading / H2 | Lato | 20px | 600 | 24px | 0px | Section subheadings, card titles; clear hierarchy without overwhelming |
| Heading / H3 | Lato | 18px | 600 | 26px | 0px | Subsection titles, component headings; balance of prominence and readability |
| Body / Paragraph | Lato | 18px | 400 | 26px | 0px | Primary body text, form labels, content blocks; spacious line height aids readability |
| Body / Small | Lato | 16px | 400 | 16px | 0px | UI labels, metadata, caption text, secondary information; compact but clear |
| Button Text | Lato | 16px | 600 | 18px | 0px | Calls-to-action, button labels; weight increase adds visual emphasis |
| Link Text | Lato | 18px | 400 | 26px | 0px | Inline and standalone links; inherit body styling with color and underline override |
| Caption / Micro | Lato | 14px | 400 | 16px | 0px | Timestamps, bylines, small form hints; minimized but not cramped |

### Principles

- **Clarity over decoration:** Lato's geometric sans-serif ensures excellent legibility across sizes and contexts
- **Generous line height:** 1.3–1.5 ratio creates breathing room for complex health content
- **Weight hierarchy:** Only H1, H2, H3, and buttons use weight 600; body remains 400 for contrast and focus
- **Consistent metrics:** All sizes align to the 4px spacing grid for visual harmony
- **Accessible contrast:** All text meets WCAG AA standards (navy on white, dark gray on light backgrounds)

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `#0F57A8`
- **Text Color:** `#FFFFFF`
- **Font:** Lato, 16px, weight 600
- **Padding:** `16px 32px`
- **Border Radius:** `36px`
- **Border:** `1px solid #0F57A8`
- **Height:** 52px (minimum touch target)
- **Line Height:** 18px
- **Box Shadow:** `none`
- **Hover State:** Background `#0D4A8C`, border `#0D4A8C`, text `#FFFFFF`
- **Active State:** Background `#0A3A6F`, border `#0A3A6F`, text `#FFFFFF`
- **Disabled State:** Background `#D4D4D4`, border `#D4D4D4`, text `#999999`

#### Secondary Button
- **Background:** `#FFFFFF`
- **Text Color:** `#0F57A8`
- **Font:** Lato, 16px, weight 600
- **Padding:** `16px 32px`
- **Border Radius:** `36px`
- **Border:** `1px solid #0F57A8`
- **Height:** 52px
- **Line Height:** 18px
- **Box Shadow:** `none`
- **Hover State:** Background `#F0F4F9`, border `#0D4A8C`, text `#0D4A8C`
- **Active State:** Background `#DBE5F9`, border `#0A3A6F`, text `#0A3A6F`
- **Disabled State:** Background `#FFFFFF`, border `#D4D4D4`, text `#999999`

#### Ghost Button
- **Background:** transparent
- **Text Color:** `#0F57A8`
- **Font:** Lato, 16px, weight 400
- **Padding:** `0px 0px`
- **Border Radius:** `0px`
- **Border:** `none`
- **Height:** auto
- **Line Height:** 18px
- **Box Shadow:** `none`
- **Hover State:** Text Color `#0D4A8C`, underline `1px solid #0D4A8C`
- **Active State:** Text Color `#0A3A6F`, underline `1px solid #0A3A6F`

#### Icon Button (Small)
- **Background:** `#F3F4F4`
- **Text Color:** `#929899`
- **Font Size:** 16px
- **Padding:** `0px 0px`
- **Border Radius:** `36px`
- **Border:** `1px solid transparent`
- **Height:** 32px
- **Width:** 32px
- **Box Shadow:** `none`
- **Hover State:** Background `#E8EAEB`, text `#626B74`
- **Active State:** Background `#D4D7D9`, text `#0D1B29`

### Cards & Containers

#### Standard Card
- **Background:** `#FFFFFF`
- **Text Color:** `#0D1B29`
- **Font:** Lato, 18px, weight 400
- **Padding:** `24px 24px 24px 24px`
- **Border Radius:** `16px`
- **Border:** `1px solid #DBDDDF`
- **Box Shadow:** `none` (or `rgb(219, 221, 223) 0px 0px 16px 0px` on hover/elevated state)
- **Line Height:** 26px
- **Hover State:** Box Shadow `rgb(219, 221, 223) 0px 2px 16px 0px`

#### Content Card with Image
- **Background:** `#FFFFFF`
- **Border Radius:** `16px` for the container; `16px 16px 0px 0px` for image top corners
- **Padding:** `0px` (image flush to top), `24px` for text content below
- **Border:** `1px solid #DBDDDF`
- **Box Shadow:** `rgb(219, 221, 223) 0px 0px 16px 0px`

#### Section Container
- **Background:** `#FFFFFF` or transparent
- **Padding:** `60px 48px 60px 48px`
- **Border Radius:** `0px` (full-width sections)
- **Border:** `none`
- **Max Width:** 1440px (centered with auto margins)

#### Q&A / Question Card
- **Background:** `#FFFFFF`
- **Text Color:** `#0D1B29`
- **Font:** Lato, 18px, weight 400
- **Padding:** `24px 24px`
- **Border Radius:** `16px`
- **Border:** `1px solid #DBDDDF`
- **Box Shadow:** `rgb(219, 221, 223) 0px 0px 16px 0px`
- **Hover State:** Border color `#C1C1C1`, box shadow enhanced

### Inputs & Forms

#### Text Input (Search / Standard)
- **Background:** `#FFFFFF`
- **Text Color:** `#0D1B29`
- **Font:** Lato, 18px, weight 400
- **Padding:** `0px 13.5px` (horizontal), `0px` (vertical, height set explicitly)
- **Border Radius:** `36px` or `36px 0px 0px 36px` (for search input with button)
- **Border:** `1px solid #C1C1C1`
- **Height:** 40px
- **Width:** 250px (or 360px for full search bar)
- **Line Height:** 22px
- **Placeholder Color:** `#999999`
- **Focus State:** Border `1px solid #0F57A8`, box shadow `0px 0px 8px rgba(15, 87, 168, 0.2)`
- **Disabled State:** Background `#F3F4F4`, border `#D4D4D4`, text `#999999`
- **Error State:** Border `1px solid #D9534F`, box shadow `0px 0px 8px rgba(217, 83, 79, 0.2)`

#### Textarea
- **Background:** `#FFFFFF`
- **Text Color:** `#0D1B29`
- **Font:** Lato, 16px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #C1C1C1`
- **Min Height:** 120px
- **Line Height:** 22px
- **Resize:** vertical
- **Focus State:** Border `1px solid #0F57A8`, box shadow `0px 0px 8px rgba(15, 87, 168, 0.2)`

#### Form Label
- **Font:** Lato, 16px, weight 600
- **Color:** `#0D1B29`
- **Margin Bottom:** `8px`
- **Display:** block

#### Helper Text / Form Hint
- **Font:** Lato, 14px, weight 400
- **Color:** `#626B74`
- **Margin Top:** `4px`
- **Line Height:** 16px

### Navigation

#### Top Navigation Bar
- **Background:** `#FFFFFF` (with subtle bottom border `1px solid #DBDDDF`)
- **Height:** 64px
- **Padding:** `0px 48px`
- **Display:** flex, align-items center, justify-content space-between

#### Navigation Link (Text)
- **Font:** Lato, 18px, weight 400
- **Color:** `#0D1B29`
- **Text Decoration:** none
- **Padding:** `8px 0px`
- **Border Bottom:** `2px solid transparent`
- **Hover State:** Color `#0F57A8`, border-bottom `2px solid #0F57A8`
- **Active State:** Color `#0F57A8`, border-bottom `2px solid #0F57A8`

#### Dropdown Navigation
- **Background:** `#FFFFFF`
- **Border:** `1px solid #DBDDDF`
- **Border Radius:** `8px`
- **Padding:** `12px 0px`
- **Box Shadow:** `rgb(219, 221, 223) 0px 0px 16px 0px`
- **Z Index:** 100
- **Min Width:** 200px

#### Dropdown Item
- **Font:** Lato, 16px, weight 400
- **Color:** `#0D1B29`
- **Padding:** `12px 16px`
- **Hover State:** Background `#F0F4F9`, color `#0F57A8`

### Badges

#### Badge (Informational)
- **Background:** `#DBE5F9`
- **Text Color:** `#0F57A8`
- **Font:** Lato, 12px, weight 600
- **Padding:** `4px 8px`
- **Border Radius:** `2px`
- **Border:** `1px solid #4F81E5`
- **Display:** inline-block

#### Badge (Primary)
- **Background:** `#A441BC`
- **Text Color:** `#FFFFFF`
- **Font:** Lato, 12px, weight 600
- **Padding:** `4px 8px`
- **Border Radius:** `2px`
- **Border:** `1px solid #A441BC`

### Tabs

#### Tab Container
- **Background:** `#FFFFFF`
- **Border Bottom:** `1px solid #DBDDDF`
- **Display:** flex
- **Height:** 48px

#### Tab Button
- **Font:** Lato, 16px, weight 400
- **Color:** `#626B74`
- **Background:** transparent
- **Padding:** `12px 20px`
- **Border:** none
- **Border Bottom:** `2px solid transparent`
- **Cursor:** pointer
- **Hover State:** Color `#0D1B29`, border-bottom `2px solid #DBDDDF`
- **Active State:** Color `#0F57A8`, border-bottom `2px solid #0F57A8`

## 5. Layout Principles

### Spacing System

**Base Unit:** 4px

**Scale:**
- 4px: Micro spacing (text kerning, tight padding)
- 8px: Dense spacing (button internal, form hints)
- 12px: Compact spacing (form margins, list gaps)
- 16px: Standard spacing (component gaps, medium padding)
- 20px: Comfortable spacing (input/form padding)
- 24px: Standard padding (card content, section padding)
- 28px: Accent spacing (heading margins)
- 32px: Section gaps (between content blocks)
- 36px: Large margins (related section separations)
- 48px: Generous padding (page margins, container sides)
- 60px: Maximum section padding (hero and major sections)
- 180px: Extra-large margin (page breaks, major layout shifts)

**Usage Context:**
- Micro (4–8px): Form field internals, text spacing, tight component margins
- Comfortable (12–24px): Card padding, input fields, button groups
- Section (28–60px): Between major sections, page margins, hero spacing
- Break (180px): Full-page layout transitions

### Grid & Container

- **Max Width:** 1440px (main content container)
- **Page Padding:** `48px` left and right (reducing to `24px` on tablet, `16px` on mobile)
- **Column Strategy:** 12-column grid for flexibility; major sections typically span 12 columns
- **Gutter:** `16px` between columns (doubled to `32px` for major content blocks)
- **Section Patterns:**
  - Full-width hero with max-width centered text overlay
  - Card grids using 3–4 columns on desktop, 2 on tablet, 1 on mobile
  - List sections with consistent left alignment and staggered cards
  - Hero + Content + CTA pattern for landing sections

### Whitespace Philosophy

Generous, intentional whitespace is central to This Is Menopause' approachability. Large margins (36–60px) between major sections prevent information overload and create visual rest points. Padding within cards (24px) and sections (48–60px) ensures content doesn't feel cramped. Navigation and CTAs benefit from breathing room (8–12px internal padding), making them feel inviting rather than dense. The overall density is low: content never exceeds 60–70% of viewport height on larger screens, forcing vertical scrolling and discovery.

### Border Radius Scale

- **2px:** Badges, tags, micro components (tight, precise feel)
- **8px:** Modals, dropdowns, secondary containers (approachable but structured)
- **16px:** Cards, content containers, standard surfaces (warm and modern)
- **36px:** Buttons, inputs, primary interactive elements (maximally rounded, touchable feel)
- **0px:** Full-width sections, section dividers, structural elements (clean edges)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Base (0) | No shadow, solid background, 1px border `#DBDDDF` | Cards at rest, inputs, standard surfaces |
| Raised (1) | `rgb(219, 221, 223) 0px 0px 16px 0px` | Hovered cards, floating action buttons, popovers |
| Floating (2) | `rgb(219, 221, 223) 0px 4px 24px 0px` | Modals, dropdowns, overlays, toast notifications |
| Overlay (3) | `rgb(219, 221, 223) 0px 8px 32px 0px` with semi-transparent dark backdrop | Full-screen modals, dialogs, critical overlays |

**Shadow Philosophy:** This Is Menopause uses subtle, minimal shadows based on neutral grays rather than black. Shadows are understated and serve functional purposes (elevation clarification) rather than aesthetic impact. All shadows use the same gray tone (`rgb(219, 221, 223)`) for consistency. Shadows increase in vertical offset and blur radius as elevation increases, but never dominate the interface. The design prioritizes clarity and cleanliness over dramatic depth effects.

## 7. Do's and Don'ts

### Do

- **Use navy (`#0D1B29`) for primary headings and body text.** It's the brand anchor and ensures readability and trust.
- **Accent interactive elements with cobalt blue (`#0F57A8`) or purple (`#A441BC`).** These colors signal engagement and brand identity.
- **Maintain 24px–60px padding in card and section containers.** Whitespace is essential to the brand's approachability.
- **Use Lato at 18px for body text with 26px line height.** This specific combination ensures the content feels accessible without being patronizing.
- **Apply `36px` border radius to all buttons and primary inputs.** This soft, rounded aesthetic is key to the friendly-expert tone.
- **Implement full-width sections with centered max-width containers.** This creates visual breathing room while maintaining focus.
- **Use subtle shadows (`rgb(219, 221, 223)`) only for elevation and clarity.** Shadows should never dominate or feel heavy.
- **Test all text on white backgrounds for WCAG AA contrast ratios.** Accessibility is non-negotiable for health content.
- **Group related elements with consistent padding and subtle borders.** Visual hierarchy must be immediate and clear.

### Don't

- **Don't use pure black (`#000000`) for primary body text.** Navy (`#0D1B29`) is warmer and more approachable while maintaining contrast.
- **Don't exceed 60px of horizontal padding on desktop.** Content should not feel boxed-in or cramped.
- **Don't use sharp corners (0px radius) on interactive elements.** Buttons and inputs must feel soft and inviting.
- **Don't mix multiple shadow values inconsistently.** Use only the defined levels (Base, Raised, Floating, Overlay) for clarity.
- **Don't apply color overlays or filters to photography.** Real images of women should remain authentic and unfiltered.
- **Don't reduce line-height below 1.3x (26px for 18px body text).** Complex health content requires generous spacing for clarity.
- **Don't use font weights below 400 or above 600 for body content.** This range maintains hierarchy and readability.
- **Don't create hover states with color changes alone.** Combine color changes with subtle shadow, border, or background shifts for multi-sensory feedback.
- **Don't nest modals or create complex overlay hierarchies.** Single-layer overlays maintain clarity and reduce cognitive load.
- **Don't use accent colors (purple, blue) for body text.** Reserve them exclusively for interactive elements and brand moments.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–639px | Single column, 16px page padding, 20px section padding, font sizes reduce by 2px, collapsed navigation |
| Tablet | 640px–1023px | 2-column grid, 24px page padding, 24px section padding, font sizes reduce by 1–2px, hamburger menu primary |
| Desktop | 1024px–1439px | 3–4 column grid, 48px page padding, 48px–60px section padding, full font hierarchy, full navigation bar |
| Wide | 1440px+ | 12-column grid with centered max-width container, full spacing, optional sidebar or additional columns |

### Touch Targets

- **Minimum Size:** 44px × 44px for all interactive elements (buttons, links, form controls)
- **Minimum Spacing:** 8px between adjacent touch targets to prevent accidental interaction
- **Button Height:** 52px standard (40px for compact variants in forms)
- **Button Width:** 32px–120px depending on label length (full-width on mobile)
- **Icon Size:** 24px minimum for touch-friendly icons
- **Form Input Height:** 40px minimum for keyboard visibility and touch accessibility

### Collapsing Strategy

- **Hero Sections:** Text and CTA stack vertically; image moves below text on mobile
- **Card Grids:** 4 columns → 2 columns (tablet) → 1 column (mobile)
- **Navigation:** Full horizontal menu bar → hamburger icon + slide-out drawer on tablet/mobile
- **Forms:** Side-by-side labels → stacked labels (font size remains constant)
- **Padding:** 48px–60px desktop → 24px tablet → 16px mobile (maintains breathing room)
- **Typography:** H1 28px → 24px (tablet) → 20px (mobile); body 18px → 16px (mobile)
- **Images:** Full aspect ratio on desktop → constrained to 100% width on mobile, max-height adjustments
- **Buttons:** Fixed width on desktop → full-width on mobile (except icon buttons)

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Cobalt Blue (`#0F57A8`)
- **Primary CTA (Hover):** Dark Cobalt (`#0D4A8C`)
- **Secondary CTA:** Menopause Purple (`#A441BC`)
- **Background (Card/Surface):** White (`#FFFFFF`)
- **Background (Page):** White (`#FFFFFF`)
- **Primary Text:** Navy Dark (`#0D1B29`)
- **Secondary Text:** Dark Gray (`#626B74`)
- **Tertiary Text:** Medium Gray (`#666666`)
- **Borders & Dividers:** Light Gray (`#DBDDDF`)
- **Input Borders:** Light Gray (`#C1C1C1`)
- **Brand Accent (Logo/Highlight):** Menopause Purple (`#A441BC`)
- **Disabled State:** Pale Gray (`#D4D4D4`)
- **Error State:** Deep Red (`#D9534F`)

### Iteration Guide

1. **All primary headings and body text must use navy `#0D1B29` on white `#FFFFFF` backgrounds** for trust, legibility, and brand consistency.

2. **Interactive elements (buttons, links, form inputs) default to cobalt blue `#0F57A8` with white `#FFFFFF` text.** Hover states shift to `#0D4A8C`; disabled states use `#D4D4D4`.

3. **Card and container padding is always 24px minimum.** Section padding is 48px–60px. Full-width sections have centered max-width containers (1440px) with auto side margins.

4. **Typography must follow the defined hierarchy: H1 28px/600, H2 20px/600, Body 18px/400, Caption 14px/400.** All fonts are Lato; line-height is 1.3x–1.5x font size.

5. **All buttons and primary inputs use 36px border-radius.** Buttons are minimum 52px height; inputs are 40px height. Padding is 16px horizontal and 0px vertical (height is explicit).

6. **Shadows are subtle and limited: base (0px), raised (`rgb(219, 221, 223) 0px 0px 16px 0px`), floating (`rgb(219, 221, 223) 0px 4px 24px 0px`).** Never use black or strong shadows.

7. **Whitespace is abundant: 36px–60px between major sections, 24px internal card padding, 8px between UI elements.** Low visual density creates approachability.

8. **Focus and hover states must include visual feedback beyond color: combine color change with shadow shift or border enhancement.** Example: button hover adds `0px 0px 8px rgba(15, 87, 168, 0.2)` shadow.

9. **All text must meet WCAG AA contrast ratios.** Navy on white, dark gray on white, and cobalt blue on white all pass. Avoid light text on light backgrounds.

10. **Responsive breakpoints: Mobile 320–639px (1 column, 16px padding), Tablet 640–1023px (2 columns, 24px padding), Desktop 1024px+ (3–4 columns, 48px padding).** Font sizes and card grid counts adjust per breakpoint.

11. **Form labels are Lato 16px/600 in navy, placed above inputs with 8px margin-bottom.** Helper text is Lato 14px/400 in dark gray, placed below inputs with 4px margin-top.

12. **Navigation links are 18px/400 navy; active links have a 2px solid cobalt blue underline.** Dropdown items use 16px/400 with hover background `#F0F4F9`.

13. **Accent purple `#A441BC` is reserved for brand moments (logo, featured highlights, secondary CTAs).** It is not used for body text or background fills—only highlights.

14. **All borders and dividers default to `#DBDDDF` (light gray).** Input borders use `#C1C1C1` (slightly darker). Stroked elements follow the 1px standard.

15. **Card hover states add the raised shadow (`rgb(219, 221, 223) 0px 0px 16px 0px`) and do not change background color.** This maintains visual clarity while signaling interactivity.