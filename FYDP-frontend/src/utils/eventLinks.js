const FRONTEND_URL = (import.meta.env.VITE_FRONTEND_URL || "https://trust-mark-frontend.vercel.app").replace(/\/$/, "");

export const getEventRegistrationLink = (event) => {
  const raw = (event?.registrationLink || "").trim();
  const tokenFromRaw = () => {
    if (!raw) return "";
    try {
      const url = new URL(raw);
      const queryToken = url.searchParams.get("eventToken") || url.searchParams.get("token");
      if (queryToken) return queryToken;
      const segments = url.pathname.split("/").filter(Boolean);
      return segments[segments.length - 1] || "";
    } catch {
      const path = raw.split("?")[0];
      const segments = path.split("/").filter(Boolean);
      return segments[segments.length - 1] || "";
    }
  };

  const token = event?.registrationToken || event?.eventToken || tokenFromRaw();
  if (!token) return raw;

  return `${FRONTEND_URL}/login?eventToken=${encodeURIComponent(token)}`;
};
