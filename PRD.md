# Planning Guide

An arcade-styled battle arena where two GitHub users face off by comparing their contribution graphs in a visually exciting, game-like interface.

**Experience Qualities**:
1. **Energetic** - Bold colors, dynamic animations, and punchy visual feedback that makes comparison feel like an exciting competition
2. **Playful** - Game-inspired UI elements like VS screens, score displays, and winner announcements that transform dry statistics into entertainment
3. **Immediate** - Instant visual clarity about who's winning in different metrics with at-a-glance comparison elements

**Complexity Level**: Light Application (multiple features with basic state)
  - Features user input, data visualization, comparison logic, and state management for multiple views, but maintains focused scope with dummy data

## Essential Features

### User Selection
- **Functionality**: Input fields for two GitHub usernames with avatars and basic profile info
- **Purpose**: Set up the comparison matchup in a game-like VS screen format
- **Trigger**: User enters usernames in left/right player slots
- **Progression**: Empty state → Username input → Avatar/name display → Ready for battle
- **Success criteria**: Both users displayed with clear visual separation (left vs right)

### Contribution Graph Visualization
- **Functionality**: Side-by-side or overlaid heatmap-style contribution calendars with activity data
- **Purpose**: Show the primary comparison metric in a familiar GitHub-style visualization
- **Trigger**: Automatically displayed once users are selected
- **Progression**: User selection → Generate dummy contribution data → Render dual calendars → Highlight differences
- **Success criteria**: Clear visual representation of activity patterns with color intensity showing contribution levels

### Stats Comparison Panel
- **Functionality**: Display key metrics (total contributions, longest streak, current streak, best day) for both users
- **Purpose**: Provide quick numerical comparison across multiple dimensions
- **Trigger**: Calculated from contribution data and displayed alongside graphs
- **Progression**: Data generation → Calculate stats → Display in arcade-style stat cards → Animate score reveals
- **Success criteria**: Metrics clearly labeled with visual indicators showing which user leads in each category

### Winner Declaration
- **Functionality**: Algorithm determines overall winner based on weighted metrics with celebratory animation
- **Purpose**: Provide satisfying conclusion to the comparison with clear result
- **Trigger**: After all data is displayed and calculated
- **Progression**: Metric calculation → Determine winner → Animate winner banner → Display victory message
- **Success criteria**: Clear, unmistakable winner announcement with visual celebration

## Edge Case Handling

- **Empty username fields**: Show placeholder state with "Enter players" prompt and disabled compare button
- **Single username entered**: Allow partial display or prompt for second username to enable comparison
- **Reset/New comparison**: Provide clear button to reset and start new battle
- **Responsive mobile**: Stack users vertically on mobile instead of side-by-side layout

## Design Direction

The design should evoke the feeling of a retro arcade cabinet merged with modern neon aesthetics—playful and energetic like a fighting game character select screen, with pixel-perfect attention to competitive stats. Rich interface serves the arcade theme with bold visual elements, glowing effects, and dramatic comparisons.

## Color Selection

Triadic color scheme creating high-energy competitive atmosphere with distinct team colors for each user while maintaining readability.

- **Primary Color**: Electric Blue (oklch(0.6 0.25 250)) - Represents player 1 side, conveys digital/tech energy and competitive spirit
- **Secondary Colors**: 
  - Hot Pink/Magenta (oklch(0.65 0.28 340)) - Represents player 2 side, creates strong contrast and arcade vibrancy
  - Deep Purple (oklch(0.35 0.15 290)) - Background elements and cards, ties the triadic scheme together
