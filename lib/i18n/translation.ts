import { createIntl } from "next-intl";
import { useTranslations } from "next-intl";

// Create translation utilities
export const useDashboardTranslations = () => {
  const t = useTranslations("dashboard");
  return t;
};

export const getNicheTranslation = (nicheKey: string, t: any) => {
  return t(`niches.${nicheKey}`);
};
