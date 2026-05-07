export function getAgeStyle(age: number) {
  if (age <= 7) {
    return {
      instruction: "Gunakan bahasa sederhana dan konkret.",
    };
  }

  if (age <= 10) {
    return {
      instruction: "Gunakan bahasa reflektif tapi ringan.",
    };
  }

  return {
    instruction: "Gunakan bahasa analitis dan mendalam.",
  };
}