- **Accent Color**: Neon Yellow-Green (oklch(0.85 0.22 130)) - Winner highlights, CTAs, and attention elements
- **Foreground/Background Pairings**:
  - Background (Deep Space oklch(0.15 0.02 280)): Light text (oklch(0.98 0.01 280)) - Ratio 16.8:1 ✓
  - Card (Darker Purple oklch(0.25 0.08 290)): Light text (oklch(0.98 0.01 280)) - Ratio 12.3:1 ✓
  - Primary (Electric Blue oklch(0.6 0.25 250)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Hot Pink oklch(0.65 0.28 340)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓
  - Accent (Neon Yellow-Green oklch(0.85 0.22 130)): Dark text (oklch(0.2 0.02 130)) - Ratio 11.8:1 ✓
  - Muted (Medium Purple oklch(0.45 0.1 285)): Light text (oklch(0.98 0.01 280)) - Ratio 7.1:1 ✓

## Font Selection

Typefaces should balance retro gaming energy with modern readability—using a bold geometric sans-serif for headings that evokes arcade cabinets, paired with a clean sans-serif for stats and body text.

- **Typographic Hierarchy**:
  - H1 (Battle Title "VS"): Orbitron Bold/72px/tight letter-spacing: 0.05em - Arcade display feel
  - H2 (Player Names): Orbitron Bold/32px/letter-spacing: 0.02em - Bold identity
  - H3 (Section Headers): Orbitron SemiBold/24px/normal - Category labels
  - Stats (Large Numbers): Orbitron Bold/36px/tight - Scoreboard emphasis
  - Body (Labels/Descriptions): Inter Medium/16px/normal line-height: 1.5 - Readable supporting text
  - Small (Metadata): Inter Regular/14px/normal - Secondary information

## Animations

Animations should feel punchy and game-like with quick snappy transitions that reward user actions, balanced with smooth data visualizations that make numbers feel alive—think arcade cabinet attract mode meeting smooth modern UI.

- **Purposeful Meaning**: Motion reinforces the competitive arcade atmosphere—scores count up, winners get spotlight effects, VS screen has dramatic reveal, contribution squares pulse with activity
- **Hierarchy of Movement**: Winner announcement gets most dramatic animation (scale + glow), stat comparisons get attention with staggered reveals, contribution graphs animate on load with cascade effect, subtle hover states on interactive elements

## Component Selection

- **Components**: 
  - Card (for user profiles and stat panels) - Heavy use with neon border glows via custom border colors
  - Input (for username entry) - Modified with glowing focus states and arcade-style borders
  - Button (for compare/reset actions) - Primary button with neon accent color and hover glow effects
  - Avatar (for user profile pictures) - Large circular avatars with colored ring borders matching team colors
  - Badge (for stats and metrics) - Styled with bright backgrounds for category labels
  - Separator (for dividing sections) - Glowing divider lines with gradient effects
  
- **Customizations**: 
  - Contribution calendar grid component (custom) - Heatmap squares with hover tooltips
  - VS divider component (custom) - Animated "VS" text with lightning bolt or versus symbol
  - Winner banner component (custom) - Full-width celebration banner with confetti or glow effects
  - Stat card component (custom) - Numeric displays with leader indicators
  
- **States**: 
  - Buttons: Rest (neon glow), Hover (intensified glow + scale 1.05), Active (pressed scale 0.95), Focus (ring glow)
  - Inputs: Rest (subtle border), Focus (bright neon border + outer glow), Filled (maintained glow), Error (red glow)
  - Cards: Default (subtle border), Leader state (winning side gets enhanced glow)
  - Contribution squares: Empty (dark), Low activity (dim color), High activity (bright saturated), Hover (scale + tooltip)
  
- **Icon Selection**: 
  - Trophy (for winner) - Phosphor Trophy icon
  - Lightning bolt (for VS divider) - Phosphor Lightning icon
  - Fire (for streak indicators) - Phosphor Fire icon
  - Calendar (for contribution sections) - Phosphor CalendarBlank icon
  - ArrowsClockwise (for reset) - Phosphor ArrowsClockwise icon
  - User (for profile placeholders) - Phosphor User icon
  
- **Spacing**: 
  - Card padding: p-6 (24px) for comfortable content breathing room
  - Section gaps: gap-8 (32px) between major sections for clear separation
  - Stat item gaps: gap-4 (16px) within related stat groups
  - Grid gaps: gap-1 (4px) for contribution squares to maintain density while showing boundaries
  - Page margins: px-4 md:px-8 for responsive edge spacing
  
- **Mobile**: 
  - Stack user cards vertically instead of side-by-side on screens < 768px
  - VS divider rotates 90° to horizontal separator between stacked users
  - Contribution grids scale down with smaller squares on mobile
  - Stats panel converts from multi-column to single column stack
  - Font sizes reduce by 1 scale step (H1: 48px, H2: 24px, etc.)
