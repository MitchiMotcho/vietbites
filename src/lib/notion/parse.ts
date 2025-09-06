/* Text helpers */
export const text = (arr?: { plain_text: string }[] | string | null) =>
  Array.isArray(arr) ? arr.map(t => t.plain_text).join("") : (arr ?? "");

/* Files -> first public URL (if uploaded) or external url */
export const fileUrl = (files?: any[]) => {
  if (!files?.length) return undefined;
  const f = files[0];
  if (f.type === "file") return f.file.url;
  if (f.type === "external") return f.external.url;
  return undefined;
};
