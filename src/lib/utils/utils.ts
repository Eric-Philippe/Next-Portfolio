/**
 * Get the user's age based on birth date
 */
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

const TECH_COLOR: Record<string, string> = {
  Python: "#4f8ebd",
  TypeScript: "#3178c6",
  Golang: "#00ADD8",
  JavaScript: "#f7e02a",
  Redis: "#dc382d",
  React: "#61dafb",
  Proxmox: "#e57100",
  Docker: "#2496ed",
  TrueNAS: "#0072c6",
  Grafana: "#f46800",
  Prometheus: "#e6522c",
  Rust: "#dea584",
  Julia: "#a270ba",
  PHP: "#777bb3",
  Symfony: "#000000",
  NextJs: "#000000",
  Tailwind: "#38bdf8",
};

export const getTechColor = (tech: string) => {
  if (tech in TECH_COLOR) return TECH_COLOR[tech];
  return "bg-gray-300";
};

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
