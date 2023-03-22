import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
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
          UserNotFound: "User information is not correct",
          Login: "Login",
          Close: "Close",
          TerminalList: "Terminal List",
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
          UserNotFound: "Kullanıcı Bilgıleri Doğru Değil",
          Login: "Giriş Yap",
          Close: "Kapat",
          TerminalList: "Terminal Listesi",
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
