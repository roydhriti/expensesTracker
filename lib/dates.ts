export const toISO = (d: Date) => d.toISOString();

export const isSameDay = (aISO: string, bISO: string) => {
  const a = new Date(aISO);
  const b = new Date(bISO);

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};
