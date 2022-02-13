export function dateAscending(a, b) {
  const dateA = new Date(a['date']).getTime();
  const dateB = new Date(b['date']).getTime();
  return dateA < dateB ? 1 : -1;
}
