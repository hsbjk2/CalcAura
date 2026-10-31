import React, { useState } from 'react';
import { Sparkles, X, Search, Check, Layers } from 'lucide-react';
import { whiteboardSounds } from './soundEffects.ts';

interface VisualLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertObject: (params: {
    emoji: string;
    label: string;
    category: 'fruits' | 'animals' | 'toys' | 'school' | 'math';
    quantity: number;
    groups: number;
    itemsPerGroup: number;
    equationCaption: string;
  }) => void;
}

interface LearningItem {
  id: string;
  emoji: string;
  label: string;
  category: 'fruits' | 'animals' | 'toys' | 'school' | 'math';
}

const LEARNING_CATALOG: LearningItem[] = [
  // Fruits & Food
  { id: 'apple', emoji: '🍎', label: 'Red Apples', category: 'fruits' },
  { id: 'banana', emoji: '🍌', label: 'Sweet Bananas', category: 'fruits' },
  { id: 'orange', emoji: '🍊', label: 'Juicy Oranges', category: 'fruits' },
  { id: 'grapes', emoji: '🍇', label: 'Purple Grapes', category: 'fruits' },
  { id: 'cookie', emoji: '🍪', label: 'Chocochip Cookies', category: 'fruits' },
  { id: 'chocolate', emoji: '🍫', label: 'Chocolate Bars', category: 'fruits' },
  { id: 'pizza', emoji: '🍕', label: 'Pizza Slices', category: 'fruits' },
  { id: 'watermelon', emoji: '🍉', label: 'Watermelon Slices', category: 'fruits' },
  { id: 'strawberry', emoji: '🍓', label: 'Ripe Strawberries', category: 'fruits' },

  // Animals & Nature
  { id: 'puppy', emoji: '🐶', label: 'Friendly Puppies', category: 'animals' },
  { id: 'kitten', emoji: '🐱', label: 'Playful Kittens', category: 'animals' },
  { id: 'rabbit', emoji: '🐰', label: 'Fluffy Bunnies', category: 'animals' },
  { id: 'bird', emoji: '🐦', label: 'Songbirds', category: 'animals' },
  { id: 'fish', emoji: '🐟', label: 'Swimming Fish', category: 'animals' },
  { id: 'flower', emoji: '🌸', label: 'Cherry Blossoms', category: 'animals' },
  { id: 'sunflower', emoji: '🌻', label: 'Golden Sunflowers', category: 'animals' },
  { id: 'leaf', emoji: '🍃', label: 'Green Leaves', category: 'animals' },
  { id: 'star', emoji: '⭐', label: 'Shiny Gold Stars', category: 'animals' },
  { id: 'butterfly', emoji: '🦋', label: 'Fluttering Butterflies', category: 'animals' },

  // Toys
  { id: 'teddy', emoji: '🧸', label: 'Teddy Bears', category: 'toys' },
  { id: 'block', emoji: '🧱', label: 'Building Blocks', category: 'toys' },
  { id: 'car', emoji: '🚗', label: 'Toy Cars', category: 'toys' },
  { id: 'ball', emoji: '⚽', label: 'Soccer Balls', category: 'toys' },
  { id: 'train', emoji: '🚂', label: 'Express Trains', category: 'toys' },
  { id: 'rocket', emoji: '🚀', label: 'Toy Rockets', category: 'toys' },
  { id: 'balloon', emoji: '🎈', label: 'Colorful Balloons', category: 'toys' },

  // School Supplies
  { id: 'pencil', emoji: '✏️', label: 'Writing Pencils', category: 'school' },
  { id: 'book', emoji: '📚', label: 'Story Books', category: 'school' },
  { id: 'ruler', emoji: '📏', label: 'Math Rulers', category: 'school' },
  { id: 'notebook', emoji: '📓', label: 'Study Notebooks', category: 'school' },

  // Math Objects
  { id: 'dice', emoji: '🎲', label: 'Number Dice', category: 'math' },
  { id: 'clock', emoji: '⏰', label: 'Alarm Clocks', category: 'math' },
  { id: 'coin', emoji: '🪙', label: 'Gold Coins', category: 'math' },
  { id: 'scale', emoji: '⚖️', label: 'Balance Scale', category: 'math' },
  { id: 'abacus', emoji: '🧮', label: 'Counting Abacus', category: 'math' },
];

export const VisualLearningLibraryModal: React.FC<VisualLearningModalProps> = ({
  isOpen,
  onClose,
  onInsertObject,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<LearningItem>(LEARNING_CATALOG[0]);
  const [groups, setGroups] = useState<number>(3);
  const [itemsPerGroup, setItemsPerGroup] = useState<number>(4);

  if (!isOpen) return null;

  const totalQuantity = groups * itemsPerGroup;

  const filteredItems = LEARNING_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleInsert = () => {
    whiteboardSounds.playPopSound();
    const caption = `${groups} groups of ${itemsPerGroup} ${selectedItem.label.toLowerCase()} = ${totalQuantity}`;
    whiteboardSounds.speak(`${groups} times ${itemsPerGroup} equals ${totalQuantity}`);
    onInsertObject({
      emoji: selectedItem.emoji,
      label: selectedItem.label,
      category: selectedItem.category,
      quantity: totalQuantity,
      groups,
      itemsPerGroup,
      equationCaption: caption,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1E1E22] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Children's Visual Learning Library</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interactive objects, toys, fruits, and multiplication groups</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 thin-scrollbar">
          {/* Search & Category Filter */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fruits, animals, toys, school supplies..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7957F5]/40"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'fruits', label: '🍎 Fruits & Food' },
                { id: 'animals', label: '🐶 Animals & Nature' },
                { id: 'toys', label: '🧸 Toys & Play' },
                { id: 'school', label: '📚 School Supplies' },
                { id: 'math', label: '🎲 Math Objects' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === c.id
                      ? 'bg-[#7957F5] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-white/10'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Selectable Items */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1 thin-scrollbar">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    whiteboardSounds.playTapSound();
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#7957F5] bg-[#7957F5]/10 ring-2 ring-[#7957F5]/30'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50/50 dark:bg-white/[0.02]'
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-full">
                    {item.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grouping & Multiplication Calculator */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#7957F5]" />
                Visual Grouping & Multiplication Arrangement
              </span>
              <span className="text-xs font-mono font-bold text-[#7957F5] dark:text-[#D94BCB]">
                Total: {totalQuantity} items
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Number of Groups ({groups})
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGroups(g)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        groups === g
                          ? 'bg-[#7957F5] text-white shadow-xs'
                          : 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Items per Group ({itemsPerGroup})
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((it) => (
                    <button
                      key={it}
                      onClick={() => setItemsPerGroup(it)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        itemsPerGroup === it
                          ? 'bg-[#7957F5] text-white shadow-xs'
                          : 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Math Expression Caption */}
            <div className="p-2.5 rounded-xl bg-white dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-mono">
                {groups} × {itemsPerGroup} = {totalQuantity}
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {groups} groups of {itemsPerGroup} {selectedItem.label.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Insert Visual Math Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
