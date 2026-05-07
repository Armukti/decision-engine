const STORAGE_KEY = "children";

// 🔍 GET ALL CHILDREN
export function getChildren() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 💾 SAVE ALL
export function saveChildren(children: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(children));
}

// ➕ ADD CHILD
export function addChild(child: any) {
  const data = getChildren();
  data.push(child);
  saveChildren(data);
}

// ✏️ UPDATE CHILD
export function updateChild(index: number, updatedChild: any) {
  const data = getChildren();

  if (index < 0 || index >= data.length) return;

  data[index] = updatedChild;
  saveChildren(data);
}

// 🗑 DELETE CHILD
export function deleteChild(index: number) {
  const data = getChildren();

  if (index < 0 || index >= data.length) return;

  data.splice(index, 1);
  saveChildren(data);
}