// ===================================================================
// ============================= CONSTANTS ===========================
// ===================================================================
export const EMAIL = "ericphlpp@proton.me";
export const DEV_PROJECT_MDX_CONTENT_MARKER = "<!--tech-->";

const CONTENT_DIR_PATH = "src/content";

export const TECH_DATA_DIR_PATH = `${CONTENT_DIR_PATH}/dev-index.json`;
export const TECH_POSTS_DIR_PATH = `${CONTENT_DIR_PATH}/tech-posts`;
export const BLOG_POSTS_DIR_PATH = `${CONTENT_DIR_PATH}/blog-posts`;
export const PHOTO_GALLERY_DIR_PATH = `${CONTENT_DIR_PATH}/photo-gallery`;
export const PRINTING_POSTS_DIR_PATH = `${CONTENT_DIR_PATH}/3Dprinting`;

export const LOCALES = ["en", "fr"];

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

export const getRandomYearDisplay = () => {
  const year = getCurrentYear();
  const randomIndex = Math.floor(Math.random() * YEAR_FORMATS.length);
  const format = YEAR_FORMATS[randomIndex] ?? "{year}";
  return format.replace(/{year}/g, year.toString());
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

/**
 * Format date string to "YYYY/MM" or "YYYY/MM - YYYY/MM"
 * Get the locale to determine the language, and either return "Juin 2023" or "June 2023"
 * @param date
 * @param locale - The current locale ('en' or 'fr')
 */
export const formatDateFromString = (date: string, locale: string) => {
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

export const formatDateFromDate = (date: Date, locale: string) => {
  const months = locale === "fr" ? FR_MONTHS : EN_MONTHS;
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  return `${month} ${year}`;
};
export function getPhotoGalleryCategory(
  category: string,
  locale: string,
): string {
  if (locale === "fr") {
    return FR_GALLERY_CATEGORIES[category] ?? category;
  }
  return EN_GALLERY_CATEGORIES[category] ?? category;
}

const EN_GALLERY_CATEGORIES: Record<string, string> = {
  Urban: "Urban",
  Portrait: "Portrait",
  Landscape: "Landscape",
  Street: "Street",
  Nature: "Nature",
  Architecture: "Architecture",
  Travel: "Travel",
  Event: "Event",
  Other: "Other",
};

const FR_GALLERY_CATEGORIES: Record<string, string> = {
  Urban: "Urbain",
  Portrait: "Portrait",
  Landscape: "Paysage",
  Street: "Rue",
  Nature: "Nature",
  Architecture: "Architecture",
  Travel: "Voyage",
  Event: "Événement",
  Other: "Autre",
};

const YEAR_FORMATS: string[] = [
  // Developer / Technical
  "{year}",
  "0x{year}",
  "{:year {year}}",
  "$year={year}",
  "y({year})",
  "//{year}",
  "let year = {year};",
  "year: ${year}",
  "<time>${year}</time>",
  "#define YEAR ${year}",
  '"year" => ${year}',
  "year := ${year}",
  "@Year(${year})",
  "<!-- ${year} -->",
  'console.log("Year:", ${year})',
  "export const YEAR = ${year};",
  "[year=${year}]",
  "(year == ${year})",
  "new Date(${year}, 0, 1)",
  '<meta content="${year}">',
  "JSON.stringify({ year: ${year} })",
  "year/*${year}*/",
  "# ${year} - changelog",

  // Photography / Creative
  "Shot in {year}",
  "📸 {year}",
  "Exif: DateTimeOriginal={year}",
  "Developed: {year}",
  "Taken: {year}",
  "CaptureDate: {year}-01-01",
  "📷 ({year})",
  "[{year}] Portfolio",
  "Gallery_{year}",
  "archive_{year}.jpg",
  "Canon_5D_{year}",
  "shoot_{year}",
  "Lightroom_Collection_{year}",
];
