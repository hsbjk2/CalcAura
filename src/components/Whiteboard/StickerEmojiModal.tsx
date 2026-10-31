import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, Smile, BookOpen, Heart, Coffee, Star, Award } from 'lucide-react';
import { whiteboardSounds } from './soundEffects.ts';

interface StickerItem {
  id: string;
  emoji: string;
  label: string;
  category: 'emojis' | 'learning' | 'animals' | 'food' | 'symbols' | 'badges';
}

const STICKER_LIBRARY: StickerItem[] = [
  // Emojis & Faces
  { id: 'e1', emoji: '😀', label: 'Grinning Face', category: 'emojis' },
  { id: 'e2', emoji: '😃', label: 'Big Smile', category: 'emojis' },
  { id: 'e3', emoji: '😄', label: 'Happy Eyes', category: 'emojis' },
  { id: 'e4', emoji: '😊', label: 'Blushing Smile', category: 'emojis' },
  { id: 'e5', emoji: '😎', label: 'Cool Sunglasses', category: 'emojis' },
  { id: 'e6', emoji: '🤓', label: 'Smart Nerd', category: 'emojis' },
  { id: 'e7', emoji: '🤔', label: 'Thinking Face', category: 'emojis' },
  { id: 'e8', emoji: '🤩', label: 'Star Struck', category: 'emojis' },
  { id: 'e9', emoji: '🥳', label: 'Party Hat', category: 'emojis' },
  { id: 'e10', emoji: '🚀', label: 'Rocket Ship', category: 'emojis' },
  { id: 'e11', emoji: '💡', label: 'Bright Idea Lightbulb', category: 'emojis' },
  { id: 'e12', emoji: '🔥', label: 'Fire Flame', category: 'emojis' },
  { id: 'e13', emoji: '🎉', label: 'Confetti Popper', category: 'emojis' },
  { id: 'e14', emoji: '❤️', label: 'Red Heart', category: 'emojis' },
  { id: 'e15', emoji: '👍', label: 'Thumbs Up', category: 'emojis' },
  { id: 'e16', emoji: '✨', label: 'Sparkles', category: 'emojis' },

  // Learning & School
  { id: 'l1', emoji: '📚', label: 'Books Stack', category: 'learning' },
  { id: 'l2', emoji: '✏️', label: 'Pencil', category: 'learning' },
  { id: 'l3', emoji: '📝', label: 'Memo Notepad', category: 'learning' },
  { id: 'l4', emoji: '📐', label: 'Triangular Ruler', category: 'learning' },
  { id: 'l5', emoji: '📏', label: 'Straight Ruler', category: 'learning' },
  { id: 'l6', emoji: '🔬', label: 'Microscope', category: 'learning' },
  { id: 'l7', emoji: '🧪', label: 'Test Tube', category: 'learning' },
  { id: 'l8', emoji: '💻', label: 'Laptop Computer', category: 'learning' },
  { id: 'l9', emoji: '📊', label: 'Bar Chart Graph', category: 'learning' },
  { id: 'l10', emoji: '📈', label: 'Upward Trending Chart', category: 'learning' },
  { id: 'l11', emoji: '🎨', label: 'Artist Palette', category: 'learning' },
  { id: 'l12', emoji: '📌', label: 'Pushpin', category: 'learning' },
  { id: 'l13', emoji: '⏰', label: 'Alarm Clock', category: 'learning' },
  { id: 'l14', emoji: '📅', label: 'Calendar', category: 'learning' },
  { id: 'l15', emoji: '🔍', label: 'Magnifying Glass', category: 'learning' },
  { id: 'l16', emoji: '🎓', label: 'Graduation Cap', category: 'learning' },

  // Animals & Nature
  { id: 'a1', emoji: '🐶', label: 'Dog Puppy', category: 'animals' },
  { id: 'a2', emoji: '🐱', label: 'Cat Kitten', category: 'animals' },
  { id: 'a3', emoji: '🦁', label: 'Lion', category: 'animals' },
  { id: 'a4', emoji: '🐼', label: 'Panda Bear', category: 'animals' },
  { id: 'a5', emoji: '🦊', label: 'Fox', category: 'animals' },
  { id: 'a6', emoji: '🐰', label: 'Bunny Rabbit', category: 'animals' },
  { id: 'a7', emoji: '🐻', label: 'Teddy Bear', category: 'animals' },
  { id: 'a8', emoji: '🌸', label: 'Cherry Blossom', category: 'animals' },
  { id: 'a9', emoji: '🌻', label: 'Sunflower', category: 'animals' },
  { id: 'a10', emoji: '🌲', label: 'Pine Tree', category: 'animals' },
  { id: 'a11', emoji: '🍀', label: 'Four Leaf Clover', category: 'animals' },
  { id: 'a12', emoji: '☀️', label: 'Sun', category: 'animals' },
  { id: 'a13', emoji: '🌈', label: 'Rainbow', category: 'animals' },
  { id: 'a14', emoji: '⚡', label: 'Lightning Bolt', category: 'animals' },

  // Food & Snacks
  { id: 'f1', emoji: '🍎', label: 'Red Apple', category: 'food' },
  { id: 'f2', emoji: '🍌', label: 'Banana', category: 'food' },
  { id: 'f3', emoji: '🍓', label: 'Strawberry', category: 'food' },
  { id: 'f4', emoji: '🍇', label: 'Grapes', category: 'food' },
  { id: 'f5', emoji: '🍊', label: 'Tangerine Orange', category: 'food' },
  { id: 'f6', emoji: '🍉', label: 'Watermelon', category: 'food' },
  { id: 'f7', emoji: '🍕', label: 'Pizza Slice', category: 'food' },
  { id: 'f8', emoji: '🍔', label: 'Burger', category: 'food' },
  { id: 'f9', emoji: '🍩', label: 'Donut', category: 'food' },
  { id: 'f10', emoji: '🍪', label: 'Cookie', category: 'food' },
  { id: 'f11', emoji: '🍫', label: 'Chocolate Bar', category: 'food' },
  { id: 'f12', emoji: '☕', label: 'Coffee Cup', category: 'food' },

  // Badges & Symbols
  { id: 's1', emoji: '⭐', label: 'Gold Star', category: 'symbols' },
  { id: 's2', emoji: '🌟', label: 'Glowing Star', category: 'symbols' },
  { id: 's3', emoji: '✅', label: 'Green Checkmark', category: 'symbols' },
  { id: 's4', emoji: '❌', label: 'Red Cross Mark', category: 'symbols' },
  { id: 's5', emoji: '⚠️', label: 'Warning Sign', category: 'symbols' },
  { id: 's6', emoji: '❓', label: 'Question Mark', category: 'symbols' },
  { id: 's7', emoji: '❗', label: 'Exclamation Mark', category: 'symbols' },
  { id: 's8', emoji: '💯', label: 'Hundred Points', category: 'symbols' },
  { id: 's9', emoji: '🎯', label: 'Bullseye Target', category: 'symbols' },
  { id: 's10', emoji: '🏆', label: 'Trophy Cup', category: 'symbols' },
  { id: 's11', emoji: '🥇', label: 'First Place Medal', category: 'symbols' },
  { id: 's12', emoji: '🥈', label: 'Second Place Medal', category: 'symbols' },
  { id: 's13', emoji: '🥉', label: 'Third Place Medal', category: 'symbols' },
  { id: 's14', emoji: '💬', label: 'Speech Bubble', category: 'symbols' },
  { id: 's15', emoji: '💭', label: 'Thought Bubble', category: 'symbols' },
  { id: 's16', emoji: '🎁', label: 'Gift Present', category: 'symbols' },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'emojis', label: 'Smileys', icon: Smile },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'animals', label: 'Nature', icon: Heart },
  { id: 'food', label: 'Food', icon: Coffee },
  { id: 'symbols', label: 'Badges', icon: Award },
];

