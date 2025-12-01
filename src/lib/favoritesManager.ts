import type { SavedFavorite } from "./types";

const STORAGE_KEY = "instantui_favorites";
const MAX_FAVORITES = 50;

export function saveFavorite(favorite: Omit<SavedFavorite, "id" | "createdAt">): SavedFavorite {
  const favorites = getFavorites();

  const newFavorite: SavedFavorite = {
    ...favorite,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const updated = [newFavorite, ...favorites].slice(0, MAX_FAVORITES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newFavorite;
  } catch (error) {
    console.error("Failed to save favorite:", error);
    throw new Error("Failed to save favorite. Storage might be full.");
  }
}

export function getFavorites(): SavedFavorite[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
}

export function deleteFavorite(id: string): void {
  const favorites = getFavorites();
  const updated = favorites.filter((f) => f.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete favorite:", error);
    throw new Error("Failed to delete favorite.");
  }
}

export function clearAllFavorites(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear favorites:", error);
  }
}

export function exportFavorites(): string {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
}

export function importFavorites(jsonString: string): void {
  try {
    const imported = JSON.parse(jsonString);

    if (!Array.isArray(imported)) {
      throw new Error("Invalid format: expected an array");
    }

    const existing = getFavorites();
    const merged = [...imported, ...existing]
      .filter((f, index, self) =>
        index === self.findIndex((t) => t.id === f.id)
      )
      .slice(0, MAX_FAVORITES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error("Failed to import favorites:", error);
    throw new Error("Failed to import favorites. Invalid JSON format.");
  }
}
