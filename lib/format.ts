export const formatPlaytime = (playtime: number): string => {
  const hours = Math.floor(playtime / 60);
  const minutes = playtime % 60;

  return `${hours}h ${minutes}m`;
};
