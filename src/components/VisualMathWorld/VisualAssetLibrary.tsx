import React from 'react';

export type VisualCategory = 'fruits' | 'food' | 'animals' | 'toys' | 'everyday' | 'nature' | 'math';

export type VisualAssetType =
  // Fruits
  | 'apple'
  | 'banana'
  | 'orange'
  | 'mango'
  | 'strawberry'
  | 'grapes'
  | 'watermelon'
  | 'pineapple'
  | 'lemon'
  | 'cherry'
  | 'pear'
  // Food
  | 'cookie'
  | 'cupcake'
  | 'chocolate'
  | 'pizza'
  | 'bread'
  | 'donut'
  | 'carrot'
  // Animals
  | 'cat'
  | 'dog'
  | 'rabbit'
  | 'bird'
  | 'fish'
  | 'butterfly'
  | 'turtle'
  | 'elephant'
  // Toys
  | 'block'
  | 'car'
  | 'train'
  | 'ball'
  | 'kite'
  | 'teddy'
  | 'rocket'
  // Everyday
  | 'book'
  | 'pencil'
  | 'eraser'
  | 'ruler'
  | 'backpack'
  // Nature
  | 'flower'
  | 'leaf'
  | 'cloud'
  | 'star'
  | 'sun'
  // Math
  | 'dice'
  | 'coin1'
  | 'coin2'
  | 'coin5'
  | 'coin10'
  | 'coin20'
  | 'clock';

export interface VisualAssetMeta {
  id: VisualAssetType;
  category: VisualCategory;
  name: string;
  plural: string;
  color: string;
}

