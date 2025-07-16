import { defineRouting } from "next-intl/routing";
import { LOCALES } from "~/lib/utils";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: "en",
});
