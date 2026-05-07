export function buildEvolution(history: any[]) {
  const evolution: any = {
    Agency: [],
    Awareness: [],
    Financial: [],
    Boundary: [],
  };

  history.forEach((session, index) => {
    Object.keys(evolution).forEach((key) => {
      evolution[key].push({
        x: index + 1,
        y: session.profile[key] || 0,
      });
    });
  });

  return evolution;
}