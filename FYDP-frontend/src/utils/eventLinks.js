// src/utils/eventLinks.js

/**
 * Dynamically constructs the frontend registration link from the backend's registrationLink.
 * Uses window.location.origin so that it matches Vercel on production and localhost on dev.
 */
export const getEventRegistrationLink = (event) => {
  const raw = (event?.registrationLink || "").trim();
  if (!raw) return "";

  try {
    const url = new URL(raw);
    const segments = url.pathname.split("/").filter(Boolean);
    const token = segments[segments.length - 1] || "";
    if (token) {
      return `${window.location.origin}/login?eventToken=${token}`;
    }
  } catch {
    const segments = raw.split("?")[0].split("/").filter(Boolean);
    const token = segments[segments.length - 1] || "";
    if (token) {
      return `${window.location.origin}/login?eventToken=${token}`;
    }
  }
  return raw;
};
