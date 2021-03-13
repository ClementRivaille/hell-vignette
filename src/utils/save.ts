export interface Save {
  level: number;
  questions: string[];
}

const STORAGE_KEY = 'helle-vignette_save';

export function saveProgress(save: Save) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  } catch (e) {
    console.error('Could not write on localStorage');
  }
}

export function loadProgress(): Save | null {
  try {
    const jsonSave = localStorage.getItem(STORAGE_KEY);
    if (jsonSave) {
      const save = JSON.parse(jsonSave) as Save;
      if (save.level !== undefined && !!save.questions) {
        return save;
      }
    }
    return null;
  } catch (e) {
    console.error('Could not retrieve data from localStorage');
  }
  return null;
}

export function deleteProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Could not write on localStorage');
  }
}
