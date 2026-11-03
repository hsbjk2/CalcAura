import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Grid3X3,
  Heart,
  Volume2,
  VolumeX,
  Star,
  Gift,
  RefreshCw,
  Award,
  ChevronRight,
  Sun,
  Moon,
  Coins,
  GraduationCap,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.tsx';
import { VisualActivityId } from './VisualMathWorld/VisualMathWorld.tsx';
import { getCurriculumLearningContent } from '../data/juniorLearningModules.ts';
import '../styles/curriculum.css';

interface Classes1to5SectionProps {
  onOpenVisualMath?: (activityId?: VisualActivityId, classLevel?: number) => void;
  onOpenTables?: () => void;
  onOpenPlayground?: () => void;
}

// Interactive Class 1 Chapters data with real-world objects and mini-games
interface InteractiveChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  themeBadge: string;
  cardBg: string;
  badgeBg: string;
  accentColor: string;
  animal: string;
  toy: string;
  activityType: 'shapes' | 'counting' | 'addition' | 'subtraction' | 'patterns' | 'measurement' | 'time' | 'money' | 'multiplication' | 'fractions' | 'geometry';
  activityPrompt: string;
}

const GRADE_CHAPTERS: Record<number, InteractiveChapter[]> = {
  1: [
    {
      id: 'g1-ch1',
      chapterNumber: 1,
      title: 'Shapes & Space',
      subtitle: 'Inside, outside, bigger, smaller and cheerful geometric forms',
      themeBadge: 'Shapes & Toys 🎁',
      cardBg: 'from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/60',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200',
      accentColor: '#3B82F6',
      animal: '🐶 Puppy',
      toy: '🟢 Circles & 🟦 Squares',
      activityType: 'shapes',
      activityPrompt: 'Tap all the round Circles to help Puppy fill his toy basket!',
    },
    {
      id: 'g1-ch2',
      chapterNumber: 2,
      title: 'Numbers from One to Nine',
      subtitle: 'Count colorful toys, cute kittens, and blooming sunflowers',
      themeBadge: 'Toy Box Count 🧸',
      cardBg: 'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      accentColor: '#F59E0B',
      animal: '🐱 Kitten',
      toy: '🚗 Zoom Cars & 🎈 Balloons',
      activityType: 'counting',
      activityPrompt: 'Tap on the toys in the nursery to count them one by one!',
    },
    {
      id: 'g1-ch3',
      chapterNumber: 3,
      title: 'Addition: Putting Together',
      subtitle: 'Add friendly pandas, bunnies, and shiny toy cars',
      themeBadge: 'Picnic Party 🐼',
      cardBg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      accentColor: '#10B981',
      animal: '🐼 Panda',
      toy: '🐰 Bunnies & 🍎 Apples',
      activityType: 'addition',
      activityPrompt: '2 Pandas are playing. 3 Bunnies join them. How many friends?',
    },
    {
      id: 'g1-ch4',
      chapterNumber: 4,
      title: 'Subtraction: Taking Away',
      subtitle: 'Pop colorful balloons and share yummy cookies',
      themeBadge: 'Balloon Pop 🎈',
      cardBg: 'from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-rose-200 dark:border-rose-800/60',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      accentColor: '#F43F5E',
      animal: '🐻 Teddy Bear',
      toy: '🎈 Party Balloons',
      activityType: 'subtraction',
      activityPrompt: 'You have 5 balloons! Tap to pop 2 balloons: How many are left?',
    },
    {
      id: 'g1-ch5',
      chapterNumber: 5,
      title: 'Patterns: Flowers & Animals',
      subtitle: 'Follow the blooming garden sequence and guess what is next',
      themeBadge: 'Garden Train 🌸',
      cardBg: 'from-purple-50 to-fuchsia-50 dark:from-purple-950/40 dark:to-fuchsia-950/40 border-purple-200 dark:border-purple-800/60',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      accentColor: '#A855F7',
      animal: '🦊 Baby Fox',
      toy: '🌸 Flowers & 🌻 Sunflowers',
      activityType: 'patterns',
      activityPrompt: '🌸 Sunflower, 🌻 Tulip, 🌸 Sunflower... What comes next?',
    },
    {
      id: 'g1-ch6',
      chapterNumber: 6,
      title: 'Measurement & Seesaw Fun',
      subtitle: 'Taller, shorter, heavier, lighter with friendly zoo animals',
      themeBadge: 'Animal Seesaw 🦒',
      cardBg: 'from-cyan-50 to-sky-50 dark:from-cyan-950/40 dark:to-sky-950/40 border-cyan-200 dark:border-cyan-800/60',
      badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
      accentColor: '#06B6D4',
      animal: '🦒 Giraffe & 🦔 Hedgehog',
      toy: '⚖️ Playground Seesaw',
      activityType: 'measurement',
      activityPrompt: 'Who is taller: the gentle Giraffe 🦒 or the little Hedgehog 🦔?',
    },
    {
      id: 'g1-ch7',
      chapterNumber: 7,
      title: 'Time: Sun & Moon Clock',
      subtitle: 'Morning sunshine, playtime, dinner and sweet bedtime dreams',
      themeBadge: 'Day & Night ☀️🌙',
      cardBg: 'from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200',
      accentColor: '#EAB308',
      animal: '🦁 Lion Cub',
      toy: '☀️ Sun & 🌙 Moon',
      activityType: 'time',
      activityPrompt: 'Slide the sky from Morning Sun ☀️ to Bedtime Moon 🌙!',
    },
    {
      id: 'g1-ch8',
      chapterNumber: 8,
      title: 'Money: Toy Shop Cash Register',
      subtitle: 'Count coins and buy your favorite teddy bear or race car',
      themeBadge: 'Toy Shop 🛒',
      cardBg: 'from-lime-50 to-emerald-50 dark:from-lime-950/40 dark:to-emerald-950/40 border-lime-200 dark:border-lime-800/60',
      badgeBg: 'bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-200',
      accentColor: '#84CC16',
      animal: '🐵 Monkey',
      toy: '🪙 Gold Coins & 🚗 Toy Car',
      activityType: 'money',
      activityPrompt: 'A toy race car costs ₹5. Tap 5 shiny coins to buy it!',
    },
  ],

  2: [
    {
      id: 'g2-ch1',
      chapterNumber: 1,
      title: 'What is Long, What is Round?',
      subtitle: 'Explore shapes that roll, slide, and stack with playful toys',
      themeBadge: 'Rolling Toys ⚽',
      cardBg: 'from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border-blue-200 dark:border-blue-800/60',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200',
      accentColor: '#0284C7',
      animal: '🐰 Bunny',
      toy: '🥕 Carrots & ⚽ Rolling Balls',
      activityType: 'shapes',
      activityPrompt: 'Which toy rolls smoothly across the floor: a Round Ball ⚽ or a Square Block 🟦?',
    },
    {
      id: 'g2-ch2',
      chapterNumber: 2,
      title: 'Counting in Groups',
      subtitle: 'Count little chicks in pairs, toy cars, and pairs of warm mittens',
      themeBadge: 'Group Pairs 🐥',
      cardBg: 'from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      accentColor: '#D97706',
      animal: '🐥 Little Chicks',
      toy: '👟 Shoe Pairs & 🥄 Spoons',
      activityType: 'counting',
      activityPrompt: 'Chicks come in pairs! Tap 3 pairs to count 2, 4, 6 chicks!',
    },
    {
      id: 'g2-ch3',
      chapterNumber: 3,
      title: 'How Much Can You Carry?',
      subtitle: 'Discover heavier vs lighter bags with friendly forest animals',
      themeBadge: 'Heavy & Light 🎒',
      cardBg: 'from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      accentColor: '#059669',
      animal: '🫏 Friendly Donkey',
      toy: '🪵 Blocks & 🎒 Backpacks',
      activityType: 'measurement',
      activityPrompt: 'The donkey can carry 10kg! Add sacks of grain to balance the load.',
    },
    {
      id: 'g2-ch4',
      chapterNumber: 4,
      title: 'Counting in Tens: Forest Baskets',
      subtitle: 'Bundle shiny red apples into tens to count big harvests easily',
      themeBadge: 'Tens Bundles 🧺',
      cardBg: 'from-orange-50 to-red-50 dark:from-orange-950/40 dark:to-red-950/40 border-orange-200 dark:border-orange-800/60',
      badgeBg: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
      accentColor: '#EA580C',
      animal: '🦊 Clever Fox',
      toy: '🍎 Baskets of 10 Apples',
      activityType: 'addition',
      activityPrompt: '3 baskets of ten (30) + 4 loose apples = 34 delicious apples!',
    },
    {
      id: 'g2-ch5',
      chapterNumber: 5,
      title: 'Patterns: Animal Tracks & Flowers',
      subtitle: 'Follow zigzag paw prints, blooming marigolds, and colorful scarves',
      themeBadge: 'Paw Prints 🐾',
      cardBg: 'from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40 border-purple-200 dark:border-purple-800/60',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      accentColor: '#9333EA',
      animal: '🐯 Tiger Cub',
      toy: '🐾 Paw Prints & 🌼 Marigolds',
      activityType: 'patterns',
      activityPrompt: '🐾 Tiger print, 🌼 Flower, 🐾 Tiger print... What comes next?',
    },
    {
      id: 'g2-ch6',
      chapterNumber: 6,
      title: 'Footprints & Shape Stamping',
      subtitle: 'Trace footprints of pets and stamp circular bottle caps and leaves',
      themeBadge: 'Shape Stamp 🦆',
      cardBg: 'from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 border-teal-200 dark:border-teal-800/60',
      badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200',
      accentColor: '#0D9488',
      animal: '🦆 Duckling',
      toy: '🐚 Shells & 🪙 Bottle Caps',
      activityType: 'shapes',
      activityPrompt: 'Press bottle caps into sand to create sparkling circles!',
    },
    {
      id: 'g2-ch7',
      chapterNumber: 7,
      title: 'Jugs and Mugs: Fresh Lemonade',
      subtitle: 'Measure how many glasses of cold lemonade fill a big festive jug',
      themeBadge: 'Capacity Jug 🫖',
      cardBg: 'from-lime-50 to-emerald-50 dark:from-lime-950/40 dark:to-emerald-950/40 border-lime-200 dark:border-lime-800/60',
      badgeBg: 'bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-200',
      accentColor: '#65A30D',
      animal: '🐸 Green Frog',
      toy: '🫖 Lemonade Jug & 🥛 Glasses',
      activityType: 'measurement',
      activityPrompt: '1 jug fills 8 glasses! Tap glasses to pour refreshing lemonade.',
    },
    {
      id: 'g2-ch8',
      chapterNumber: 8,
      title: 'Tens and Ones: The Coin Bank',
      subtitle: 'Break down numbers like 25 into two ₹10 notes and five ₹1 coins',
      themeBadge: 'Coin Bank 🪙',
      cardBg: 'from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-rose-200 dark:border-rose-800/60',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      accentColor: '#E11D48',
      animal: '🦝 Raccoon',
      toy: '💵 ₹10 Notes & 🪙 ₹1 Coins',
      activityType: 'money',
      activityPrompt: 'To make ₹24: take two ₹10 notes and four ₹1 coins!',
    },
  ],

  3: [
    {
      id: 'g3-ch1',
      chapterNumber: 1,
      title: 'Where to Look From',
      subtitle: 'Observe objects from the top, front, and side to understand 3D perspectives',
      themeBadge: '3D Views 🚌',
      cardBg: 'from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border-sky-200 dark:border-sky-800/60',
      badgeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-200',
      accentColor: '#0284C7',
      animal: '🐱 Curious Kitten',
      toy: '🚌 Toy Bus & 🏠 Dollhouse',
      activityType: 'shapes',
      activityPrompt: 'Does a staircase look like steps from the side or a flat grid from above?',
    },
    {
      id: 'g3-ch2',
      chapterNumber: 2,
      title: 'Fun with Numbers: Century Stars',
      subtitle: 'Explore 3-digit numbers, skip counting by 50, and cricket century scores',
      themeBadge: 'Century Stars ⭐',
      cardBg: 'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      accentColor: '#D97706',
      animal: '🦉 Wise Owl',
      toy: '⭐ Star Trees & 🏏 Cricket Bats',
      activityType: 'counting',
      activityPrompt: 'A player has 93 runs! How many more runs needed to hit a Century (100)?',
    },
    {
      id: 'g3-ch3',
      chapterNumber: 3,
      title: 'Give and Take: Fast Mental Math',
      subtitle: 'Jump on the 100-number grid to add and subtract tens in a flash',
      themeBadge: 'Mental Math 🐿️',
      cardBg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      accentColor: '#059669',
      animal: '🐿️ Playful Squirrel',
      toy: '🌰 Acorns & 🥜 Walnuts',
      activityType: 'addition',
      activityPrompt: 'Squirrel starts at 34 and leaps up by 20. Where does he land? 54!',
    },
    {
      id: 'g3-ch4',
      chapterNumber: 4,
      title: 'Long and Short: The Ruler Quest',
      subtitle: 'Measure lengths in centimeters and meters using tape measures and strings',
      themeBadge: 'Ruler Quest 📏',
      cardBg: 'from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 border-cyan-200 dark:border-cyan-800/60',
      badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
      accentColor: '#0891B2',
      animal: '🦒 Gentle Giraffe',
      toy: '📏 Tape Measure & 🎀 Ribbons',
      activityType: 'measurement',
      activityPrompt: '1 meter = 100 centimeters! Measure ribbons to wrap holiday gifts.',
    },
    {
      id: 'g3-ch5',
      chapterNumber: 5,
      title: 'Shapes and Designs: Magic Tangram',
      subtitle: 'Build magical swans, boats, and houses using 7-piece tangram tiles',
      themeBadge: 'Tangram Magic 🧩',
      cardBg: 'from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/40 dark:to-purple-950/40 border-fuchsia-200 dark:border-fuchsia-800/60',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/60 dark:text-fuchsia-200',
      accentColor: '#C026D3',
      animal: '🦋 Butterfly',
      toy: '🧩 7-Piece Tangram Tiles',
      activityType: 'geometry',
      activityPrompt: 'Arrange 2 small triangles to build a brand new square or parallelogram!',
    },
    {
      id: 'g3-ch6',
      chapterNumber: 6,
      title: 'Fun with Give and Take: Token Train',
      subtitle: 'Check subtraction sums using addition and ride the math passenger train',
      themeBadge: 'Token Train 🚂',
      cardBg: 'from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/40 border-rose-200 dark:border-rose-800/60',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      accentColor: '#E11D48',
      animal: '🐨 Little Koala',
      toy: '🎟️ Train Tickets & 🚂 Tokens',
      activityType: 'subtraction',
      activityPrompt: '300 train seats - 120 booked = 180 seats left! Check with 180 + 120 = 300.',
    },
    {
      id: 'g3-ch7',
      chapterNumber: 7,
      title: 'Time Goes On: Clocks & Calendar',
      subtitle: 'Count minutes, hours, days, weeks, and celebrate upcoming birthdays',
      themeBadge: 'Calendar Clock 📅',
      cardBg: 'from-yellow-50 to-amber-50 dark:from-yellow-950/40 dark:to-amber-950/40 border-yellow-200 dark:border-yellow-800/60',
      badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200',
      accentColor: '#CA8A04',
      animal: '🐦 Chirpy Robin',
      toy: '📅 Wall Calendar & ⏰ Clocks',
      activityType: 'time',
      activityPrompt: 'How many seconds in one minute? Exactly 60 joyful seconds!',
    },
    {
      id: 'g3-ch8',
      chapterNumber: 8,
      title: 'How Many Times? Multiplying Frog',
      subtitle: 'Repeated addition made fun with frogs hopping across lily pads',
      themeBadge: 'Multiply Frog 🐸',
      cardBg: 'from-lime-50 to-green-50 dark:from-lime-950/40 dark:to-green-950/40 border-lime-200 dark:border-lime-800/60',
      badgeBg: 'bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-200',
      accentColor: '#65A30D',
      animal: '🐸 Leaping Frog',
      toy: '🪷 Lily Pads & 🪜 Step Ladders',
      activityType: 'multiplication',
      activityPrompt: 'Frog jumps 3 steps each time. 4 jumps = 3 + 3 + 3 + 3 = 12 steps!',
    },
  ],

  4: [
    {
      id: 'g4-ch1',
      chapterNumber: 1,
      title: 'Building with Bricks: Jali Patterns',
      subtitle: 'Discover geometric arches, symmetry, and brick patterns in grand monuments',
      themeBadge: 'Brick Arches 🧱',
      cardBg: 'from-amber-50 to-stone-50 dark:from-amber-950/40 dark:to-stone-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      accentColor: '#D97706',
      animal: '🦫 Beaver Architect',
      toy: '🧱 Clay Bricks & 🏛️ Wall Patterns',
      activityType: 'shapes',
      activityPrompt: 'A brick has 6 rectangular faces! Stack them to form a sturdy arch.',
    },
    {
      id: 'g4-ch2',
      chapterNumber: 2,
      title: 'Long and Short: Marathon Runners',
      subtitle: 'Convert meters into kilometers and track runners around athletic tracks',
      themeBadge: 'Marathon Run 🏃',
      cardBg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      accentColor: '#059669',
      animal: '🐎 Swift Pony',
      toy: '🏁 Race Tracks & 📏 Kilometers',
      activityType: 'measurement',
      activityPrompt: '1 Kilometer = 1,000 meters! A 400m track needs 5 laps for 2km.',
    },
    {
      id: 'g4-ch3',
      chapterNumber: 3,
      title: 'A Trip to Bhopal: Travel Planning',
      subtitle: 'Calculate bus fuel, seat capacities, bridge lengths, and picnic lunch bags',
      themeBadge: 'Bus Journey 🚌',
      cardBg: 'from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/60',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200',
      accentColor: '#2563EB',
      animal: '🐻 Friendly Bear',
      toy: '🚌 School Bus & 🎫 Tickets',
      activityType: 'addition',
      activityPrompt: '4 buses with 50 seats each = 200 seats! 210 students need 1 extra mini-bus.',
    },
    {
      id: 'g4-ch4',
      chapterNumber: 4,
      title: 'Tick-Tick-Tick: 24-Hour Clocks',
      subtitle: 'Read analog clock faces, elapsed time, and railway 24-hour schedules',
      themeBadge: 'Clock Master ⏰',
      cardBg: 'from-yellow-50 to-amber-50 dark:from-yellow-950/40 dark:to-amber-950/40 border-yellow-200 dark:border-yellow-800/60',
      badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200',
      accentColor: '#CA8A04',
      animal: '🕰️ Cuckoo Bird',
      toy: '⏱️ Moving Clock Hands',
      activityType: 'time',
      activityPrompt: '5:30 PM in 24-hour railway time is 17:30 hours! Add 12 to PM hours.',
    },
    {
      id: 'g4-ch5',
      chapterNumber: 5,
      title: 'The Way the World Looks: Aerial Maps',
      subtitle: 'Decode aerial views, draw classroom floor plans, and navigate pathways',
      themeBadge: 'Aerial Maps 🗺️',
      cardBg: 'from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border-purple-200 dark:border-purple-800/60',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      accentColor: '#7C3AED',
      animal: '🦅 Soaring Eagle',
      toy: '🗺️ Map Grids & 🧭 Compasses',
      activityType: 'geometry',
      activityPrompt: 'Looking from the ceiling, desks look like simple flat rectangles!',
    },
    {
      id: 'g4-ch6',
      chapterNumber: 6,
      title: 'The Junk Seller: Market Business',
      subtitle: 'Calculate daily profits, multiply rates per kg, and total shop bills',
      themeBadge: 'Market Math ⚖️',
      cardBg: 'from-lime-50 to-emerald-50 dark:from-lime-950/40 dark:to-emerald-950/40 border-lime-200 dark:border-lime-800/60',
      badgeBg: 'bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-200',
      accentColor: '#65A30D',
      animal: '🦊 Smart Fox',
      toy: '⚖️ Brass Weights & 💵 Ledger',
      activityType: 'money',
      activityPrompt: '1 kg newspaper costs ₹14. How much for 10 kg? ₹14 × 10 = ₹140!',
    },
    {
      id: 'g4-ch7',
      chapterNumber: 7,
      title: 'Jugs and Mugs: Milliliters & Liters',
      subtitle: 'Measure medicines in milliliters and water buckets in whole liters',
      themeBadge: 'Liters & mL 🪣',
      cardBg: 'from-cyan-50 to-teal-50 dark:from-cyan-950/40 dark:to-teal-950/40 border-cyan-200 dark:border-cyan-800/60',
      badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
      accentColor: '#0891B2',
      animal: '🐬 Dolphin',
      toy: '🧪 Measuring Flasks & 🪣 Buckets',
      activityType: 'measurement',
      activityPrompt: '1 Liter = 1,000 mL! Two 500 mL bottles make exactly one full liter.',
    },
    {
      id: 'g4-ch8',
      chapterNumber: 8,
      title: 'Carts and Wheels: Circles & Radius',
      subtitle: 'Draw perfect circles with compasses, strings, and find the center point',
      themeBadge: 'Circles & Radius 🎡',
      cardBg: 'from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-rose-200 dark:border-rose-800/60',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      accentColor: '#E11D48',
      animal: '🐰 Rabbit',
      toy: '🎡 Cartwheels & ⭕ Compass',
      activityType: 'geometry',
      activityPrompt: 'The distance from the center point to the boundary is the Radius!',
    },
  ],

  5: [
    {
      id: 'g5-ch1',
      chapterNumber: 1,
      title: 'The Fish Tale: Ocean Numbers',
      subtitle: 'Explore large numbers up to Lakhs and Crores with ocean fishing fleets',
      themeBadge: 'Ocean Fleet 🐠',
      cardBg: 'from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border-blue-200 dark:border-blue-800/60',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200',
      accentColor: '#0284C7',
      animal: '🐠 Angelfish',
      toy: '⛵ Fishing Boats & 📦 Crates',
      activityType: 'counting',
      activityPrompt: '1 Lakh = 100,000! A motorboat travels 20 km in 1 hour. In 4 hours: 80 km.',
    },
    {
      id: 'g5-ch2',
      chapterNumber: 2,
      title: 'Shapes and Angles: Acute & Obtuse',
      subtitle: 'Measure angles with clock hands, open doors, yoga postures, and protractors',
      themeBadge: 'Angles & Hands 📐',
      cardBg: 'from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-200 dark:border-indigo-800/60',
      badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
      accentColor: '#6366F1',
      animal: '🐧 Architect Penguin',
      toy: '📐 Protractors & 🏠 Roof Angles',
      activityType: 'geometry',
      activityPrompt: 'At 3:00, clock hands make a Right Angle (90°)! Smaller than 90° is Acute.',
    },
    {
      id: 'g5-ch3',
      chapterNumber: 3,
      title: 'How Many Squares? Grid Area',
      subtitle: 'Find areas of footprints, stamps, and geometric shapes on square grids',
      themeBadge: 'Grid Area 🟩',
      cardBg: 'from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40 border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      accentColor: '#059669',
      animal: '🦎 Chameleon',
      toy: '🟩 Grid Squares & 🌿 Leaf Prints',
      activityType: 'measurement',
      activityPrompt: 'Count full squares and half squares on the 1cm grid to calculate total area.',
    },
    {
      id: 'g5-ch4',
      chapterNumber: 4,
      title: 'Parts and Wholes: Pizza Fractions',
      subtitle: 'Master halves (1/2), quarters (1/4), and eighths (1/8) of yummy food and flags',
      themeBadge: 'Fractions 🍕',
      cardBg: 'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
      accentColor: '#D97706',
      animal: '🐼 Chef Panda',
      toy: '🍕 Pizza Slices & 🚩 Flags',
      activityType: 'fractions',
      activityPrompt: 'Slice the pizza into 4 slices: 2 slices out of 4 = 2/4 = exactly 1/2!',
    },
    {
      id: 'g5-ch5',
      chapterNumber: 5,
      title: 'Does it Look the Same? Symmetry',
      subtitle: 'Rotate shapes by 1/2 turn, 1/4 turn, and test mirror line reflection',
      themeBadge: 'Mirror Symmetry 🪞',
      cardBg: 'from-purple-50 to-fuchsia-50 dark:from-purple-950/40 dark:to-fuchsia-950/40 border-purple-200 dark:border-purple-800/60',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      accentColor: '#9333EA',
      animal: '🦢 Graceful Swan',
      toy: '🪞 Mirrors & 🌀 Windmills',
      activityType: 'patterns',
      activityPrompt: 'A square looks identical after a 1/4 turn (90°)! Test a windmill blade.',
    },
    {
      id: 'g5-ch6',
      chapterNumber: 6,
      title: 'Be My Multiple, I\'ll Be Your Factor',
      subtitle: 'Hop along common multiples of 2, 3, 5 and unlock factors of numbers',
      themeBadge: 'Multiples & Factors 🔢',
      cardBg: 'from-rose-50 to-red-50 dark:from-rose-950/40 dark:to-red-950/40 border-rose-200 dark:border-rose-800/60',
      badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      accentColor: '#E11D48',
      animal: '🐸 Leaping Frog',
      toy: '🔢 Stepping Stones & 🪨 Number Rocks',
      activityType: 'multiplication',
      activityPrompt: 'Multiples of 3: 3, 6, 9, 12, 15... Common multiple of 2 & 3 is 6!',
    },
    {
      id: 'g5-ch7',
      chapterNumber: 7,
      title: 'Boxes and Sketches: 3D Cubes & Nets',
      subtitle: 'Fold flat 2D nets into 3D gift boxes, dice, and view house blueprints',
      themeBadge: 'Folded Cube Nets 📦',
      cardBg: 'from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 border-teal-200 dark:border-teal-800/60',
      badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200',
      accentColor: '#0D9488',
      animal: '🐨 Origami Koala',
      toy: '🎲 Dice & 🧊 Foldable Nets',
      activityType: 'geometry',
      activityPrompt: 'A cube has 6 square faces! Fold the cross-shaped net to close the cube.',
    },
    {
      id: 'g5-ch8',
      chapterNumber: 8,
      title: 'Tenths and Hundredths: Decimals',
      subtitle: 'Measure millimeters on rulers as 0.1cm and stopwatch split seconds',
      themeBadge: 'Decimals 0.1s ⏱️',
      cardBg: 'from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200',
      accentColor: '#D97706',
      animal: '🐆 Cheetah Sprinter',
      toy: '⏱️ Split Stopwatch & 📏 Millimeter Ruler',
      activityType: 'money',
      activityPrompt: '1 millimeter = 1/10 cm = 0.1 cm! Cheetah runs 100m in 9.58 seconds.',
    },
  ],
};

