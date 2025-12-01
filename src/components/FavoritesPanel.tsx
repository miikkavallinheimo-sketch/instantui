import { useState, useEffect } from "react";
import type { SavedFavorite } from "../lib/types";
import {
  getFavorites,
  deleteFavorite,
  exportFavorites,
  importFavorites,
} from "../lib/favoritesManager";

interface FavoritesPanelProps {
  onApply: (favorite: SavedFavorite) => void;
}

const FavoritesPanel = ({ onApply }: FavoritesPanelProps) => {
  const [favorites, setFavorites] = useState<SavedFavorite[]>(getFavorites());
  const [isImporting, setIsImporting] = useState(false);

  // Refresh favorites periodically to catch updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFavorites(getFavorites());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this favorite?")) return;
    deleteFavorite(id);
    setFavorites(getFavorites());
  };

  const handleExport = () => {
    const json = exportFavorites();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `instantui-favorites-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        importFavorites(content);
        setFavorites(getFavorites());
        alert("Favorites imported successfully!");
      } catch (error) {
        alert(`Import failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    };
    reader.readAsText(file);
    setIsImporting(false);
  };

  if (favorites.length === 0) {
    return (
      <div className="text-xs text-slate-500 text-center py-4">
        No favorites saved yet. Click "Save as Favorite" to save your current design.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-3">
        <button
          onClick={handleExport}
          className="flex-1 text-[11px] px-2 py-1.5 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300"
        >
          Export All
        </button>
        <label className="flex-1">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => setIsImporting(true)}
            className="w-full text-[11px] px-2 py-1.5 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            Import
          </button>
        </label>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-slate-900/60 rounded-md p-2 space-y-2 hover:bg-slate-900/80 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-200 truncate">
                  {fav.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {new Date(fav.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onApply(fav)}
                  className="text-[10px] px-2 py-1 rounded border border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
                  title="Apply this favorite"
                >
                  Apply
                </button>
                <button
                  onClick={() => handleDelete(fav.id)}
                  className="text-[10px] px-2 py-1 rounded border border-red-600/50 text-red-400 hover:bg-red-600/10"
                  title="Delete this favorite"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex gap-1">
              {[
                fav.colors.primary,
                fav.colors.secondary,
                fav.colors.accent,
                fav.colors.background,
              ].map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded border border-slate-700"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPanel;