export const VISUAL_ASSETS: Record<VisualAssetType, VisualAssetMeta> = {
  // Fruits
  apple: { id: 'apple', category: 'fruits', name: 'Apple', plural: 'Apples', color: '#EF4444' },
  banana: { id: 'banana', category: 'fruits', name: 'Banana', plural: 'Bananas', color: '#EAB308' },
  orange: { id: 'orange', category: 'fruits', name: 'Orange', plural: 'Oranges', color: '#F97316' },
  mango: { id: 'mango', category: 'fruits', name: 'Mango', plural: 'Mangoes', color: '#F59E0B' },
  strawberry: { id: 'strawberry', category: 'fruits', name: 'Strawberry', plural: 'Strawberries', color: '#EC4899' },
  grapes: { id: 'grapes', category: 'fruits', name: 'Grapes', plural: 'Bunches of Grapes', color: '#8B5CF6' },
  watermelon: { id: 'watermelon', category: 'fruits', name: 'Watermelon', plural: 'Watermelons', color: '#10B981' },
  pineapple: { id: 'pineapple', category: 'fruits', name: 'Pineapple', plural: 'Pineapples', color: '#D97706' },
  lemon: { id: 'lemon', category: 'fruits', name: 'Lemon', plural: 'Lemons', color: '#FBBF24' },
  cherry: { id: 'cherry', category: 'fruits', name: 'Cherries', plural: 'Cherries', color: '#DC2626' },
  pear: { id: 'pear', category: 'fruits', name: 'Pear', plural: 'Pears', color: '#84CC16' },

  // Food
  cookie: { id: 'cookie', category: 'food', name: 'Cookie', plural: 'Cookies', color: '#B45309' },
  cupcake: { id: 'cupcake', category: 'food', name: 'Cupcake', plural: 'Cupcakes', color: '#F472B6' },
  chocolate: { id: 'chocolate', category: 'food', name: 'Chocolate Bar', plural: 'Chocolates', color: '#78350F' },
  pizza: { id: 'pizza', category: 'food', name: 'Pizza Slice', plural: 'Pizza Slices', color: '#EA580C' },
  bread: { id: 'bread', category: 'food', name: 'Bread Slice', plural: 'Bread Slices', color: '#D97706' },
  donut: { id: 'donut', category: 'food', name: 'Donut', plural: 'Donuts', color: '#EC4899' },
  carrot: { id: 'carrot', category: 'food', name: 'Carrot', plural: 'Carrots', color: '#F97316' },

  // Animals
  cat: { id: 'cat', category: 'animals', name: 'Kitten', plural: 'Kittens', color: '#F59E0B' },
  dog: { id: 'dog', category: 'animals', name: 'Puppy', plural: 'Puppies', color: '#D97706' },
  rabbit: { id: 'rabbit', category: 'animals', name: 'Bunny', plural: 'Bunnies', color: '#A855F7' },
  bird: { id: 'bird', category: 'animals', name: 'Bird', plural: 'Birds', color: '#06B6D4' },
  fish: { id: 'fish', category: 'animals', name: 'Fish', plural: 'Fish', color: '#3B82F6' },
  butterfly: { id: 'butterfly', category: 'animals', name: 'Butterfly', plural: 'Butterflies', color: '#EC4899' },
  turtle: { id: 'turtle', category: 'animals', name: 'Turtle', plural: 'Turtles', color: '#10B981' },
  elephant: { id: 'elephant', category: 'animals', name: 'Elephant', plural: 'Elephants', color: '#6B7280' },

  // Toys
  block: { id: 'block', category: 'toys', name: 'Building Block', plural: 'Blocks', color: '#6366F1' },
  car: { id: 'car', category: 'toys', name: 'Toy Car', plural: 'Toy Cars', color: '#EF4444' },
  train: { id: 'train', category: 'toys', name: 'Toy Train', plural: 'Trains', color: '#3B82F6' },
  ball: { id: 'ball', category: 'toys', name: 'Play Ball', plural: 'Balls', color: '#F59E0B' },
  kite: { id: 'kite', category: 'toys', name: 'Flying Kite', plural: 'Kites', color: '#8B5CF6' },
  teddy: { id: 'teddy', category: 'toys', name: 'Teddy Bear', plural: 'Teddy Bears', color: '#92400E' },
  rocket: { id: 'rocket', category: 'toys', name: 'Space Rocket', plural: 'Rockets', color: '#DC2626' },

  // Everyday
  book: { id: 'book', category: 'everyday', name: 'Story Book', plural: 'Books', color: '#3B82F6' },
  pencil: { id: 'pencil', category: 'everyday', name: 'Color Pencil', plural: 'Pencils', color: '#F59E0B' },
  eraser: { id: 'eraser', category: 'everyday', name: 'Eraser', plural: 'Erasers', color: '#EC4899' },
  ruler: { id: 'ruler', category: 'everyday', name: 'Ruler', plural: 'Rulers', color: '#06B6D4' },
  backpack: { id: 'backpack', category: 'everyday', name: 'School Bag', plural: 'School Bags', color: '#10B981' },

  // Nature
  flower: { id: 'flower', category: 'nature', name: 'Flower', plural: 'Flowers', color: '#EC4899' },
  leaf: { id: 'leaf', category: 'nature', name: 'Green Leaf', plural: 'Leaves', color: '#10B981' },
  cloud: { id: 'cloud', category: 'nature', name: 'Fluffy Cloud', plural: 'Clouds', color: '#38BDF8' },
  star: { id: 'star', category: 'nature', name: 'Shining Star', plural: 'Stars', color: '#FBBF24' },
  sun: { id: 'sun', category: 'nature', name: 'Bright Sun', plural: 'Suns', color: '#F59E0B' },

  // Math
  dice: { id: 'dice', category: 'math', name: 'Number Die', plural: 'Dice', color: '#6366F1' },
  coin1: { id: 'coin1', category: 'math', name: '₹1 Coin', plural: '₹1 Coins', color: '#94A3B8' },
  coin2: { id: 'coin2', category: 'math', name: '₹2 Coin', plural: '₹2 Coins', color: '#94A3B8' },
  coin5: { id: 'coin5', category: 'math', name: '₹5 Coin', plural: '₹5 Coins', color: '#D97706' },
  coin10: { id: 'coin10', category: 'math', name: '₹10 Coin', plural: '₹10 Coins', color: '#D97706' },
  coin20: { id: 'coin20', category: 'math', name: '₹20 Note', plural: '₹20 Notes', color: '#EA580C' },
  clock: { id: 'clock', category: 'math', name: 'Wall Clock', plural: 'Clocks', color: '#3B82F6' },
};