/* Decorative pictographs belong to the game pieces, not the page chrome.
   Keep the lesson data typographic so headings and cards stay in the
   industrial type system. */
const stripPictographs = (value: string) =>
  value
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

Object.values(GRADE_CHAPTERS)
  .flat()
  .forEach((chapter) => {
    chapter.title = stripPictographs(chapter.title);
    chapter.themeBadge = stripPictographs(chapter.themeBadge);
    chapter.animal = stripPictographs(chapter.animal);
    chapter.toy = stripPictographs(chapter.toy);
  });

export const Classes1to5Section: React.FC<Classes1to5SectionProps> = ({
  onOpenVisualMath,
  onOpenTables,
  onOpenPlayground,
}) => {
  const { t } = useI18n();
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [stars, setStars] = useState<number>(3);
  const [activeInteractiveChapter, setActiveInteractiveChapter] = useState<string | null>('g1-ch2');
  const [chapterSubTab, setChapterSubTab] = useState<Record<string, 'activity' | 'concept' | 'example' | 'practice' | 'quiz'>>({});
  const [chapterQuizAnswers, setChapterQuizAnswers] = useState<Record<string, Record<number, number>>>({});
  const [chapterQuizSubmitted, setChapterQuizSubmitted] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const currentChapters = GRADE_CHAPTERS[selectedGrade] || GRADE_CHAPTERS[1];

  // Mini-game states
  // Counting game
  const [countItems, setCountItems] = useState<boolean[]>([false, false, false, false, false]);
  // Balloon pop game
  const [poppedBalloons, setPoppedBalloons] = useState<boolean[]>([false, false, false, false, false]);
  // Shape sorter game
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  // Time slider
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'noon' | 'evening' | 'night'>('morning');
  // Coin checkout
  const [insertedCoins, setInsertedCoins] = useState<number>(0);
  // Multiplication hops
  const [multHops, setMultHops] = useState<number>(3);
  // Fraction slices
  const [fractionSlices, setFractionSlices] = useState<number>(2);
  // Geometry angle
  const [selectedAngle, setSelectedAngle] = useState<'acute' | 'right' | 'obtuse'>('right');
  // Folded cube net
  const [isNetFolded, setIsNetFolded] = useState<boolean>(false);
  // Measurement seesaw
  const [seesawBalance, setSeesawBalance] = useState<number>(0);

  const speak = (msg: string) => {
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(msg);
      u.rate = 1.0;
      u.pitch = 1.25;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const addStar = () => {
    setStars((prev) => prev + 1);
    speak('Hooray! You earned a shiny star!');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-inter">
      {/* Foundation hero: editorial paper with a toy-shop cabinet of objects. */}
      <section className="kids-hero">
        <span className="kids-hero__wash" aria-hidden="true" />
        <span className="kids-hero__grid" aria-hidden="true" />

        <div className="kids-hero__copy">
          <div className="kids-hero__badges">
            <span className="kids-hero__badge">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t.kidsFoundationBadge || 'Foundation mathematics & toy shop'}
            </span>

            <span className="kids-hero__stars">
              <Star className="w-3.5 h-3.5" aria-hidden="true" />
              {stars} stars earned
            </span>

            <button
              type="button"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) speak('Sound turned on!');
              }}
              className="kids-hero__sound"
              title="Voice sound guidance"
              aria-pressed={soundEnabled}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}
              <span>{soundEnabled ? 'Voice on' : 'Voice off'}</span>
            </button>
          </div>

          <h1 className="kids-hero__title">{t.kidsHeroTitle || 'Little steps. Big discoveries.'}</h1>

          <p className="kids-hero__lead">
            {t.kidsHeroSubtitle ||
              'Learn mathematics with friendly animals, blooming flowers, colourful toys and playful interactive games.'}
          </p>

          <div className="kids-hero__actions">
            {onOpenVisualMath && (
              <button
                type="button"
                className="btn"
                onClick={() => onOpenVisualMath(undefined, selectedGrade)}
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>{t.kidsOpenVisual || 'Visual Math World'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            {onOpenTables && (
              <button type="button" className="btn btn--ghost" onClick={onOpenTables}>
                <Grid3X3 className="w-4 h-4" aria-hidden="true" />
                <span>{t.kidsOpenTables || 'Tables 1–30 studio'}</span>
              </button>
            )}
            {onOpenPlayground && (
              <button type="button" className="btn btn--ghost" onClick={onOpenPlayground}>
                <span>{t.kidsOpenPlayground || 'Toy playground'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="kids-hero__shelf" aria-hidden="true">
          <span className="kids-hero__shelf-item kids-hero__shelf-item--a">π</span>
          <span className="kids-hero__shelf-item kids-hero__shelf-item--b">√</span>
          <span className="kids-hero__shelf-item kids-hero__shelf-item--c">∑</span>
          <span className="kids-hero__shelf-item kids-hero__shelf-item--d">×</span>
          <span className="kids-hero__shelf-item kids-hero__shelf-item--e">÷</span>
          <span className="kids-hero__shelf-base" />
          <span className="kids-hero__shelf-note">1 · 2 · 3 · 4 · 5</span>
        </div>
      </section>

      {/* Grade selector */}
      <div className="kids-grades">
        <div className="kids-grades__head">
          <span>{t.kidsSelectGrade || 'Choose grade'}</span>
          <span className="kids-grades__active">
            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
            Active · Class {selectedGrade}
          </span>
        </div>

        <div className="kids-grades__grid" role="tablist" aria-label="Class selector">
          {[
            { grade: 1, label: t.kidsClass1Title || 'Class 1: Friendly Animals', icon: '1' },
            { grade: 2, label: t.kidsClass2Title || 'Class 2: Numbers & Garden', icon: '2' },
            { grade: 3, label: t.kidsClass3Title || 'Class 3: Magic Shapes', icon: '3' },
            { grade: 4, label: t.kidsClass4Title || 'Class 4: Multiplication', icon: '4' },
            { grade: 5, label: t.kidsClass5Title || 'Class 5: Fractions & Time', icon: '5' },
          ].map((item) => {
            const isSelected = selectedGrade === item.grade;
            return (
              <button
                key={item.grade}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedGrade(item.grade);
                  const firstChId = GRADE_CHAPTERS[item.grade]?.[0]?.id || 'g1-ch1';
                  setActiveInteractiveChapter(firstChId);
                  speak(`Class ${item.grade} selected!`);
                }}
                className={`kids-grade ${isSelected ? 'is-active' : ''}`}
              >
                <span className="kids-grade__icon">{item.icon}</span>
                <span className="kids-grade__label">{item.label.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>


      {/* Real-world interactive chapters and toy-shop cards */}
      <div className="space-y-6">
        <div className="kids-chapter-head">
          <div className="kids-chapter-head__left">
            <span className="kids-chapter-head__dot" aria-hidden="true" />
            <h2>Class {selectedGrade} playful curriculum</h2>
            <span className="kids-chapter-head__tag">Interactive mode</span>
          </div>
          <span className="kids-chapter-head__count">{currentChapters.length} activities</span>
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentChapters.map((ch) => {
            const isActive = activeInteractiveChapter === ch.id;

            return (
              <div
                key={ch.id}
                className={`rounded-[2rem] p-6 border-2 transition-all flex flex-col justify-between bg-gradient-to-br ${ch.cardBg} hover:shadow-xl hover:scale-[1.02]`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs">
                      Chapter {ch.chapterNumber}
                    </span>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${ch.badgeBg}`}>
                      {ch.themeBadge}
                    </span>
                  </div>

                  {/* Title & Animals */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{ch.title}</span>
                      
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {ch.subtitle}
                    </p>
                  </div>

                  {/* Real-world Toys & Friends */}
                  <div className="p-3 bg-white/80 dark:bg-slate-900/70 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-bold">
                      <span>Playmates:</span>
                      <span>{ch.animal}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-bold">
                      <span>Toys:</span>
                      <span>{ch.toy}</span>
                    </div>
                  </div>

                  {/* ==============================================================
                      LIVE IN-CARD MINI GAMES ACCORDING TO REAL SYLLABUS
                  ============================================================== */}
                  {isActive && (() => {
                    const curr = getCurriculumLearningContent(ch.id, selectedGrade, ch.chapterNumber, ch.title);
                    const subTab = chapterSubTab[ch.id] || 'activity';
                    const userQAnswers = chapterQuizAnswers[ch.id] || {};
                    const isQuizSubmitted = chapterQuizSubmitted[ch.id] || false;
                    const isHintVisible = showHints[ch.id] || false;

                    let quizScore = 0;
                    curr.chapterQuiz.forEach((q, idx) => {
                      if (userQAnswers[idx] === q.correctIdx) quizScore++;
                    });

                    return (
                      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 space-y-3 animate-pop-burst">
                        {/* Subtab Navigation */}
                        <div className="flex items-center gap-1 overflow-x-auto thin-scrollbar pb-1 border-b border-slate-100 dark:border-white/10 text-[11px] font-bold">
                          {[
                            { id: 'activity', label: 'Activity' },
                            { id: 'concept', label: 'Concept & Outcomes' },
                            { id: 'example', label: 'Example' },
                            { id: 'practice', label: 'Practice' },
                            { id: 'quiz', label: 'Quiz' },
                          ].map((tItem) => (
                            <button
                              key={tItem.id}
                              onClick={() => setChapterSubTab((prev) => ({ ...prev, [ch.id]: tItem.id as any }))}
                              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                                subTab === tItem.id
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                              }`}
                            >
                              {tItem.label}
                            </button>
                          ))}
                        </div>

                        {/* CONCEPT TAB */}
                        {subTab === 'concept' && (
                          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 py-1">
                            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
                              <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
                                Learning Objective:
                              </span>
                              <p className="leading-relaxed">{curr.learningObjective}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="font-bold text-slate-900 dark:text-white block">
                                Concept Summary:
                              </span>
                              <p className="leading-relaxed">{curr.conceptIntroduction}</p>
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-1">
                              <span className="font-bold text-slate-900 dark:text-white block">
                                Independent Practice Questions:
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                                {curr.independentQuestions.map((iq, i) => (
                                  <li key={i}>{iq}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* EXAMPLE TAB */}
                        {subTab === 'example' && (
                          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 py-1">
                            <h6 className="font-bold text-slate-900 dark:text-white text-sm">
                              {curr.illustratedExample.title}
                            </h6>
                            <p className="text-slate-600 dark:text-slate-400">
                              {curr.illustratedExample.description}
                            </p>
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1 font-mono text-[11px]">
                              {curr.illustratedExample.steps.map((st, i) => (
                                <div key={i} className="text-slate-700 dark:text-slate-300">{st}</div>
                              ))}
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px]">
                              ✓ {curr.illustratedExample.result}
                            </div>
                          </div>
                        )}

                        {/* GUIDED PRACTICE TAB */}
                        {subTab === 'practice' && (
                          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 py-1">
                            <div className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                              {curr.guidedPractice.question}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setShowHints((prev) => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                              >
                                <HelpCircle className="w-3 h-3" />
                                <span>{isHintVisible ? 'Hide Hint' : 'Show Helpful Hint'}</span>
                              </button>
                            </div>
                            {isHintVisible && (
                              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-200 text-[11px]">
                                Hint: {curr.guidedPractice.hint}
                              </div>
                            )}
                            <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px]">
                              <strong>Answer & Solution:</strong> {curr.guidedPractice.solution}
                            </div>
                          </div>
                        )}

                        {/* QUIZ TAB (Strict Zero-Leak Mode) */}
                        {subTab === 'quiz' && (
                          <div className="space-y-3 text-xs py-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 dark:text-white">
                                Chapter Quiz ({curr.chapterQuiz.length} Questions)
                              </span>
                              {isQuizSubmitted && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                                  Score: {quizScore} / {curr.chapterQuiz.length}
                                </span>
                              )}
                            </div>

                            {curr.chapterQuiz.map((q, qIdx) => {
                              const selectedOpt = userQAnswers[qIdx];
                              const isCorrect = selectedOpt === q.correctIdx;

                              return (
                                <div
                                  key={q.id}
                                  className={`p-3 rounded-xl border space-y-2 ${
                                    isQuizSubmitted
                                      ? isCorrect
                                        ? 'bg-emerald-500/10 border-emerald-500/30'
                                        : 'bg-rose-500/10 border-rose-500/30'
                                      : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10'
                                  }`}
                                >
                                  <div className="font-semibold text-slate-900 dark:text-white">
                                    {qIdx + 1}. {q.question}
                                  </div>

                                  <div className="space-y-1">
                                    {q.options.map((opt, optIdx) => {
                                      const isChosen = selectedOpt === optIdx;
                                      let optStyle = 'border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5';

                                      if (isQuizSubmitted) {
                                        if (optIdx === q.correctIdx) {
                                          optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                                        } else if (isChosen && !isCorrect) {
                                          optStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                                        }
                                      } else if (isChosen) {
                                        optStyle = 'bg-indigo-600 text-white border-indigo-600 font-bold';
                                      }

                                      return (
                                        <button
                                          key={optIdx}
                                          disabled={isQuizSubmitted}
                                          onClick={() => {
                                            setChapterQuizAnswers((prev) => ({
                                              ...prev,
                                              [ch.id]: { ...(prev[ch.id] || {}), [qIdx]: optIdx },
                                            }));
                                          }}
                                          className={`w-full text-left p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                                        >
                                          <span>{opt}</span>
                                          {isQuizSubmitted && optIdx === q.correctIdx && (
                                            <span className="text-[10px] text-emerald-600 font-mono">✓ Correct</span>
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {isQuizSubmitted && (
                                    <div className="p-2 rounded-lg bg-white/80 dark:bg-black/30 border border-slate-200/60 dark:border-white/10 text-[10px] space-y-1">
                                      <div className="font-bold text-indigo-600 dark:text-indigo-400">
                                        Rule / Concept: {q.ruleOrFormula}
                                      </div>
                                      <div>{q.explanation}</div>
                                      <div className="text-slate-500">Common Mistake: {q.commonMistake}</div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                            <div className="flex items-center justify-end gap-2 pt-1">
                              {!isQuizSubmitted ? (
                                <button
                                  onClick={() => {
                                    setChapterQuizSubmitted((prev) => ({ ...prev, [ch.id]: true }));
                                    speak(`Quiz submitted! You scored ${quizScore} out of ${curr.chapterQuiz.length}`);
                                  }}
                                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                                >
                                  Submit Quiz
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setChapterQuizSubmitted((prev) => ({ ...prev, [ch.id]: false }));
                                    setChapterQuizAnswers((prev) => ({ ...prev, [ch.id]: {} }));
                                  }}
                                  className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs cursor-pointer"
                                >
                                  Retake Quiz
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* ACTIVITY TAB WRAPPER */}
                        {subTab === 'activity' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
                              <span className="flex items-center gap-1">
                                <Play className="w-3.5 h-3.5 fill-current" /> Live Game
                              </span>
                              <span className="text-[10px] text-slate-500">Tap to play!</span>
                            </div>

                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                              {ch.activityPrompt}
                            </p>

                      {/* GAME 1: SHAPE SORTER */}
                      {ch.activityType === 'shapes' && (
                        <div className="space-y-2">
                          <div className="flex justify-around items-center pt-1">
                            {[
                              { id: 'circle', icon: '🟢', name: 'Circle' },
                              { id: 'square', icon: '🟦', name: 'Square' },
                              { id: 'triangle', icon: '🔺', name: 'Triangle' },
                              { id: 'star', icon: '⭐️', name: 'Star' },
                            ].map((s) => (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setSelectedShape(s.id);
                                  speak(`${s.name}!`);
                                  if (s.id === 'circle') addStar();
                                }}
                                className={`text-2xl p-2 rounded-xl transition-all cursor-pointer ${
                                  selectedShape === s.id ? 'bg-amber-200 scale-125' : 'hover:scale-110'
                                }`}
                                title={s.name}
                              >
                                {s.icon}
                              </button>
                            ))}
                          </div>
                          {selectedShape === 'circle' && (
                            <div className="text-center text-xs font-bold text-emerald-600 animate-bounce">
                              Yay! Circle is perfectly round like a ball! ⚽
                            </div>
                          )}
                        </div>
                      )}

                      {/* GAME 2: TAP TO COUNT TOYS */}
                      {ch.activityType === 'counting' && (
                        <div className="space-y-2">
                          <div className="flex justify-around items-center text-2xl pt-1">
                            {['🧸', '🚗', '🎈', '🐶', '🍦'].map((toyEmoji, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  const updated = [...countItems];
                                  updated[idx] = !updated[idx];
                                  setCountItems(updated);
                                  const currentCount = updated.filter(Boolean).length;
                                  speak(`${currentCount}! ${toyEmoji}`);
                                  if (currentCount === 5) addStar();
                                }}
                                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                                  countItems[idx] ? 'bg-emerald-100 scale-125 ring-2 ring-emerald-500' : 'hover:scale-110 opacity-75'
                                }`}
                              >
                                {toyEmoji}
                              </button>
                            ))}
                          </div>
                          <div className="text-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            Counted: <strong>{countItems.filter(Boolean).length}</strong> of 5 toys!
                          </div>
                        </div>
                      )}

                      {/* GAME 3: ADDITION PICNIC */}
                      {ch.activityType === 'addition' && (
                        <div className="space-y-2 text-center">
                          <div className="flex items-center justify-center gap-2 text-xl font-black">
                            <span>🐼 🐼</span>
                            <span className="text-emerald-600">+</span>
                            <span>🐰 🐰 🐰</span>
                            <span>=</span>
                            <span className="text-2xl text-indigo-600">5 🎉</span>
                          </div>
                          <button
                            onClick={() => {
                              speak('Two pandas plus three bunnies equals five happy friends!');
                              addStar();
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                          >
                            Celebrate Sum! 🎉
                          </button>
                        </div>
                      )}

                      {/* GAME 4: BALLOON POP SUBTRACTION */}
                      {ch.activityType === 'subtraction' && (
                        <div className="space-y-2">
                          <div className="flex justify-around items-center text-2xl pt-1">
                            {[0, 1, 2, 3, 4].map((bIdx) => (
                              <button
                                key={bIdx}
                                onClick={() => {
                                  const updated = [...poppedBalloons];
                                  updated[bIdx] = !updated[bIdx];
                                  setPoppedBalloons(updated);
                                  speak(updated[bIdx] ? 'Pop!' : 'Inflated!');
                                  if (updated.filter(Boolean).length === 2) addStar();
                                }}
                                className="p-1 cursor-pointer transition-transform hover:scale-125"
                              >
                                {poppedBalloons[bIdx] ? '💥' : '🎈'}
                              </button>
                            ))}
                          </div>
                          <div className="text-center text-xs font-bold text-rose-600">
                            5 balloons - {poppedBalloons.filter(Boolean).length} popped ={' '}
                            {5 - poppedBalloons.filter(Boolean).length} remaining!
                          </div>
                        </div>
                      )}

                      {/* GAME 5: DAY & NIGHT TIME */}
                      {ch.activityType === 'time' && (
                        <div className="space-y-2 text-center">
                          <div className="flex justify-center gap-2">
                            {(['morning', 'noon', 'evening', 'night'] as const).map((tod) => (
                              <button
                                key={tod}
                                onClick={() => {
                                  setTimeOfDay(tod);
                                  speak(`${tod} time!`);
                                }}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                                  timeOfDay === tod ? 'bg-amber-500 text-white scale-105' : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {tod === 'morning' ? '☀️ Morning' : tod === 'noon' ? '🌞 Noon' : tod === 'evening' ? '🌆 Sunset' : '🌙 Night'}
                              </button>
                            ))}
                          </div>
                          <div className="text-xs text-slate-600 font-semibold">
                            {timeOfDay === 'morning' && 'Wake up with the singing birds! 🐦'}
                            {timeOfDay === 'noon' && 'Time for lunch and play! 🥪'}
                            {timeOfDay === 'evening' && 'Playtime in the park! 🛝'}
                            {timeOfDay === 'night' && 'Bedtime stories and sweet dreams! ⭐️'}
                          </div>
                        </div>
                      )}

                      {/* GAME 6: TOY SHOP COINS */}
                      {ch.activityType === 'money' && (
                        <div className="space-y-2 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-3xl">🚗</span>
                            <span className="text-xs font-bold text-slate-600">Price: ₹5</span>
                          </div>
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setInsertedCoins((prev) => {
                                  const next = Math.min(prev + 1, 5);
                                  speak(`Inserted ${next} rupees!`);
                                  if (next === 5) addStar();
                                  return next;
                                });
                              }}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Coins className="w-3.5 h-3.5" /> Insert ₹1 Coin
                            </button>
                            <button
                              onClick={() => setInsertedCoins(0)}
                              className="px-2 py-1 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                            >
                              Reset
                            </button>
                          </div>
                          <div className="text-xs font-bold text-emerald-600">
                            Inserted: ₹{insertedCoins} / ₹5 {insertedCoins >= 5 ? '🎉 Toy Purchased!' : ''}
                          </div>
                        </div>
                      )}

                      {/* GAME 7: LEAPING FROG MULTIPLICATION */}
                      {ch.activityType === 'multiplication' && (
                        <div className="space-y-2 text-center">
                          <div className="flex items-center justify-center gap-2 text-base font-black">
                            <span>🐸 Frog takes</span>
                            <span className="px-2 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                              {multHops} hops
                            </span>
                            <span>× 4 steps</span>
                            <span>=</span>
                            <span className="text-emerald-600 text-lg">{multHops * 4} steps! 🎉</span>
                          </div>
                          <div className="flex justify-center gap-1.5 pt-1">
                            {[1, 2, 3, 4, 5].map((hop) => (
                              <button
                                key={hop}
                                onClick={() => {
                                  setMultHops(hop);
                                  speak(`${hop} times four equals ${hop * 4}!`);
                                  if (hop === 5) addStar();
                                }}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                                  multHops === hop ? 'bg-indigo-600 text-white scale-110 shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {hop} Hops
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* GAME 8: PIZZA FRACTIONS */}
                      {ch.activityType === 'fractions' && (
                        <div className="space-y-2 text-center">
                          <div className="flex items-center justify-center gap-2 text-lg font-bold">
                            <span>🍕</span>
                            <span>{fractionSlices} / 4 slices</span>
                            <span className="text-indigo-600">
                              {fractionSlices === 2 ? '(= 1/2 Half)' : fractionSlices === 4 ? '(= 1 Whole)' : ''}
                            </span>
                          </div>
                          <div className="flex justify-center gap-1.5 pt-1">
                            {[1, 2, 3, 4].map((slices) => (
                              <button
                                key={slices}
                                onClick={() => {
                                  setFractionSlices(slices);
                                  speak(`${slices} fourths of pizza!`);
                                  if (slices === 4) addStar();
                                }}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                                  fractionSlices === slices ? 'bg-amber-500 text-white scale-110 shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {slices}/4 Slices
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* GAME 9: ANGLE & GEOMETRY EXPLORER */}
                      {ch.activityType === 'geometry' && (
                        <div className="space-y-2 text-center">
                          <div className="flex justify-center gap-2 pt-1">
                            {(['acute', 'right', 'obtuse'] as const).map((ang) => (
                              <button
                                key={ang}
                                onClick={() => {
                                  setSelectedAngle(ang);
                                  speak(`${ang} angle!`);
                                  if (ang === 'right') addStar();
                                }}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize cursor-pointer transition-all ${
                                  selectedAngle === ang ? 'bg-purple-600 text-white scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {ang === 'acute' ? '📐 Acute (<90°)' : ang === 'right' ? '📐 Right (90°)' : '📐 Obtuse (>90°)'}
                              </button>
                            ))}
                          </div>
                          <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
                            {selectedAngle === 'right' && 'Perfect corner like an L-shape clock at 3:00!'}
                            {selectedAngle === 'acute' && 'Sharp and narrow like a bird beak! 🐦'}
                            {selectedAngle === 'obtuse' && 'Wide open like an unfolded fan! 🪭'}
                          </div>
                        </div>
                      )}

                      {/* GAME 10: SEESAW MEASUREMENT */}
                      {ch.activityType === 'measurement' && (
                        <div className="space-y-2 text-center">
                          <div className="flex items-center justify-center gap-4 text-xl">
                            <span>🦒 Giraffe</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                              {seesawBalance === 0 ? '⚖️ Level' : seesawBalance > 0 ? '⬇️ Heavier' : '⬆️ Lighter'}
                            </span>
                            <span>🦔 Hedgehog</span>
                          </div>
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setSeesawBalance((prev) => prev - 1);
                                speak('Tilted left!');
                              }}
                              className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold cursor-pointer"
                            >
                              Tilt Left
                            </button>
                            <button
                              onClick={() => {
                                setSeesawBalance(0);
                                speak('Balanced level!');
                                addStar();
                              }}
                              className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                            >
                              Balance! ⭐️
                            </button>
                            <button
                              onClick={() => {
                                setSeesawBalance((prev) => prev + 1);
                                speak('Tilted right!');
                              }}
                              className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold cursor-pointer"
                            >
                              Tilt Right
                            </button>
                          </div>
                        </div>
                      )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Bottom Toggle / Launch Button */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isActive) {
                        setActiveInteractiveChapter(null);
                      } else {
                        setActiveInteractiveChapter(ch.id);
                        speak(`Opening ${ch.title}!`);
                      }
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{isActive ? 'Close Game ✕' : 'Play Activity'}</span>
                  </button>

                  {onOpenVisualMath && (
                    <button
                      onClick={() => onOpenVisualMath(undefined, selectedGrade)}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer shadow-sm"
                      title="Open full interactive visual workspace"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
