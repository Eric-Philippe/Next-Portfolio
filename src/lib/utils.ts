// ===================================================================
// ============================= CONSTANTS ===========================
// ===================================================================
// @deprecated
export const API_CONTENT_URL = "https://common.homeserver-ericp.fr";
export const EMAIL = "ericphlpp@proton.me";
export const DEV_PROJECT_MDX_CONTENT_MARKER = "<!--tech-->";
export const CONTENT_DIR_PATH = "src/content";
export const TECH_POSTS_DIR_PATH = `${CONTENT_DIR_PATH}/tech-posts`;
export const BLOG_POSTS_DIR_PATH = `${CONTENT_DIR_PATH}/blog-posts`;

const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FR_MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

// ===================================================================
// ============================= FUNCTIONS ===========================
// ===================================================================
export const getMyAge = () => {
  const birthYear = 2003;
  const birthMonth = 5; // May

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  let age = currentYear - birthYear;

  if (currentMonth < birthMonth) {
    age--;
  }

  return age;
};

export const getCurrentYear = () => {
  const today = new Date();
  return today.getFullYear();
};

/**
 * Format date string to "YYYY/MM" or "YYYY/MM - YYYY/MM"
 * Get the locale to determine the language, and either return "Juin 2023" or "June 2023"
 * @param date
 * @param locale - The current locale ('en' or 'fr')
 */
export const formatDevProjectDate = (date: string, locale: string) => {
  const months = locale === "fr" ? FR_MONTHS : EN_MONTHS;

  // Handle date ranges (e.g., "2023/05 - 2024/03")
  if (date.includes(" - ")) {
    const [startDate, endDate] = date.split(" - ");
    const formattedStart = formatSingleDate(startDate!, months);
    const formattedEnd = formatSingleDate(endDate!, months);
    return `${formattedStart} - ${formattedEnd}`;
  }

  // Handle single date
  return formatSingleDate(date, months);
};

/**
 * Format a single date string to "Month YYYY"
 * @param date - Date in format "YYYY/MM"
 * @param months - Array of month names
 */
const formatSingleDate = (date: string, months: string[]) => {
  const [year, month] = date.split("/");
  const monthIndex = parseInt(month!, 10) - 1;
  return `${months[monthIndex]} ${year}`;
};
