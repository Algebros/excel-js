export function getMethodName(string) {
  if (typeof string !== 'string') return '';
  return 'on' + string.charAt(0).toUpperCase() + string.slice(1);
}

export function storage(key, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key, JSON.stringify(data));
}
