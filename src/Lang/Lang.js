import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          Help: "help",
          Support: "support",
          Homepage: "Home page",
          Alltermianls: "ALL TERMINALS",
          Bychapter: "By Chapter",
          Basedonfilter: "Based on filter",
          Month: "month",
          Year: "year",
          Day: "day",
          Shift: "Shift",
          ShiftR: "R",
          ShiftB: "B",
          ShiftW: "W",
          assemblyNo: "Assembly No",
          password: "Password",
          registrationNo: "Registration Number",
          PassReq: "Please Do Not Leave Your Password Empty",
        },
      },
      tr: {
        translation: {
          Help: "yardim",
          Support: "destek",
          Homepage: "ana sayfa",
          Alltermianls: "TÜM TERMİNALLER",
          Bychapter: "Bölüm bazında",
          Basedonfilter: "Filitre bazında",
          Month: "ay",
          Year: "yıl",
          Day: "gün",
          Shift: "Vardiya",
          ShiftR: "K",
          ShiftB: "M",
          ShiftW: "B",
          assemblyNo: "Montoj No",
          password: "Şifre",
          registrationNo: "Sicil No",
          PassReq: "Lütfen Şifrenizi Boş Bırakmayınız",
        },
      },
      ru: {
        translation: {
          Help: "help",
          Support: "support",
          Homepage: "Home page",
        },
      },
      sa: {
        translation: {
          Help: "help",
          Support: "support",
          Homepage: "Home page",
        },
      },
      jp: {
        translation: {
          Help: "help",
          Support: "support",
          Homepage: "Home page",
        },
      },
    },
  });

export default i18n;