interface VisualObjectProps {
  type: VisualAssetType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSelected?: boolean;
  isCounted?: boolean;
  countedNumber?: number;
  isDimmed?: boolean;
  isRemoved?: boolean;
  onClick?: () => void;
  className?: string;
  showLabel?: boolean;
}

export const VisualObject: React.FC<VisualObjectProps> = ({
  type,
  size = 'md',
  isSelected = false,
  isCounted = false,
  countedNumber,
  isDimmed = false,
  isRemoved = false,
  onClick,
  className = '',
  showLabel = false,
}) => {
  const meta = VISUAL_ASSETS[type] || VISUAL_ASSETS.apple;

  const sizeClasses = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  }[size];

  const renderSvg = () => {
    switch (type) {
      case 'apple':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Stem & Leaf */}
            <path d="M50 25 C48 12, 54 8, 56 5" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <path d="M52 14 Q65 10 70 18 Q62 25 52 16 Z" fill="#22C55E" />
            {/* Apple Body */}
            <path
              d="M50 25 C30 20 12 35 15 62 C18 85 40 92 50 86 C60 92 82 85 85 62 C88 35 70 20 50 25 Z"
              fill="url(#appleGrad)"
            />
            {/* Highlight */}
            <ellipse cx="32" cy="45" rx="8" ry="16" fill="white" fillOpacity="0.35" transform="rotate(-25 32 45)" />
            <defs>
              <linearGradient id="appleGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F87171" />
                <stop offset="0.6" stopColor="#EF4444" />
                <stop offset="1" stopColor="#B91C1C" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'banana':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Banana Curved Body */}
            <path
              d="M20 70 C25 80 50 85 75 60 C88 45 92 25 90 20 C88 18 84 19 82 22 C78 35 68 55 45 62 C32 66 22 65 20 70 Z"
              fill="url(#bananaGrad)"
            />
            <path d="M90 20 L94 16 L92 14 L88 18 Z" fill="#65A30D" />
            <path d="M20 70 L16 74" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="bananaGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="0.7" stopColor="#EAB308" />
                <stop offset="1" stopColor="#CA8A04" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'orange':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <circle cx="50" cy="52" r="38" fill="url(#orangeGrad)" />
            <ellipse cx="36" cy="40" rx="8" ry="14" fill="white" fillOpacity="0.3" transform="rotate(-30 36 40)" />
            {/* Leaf */}
            <path d="M50 15 C54 8 64 8 68 14 C64 22 56 22 50 15 Z" fill="#16A34A" />
            <circle cx="50" cy="18" r="3" fill="#9A3412" />
            <defs>
              <linearGradient id="orangeGrad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB923C" />
                <stop offset="0.7" stopColor="#F97316" />
                <stop offset="1" stopColor="#C2410C" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'strawberry':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <path
              d="M50 88 C35 75 18 55 22 36 C25 22 40 22 50 26 C60 22 75 22 78 36 C82 55 65 75 50 88 Z"
              fill="url(#berryGrad)"
            />
            {/* Seeds */}
            {[
              [38, 40],
              [50, 42],
              [62, 40],
              [42, 54],
              [56, 54],
              [50, 68],
              [35, 60],
              [65, 60],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" fill="#FEF08A" />
            ))}
            {/* Crown Leaves */}
            <path
              d="M50 26 L42 16 L48 24 L35 22 L46 28 L50 26 L54 28 L65 22 L52 24 L58 16 Z"
              fill="#22C55E"
            />
            <defs>
              <linearGradient id="berryGrad" x1="30" y1="25" x2="70" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB7185" />
                <stop offset="0.6" stopColor="#F43F5E" />
                <stop offset="1" stopColor="#BE123C" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'mango':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <path
              d="M48 20 C30 20 18 38 22 62 C26 80 44 88 60 84 C76 80 82 60 78 40 C75 24 62 20 48 20 Z"
              fill="url(#mangoGrad)"
            />
            <path d="M48 20 Q46 10 52 8" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 14 Q62 10 65 18 Q58 22 50 16 Z" fill="#16A34A" />
            <defs>
              <linearGradient id="mangoGrad" x1="25" y1="25" x2="75" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#EA580C" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'watermelon':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Slice */}
            <path d="M15 40 Q50 95 85 40 Z" fill="#15803D" />
            <path d="M20 42 Q50 90 80 42 Z" fill="#DC2626" />
            <path d="M16 40 L84 40 L80 44 L20 44 Z" fill="#BBF7D0" />
            {/* Seeds */}
            <circle cx="38" cy="52" r="2.2" fill="#1E293B" />
            <circle cx="50" cy="58" r="2.2" fill="#1E293B" />
            <circle cx="62" cy="52" r="2.2" fill="#1E293B" />
            <circle cx="50" cy="70" r="2.2" fill="#1E293B" />
          </svg>
        );

      case 'grapes':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <path d="M50 18 Q50 8 58 6" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <path d="M52 14 Q66 10 70 18 Q60 22 52 16 Z" fill="#22C55E" />
            {/* Grapes Cluster */}
            {[
              [42, 28],
              [58, 28],
              [34, 42],
              [50, 42],
              [66, 42],
              [42, 56],
              [58, 56],
              [50, 70],
              [50, 82],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="10" fill="url(#grapeGrad)" stroke="#6D28D9" strokeWidth="1" />
            ))}
            <defs>
              <linearGradient id="grapeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'cookie':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <circle cx="50" cy="50" r="38" fill="#D97706" />
            <circle cx="48" cy="48" r="35" fill="#F59E0B" />
            {/* Choco Chips */}
            {[
              [36, 36],
              [62, 34],
              [48, 50],
              [34, 62],
              [64, 62],
              [56, 72],
              [68, 48],
            ].map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="4" ry="3.5" fill="#451A03" transform={`rotate(${i * 35} ${x} ${y})`} />
            ))}
          </svg>
        );

      case 'cupcake':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Wrapper */}
            <path d="M30 55 L38 88 L62 88 L70 55 Z" fill="#F43F5E" />
            {/* Cream Frosting */}
            <path
              d="M26 55 C22 45 32 35 40 38 C44 26 58 26 62 38 C70 34 78 44 74 55 Z"
              fill="#FBCFE8"
            />
            {/* Cherry on Top */}
            <circle cx="50" cy="24" r="7" fill="#DC2626" />
            <path d="M50 20 Q56 10 60 12" stroke="#78350F" strokeWidth="2.5" fill="none" />
          </svg>
        );

      case 'pizza':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Crust */}
            <path d="M20 25 Q50 15 80 25 L50 88 Z" fill="#F59E0B" />
            {/* Cheese */}
            <path d="M24 28 Q50 20 76 28 L50 82 Z" fill="#FDE047" />
            {/* Toppings */}
            <circle cx="42" cy="42" r="5" fill="#DC2626" />
            <circle cx="58" cy="48" r="5" fill="#DC2626" />
            <circle cx="48" cy="62" r="4.5" fill="#DC2626" />
            <circle cx="50" cy="34" r="3" fill="#15803D" />
            <circle cx="36" cy="56" r="3" fill="#15803D" />
          </svg>
        );

      case 'chocolate':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <rect x="22" y="20" width="56" height="60" rx="6" fill="#451A03" />
            {/* 6 Choc squares */}
            {[
              [26, 25],
              [52, 25],
              [26, 44],
              [52, 44],
              [26, 63],
              [52, 63],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="22" height="15" rx="3" fill="#78350F" stroke="#311202" strokeWidth="1" />
            ))}
          </svg>
        );

      case 'cat':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Ears */}
            <polygon points="26,20 38,40 20,42" fill="#F59E0B" />
            <polygon points="74,20 80,42 62,40" fill="#F59E0B" />
            <polygon points="28,26 36,38 24,39" fill="#FDE68A" />
            <polygon points="72,26 76,39 64,38" fill="#FDE68A" />
            {/* Head */}
            <circle cx="50" cy="52" r="28" fill="#F59E0B" />
            {/* Eyes */}
            <circle cx="40" cy="48" r="4" fill="#1E293B" />
            <circle cx="60" cy="48" r="4" fill="#1E293B" />
            <circle cx="41" cy="46.5" r="1.5" fill="white" />
            <circle cx="61" cy="46.5" r="1.5" fill="white" />
            {/* Nose & Mouth */}
            <polygon points="50,56 46,53 54,53" fill="#F43F5E" />
            <path d="M46 58 Q50 62 54 58" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            {/* Whiskers */}
            <line x1="28" y1="52" x2="16" y2="50" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="28" y1="56" x2="16" y2="58" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="72" y1="52" x2="84" y2="50" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="72" y1="56" x2="84" y2="58" stroke="#1E293B" strokeWidth="1.8" />
          </svg>
        );

      case 'dog':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Floppy Ears */}
            <ellipse cx="24" cy="46" rx="9" ry="18" fill="#92400E" transform="rotate(-15 24 46)" />
            <ellipse cx="76" cy="46" rx="9" ry="18" fill="#92400E" transform="rotate(15 76 46)" />
            {/* Head */}
            <circle cx="50" cy="50" r="28" fill="#D97706" />
            <ellipse cx="50" cy="60" rx="14" ry="11" fill="#FEF3C7" />
            {/* Eyes */}
            <circle cx="40" cy="45" r="4" fill="#1E293B" />
            <circle cx="60" cy="45" r="4" fill="#1E293B" />
            {/* Nose & Tongue */}
            <ellipse cx="50" cy="56" rx="5" ry="3.5" fill="#1E293B" />
            <path d="M48 64 Q50 72 52 64" fill="#F43F5E" />
          </svg>
        );

      case 'rabbit':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Long Ears */}
            <ellipse cx="38" cy="24" rx="7" ry="20" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="38" cy="24" rx="4" ry="15" fill="#FBCFE8" />
            <ellipse cx="62" cy="24" rx="7" ry="20" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
            <ellipse cx="62" cy="24" rx="4" ry="15" fill="#FBCFE8" />
            {/* Face */}
            <circle cx="50" cy="56" r="25" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="42" cy="52" r="3.5" fill="#1E293B" />
            <circle cx="58" cy="52" r="3.5" fill="#1E293B" />
            <polygon points="50,60 47,57 53,57" fill="#F472B6" />
            <path d="M46 63 Q50 66 54 63" stroke="#94A3B8" strokeWidth="1.8" fill="none" />
          </svg>
        );

      case 'car':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Car Body */}
            <path
              d="M16 64 L24 45 Q35 34 50 34 L66 34 Q75 40 84 52 L88 64 Z"
              fill="#EF4444"
            />
            {/* Windows */}
            <path d="M32 45 L46 45 L46 38 L38 38 Z" fill="#93C5FD" />
            <path d="M52 45 L68 45 L64 38 L52 38 Z" fill="#93C5FD" />
            {/* Lower Body */}
            <rect x="12" y="60" width="76" height="14" rx="4" fill="#DC2626" />
            {/* Wheels */}
            <circle cx="32" cy="74" r="10" fill="#1E293B" />
            <circle cx="32" cy="74" r="4.5" fill="#94A3B8" />
            <circle cx="68" cy="74" r="10" fill="#1E293B" />
            <circle cx="68" cy="74" r="4.5" fill="#94A3B8" />
          </svg>
        );

      case 'block':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Isometric Building Block */}
            <polygon points="50,20 80,36 50,52 20,36" fill="#818CF8" />
            <polygon points="20,36 50,52 50,82 20,66" fill="#4F46E5" />
            <polygon points="50,52 80,36 80,66 50,82" fill="#6366F1" />
            {/* Stud on top */}
            <ellipse cx="50" cy="36" rx="8" ry="4.5" fill="#A5B4FC" />
          </svg>
        );

      case 'ball':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <circle cx="50" cy="50" r="38" fill="#F59E0B" />
            {/* Beach ball stripes */}
            <path d="M50 12 C35 30 35 70 50 88 C40 75 40 25 50 12 Z" fill="#3B82F6" />
            <path d="M50 12 C65 30 65 70 50 88 C60 75 60 25 50 12 Z" fill="#EF4444" />
            <ellipse cx="36" cy="32" rx="6" ry="12" fill="white" fillOpacity="0.4" transform="rotate(-35 36 32)" />
          </svg>
        );

      case 'star':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <polygon
              points="50,12 61,38 88,40 68,58 74,86 50,71 26,86 32,58 12,40 39,38"
              fill="url(#starGrad)"
              stroke="#D97706"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="starGrad" x1="20" y1="20" x2="80" y2="80">
                <stop stopColor="#FDE047" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'flower':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            {/* Petals */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <circle
                key={deg}
                cx="50"
                cy="28"
                r="16"
                fill="#F472B6"
                stroke="#DB2777"
                strokeWidth="1.5"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Center */}
            <circle cx="50" cy="50" r="14" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          </svg>
        );

      case 'coin1':
      case 'coin2':
      case 'coin5':
      case 'coin10':
      case 'coin20': {
        const val = type.replace('coin', '₹');
        const isGold = type === 'coin5' || type === 'coin10' || type === 'coin20';
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill={isGold ? 'url(#goldGrad)' : 'url(#silverGrad)'}
              stroke={isGold ? '#B45309' : '#64748B'}
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="34"
              stroke={isGold ? '#FDE68A' : '#E2E8F0'}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
            />
            <text
              x="50"
              y="58"
              textAnchor="middle"
              fontSize="24"
              fontFamily="sans-serif"
              fontWeight="900"
              fill={isGold ? '#78350F' : '#334155'}
            >
              {val}
            </text>
            <defs>
              <linearGradient id="silverGrad" x1="20" y1="20" x2="80" y2="80">
                <stop stopColor="#F1F5F9" />
                <stop offset="0.6" stopColor="#CBD5E1" />
                <stop offset="1" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="20" y1="20" x2="80" y2="80">
                <stop stopColor="#FEF08A" />
                <stop offset="0.6" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        );
      }

      default:
        // Generic fallback icon circle
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none" fill="none">
            <circle cx="50" cy="50" r="38" fill={meta.color} fillOpacity="0.85" />
            <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white">
              {meta.name[0]}
            </text>
          </svg>
        );
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`relative inline-flex flex-col items-center justify-center p-1 rounded-2xl transition-all cursor-pointer ${sizeClasses} ${
        onClick ? 'hover:scale-110 active:scale-95' : 'cursor-default'
      } ${isSelected ? 'ring-3 ring-[#7957F5] bg-[#7957F5]/10 shadow-md scale-105' : ''} ${
        isCounted ? 'ring-2 ring-emerald-500 bg-emerald-500/10' : ''
      } ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'} ${
        isRemoved ? 'opacity-40 -translate-y-2' : ''
      } ${className}`}
      title={`${meta.name}${countedNumber ? ` (#${countedNumber})` : ''}`}
      aria-label={`${meta.name}${isCounted ? ' counted' : ''}`}
    >
      {renderSvg()}

      {/* Sequential Count Badge (1, 2, 3...) when tapped in counting mode */}
      {isCounted && countedNumber !== undefined && (
        <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-600 text-white font-mono text-xs font-black flex items-center justify-center shadow-md animate-in zoom-in-75">
          {countedNumber}
        </span>
      )}

      {showLabel && (
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mt-1 whitespace-nowrap">
          {meta.name}
        </span>
      )}
    </button>
  );
};