interface StickerEmojiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertSticker: (emoji: string, label: string) => void;
}

export const StickerEmojiModal: React.FC<StickerEmojiModalProps> = ({
  isOpen,
  onClose,
  onInsertSticker,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStickers = useMemo(() => {
    return STICKER_LIBRARY.filter((s) => {
      const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.emoji.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#1E1E22] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7957F5]/10 text-[#7957F5] flex items-center justify-center">
              <Smile className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Stickers & Emojis
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Insert resizable stickers, illustrations and emojis onto your sheet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-5 pt-3 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stickers and emojis (e.g., star, book, apple, rocket)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7957F5]"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-5 py-1.5 flex items-center gap-1.5 overflow-x-auto thin-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#7957F5] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stickers Grid */}
        <div className="flex-1 overflow-y-auto p-5 thin-scrollbar min-h-60">
          {filteredStickers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Smile className="w-8 h-8 stroke-1 mb-2 opacity-50" />
              <p className="text-xs">No stickers or emojis found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5">
              {filteredStickers.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    whiteboardSounds.playPopSound();
                    onInsertSticker(item.emoji, item.label);
                    onClose();
                  }}
                  className="aspect-square rounded-2xl flex flex-col items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all cursor-pointer group"
                  title={item.label}
                >
                  <span className="text-2xl sm:text-3xl select-none group-hover:scale-115 transition-transform">
                    {item.emoji}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
