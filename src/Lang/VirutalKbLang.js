export const trLayout = {
  default: [
    '" 1 2 3 4 5 6 7 8 9 0 * - # {bksp}',
    "{tab} q w e r t y u ı o p ğ ü [ ]",
    "{lock} a s d f g h j k l ş i ,",
    "{shift} < z x c v b n m ö ç . | $ € {shift}",
    ".com @ {space}",
  ],
  shift: [
    "é ! ' ^ + % & / ( ) = ? _ ~ {bksp}",
    "{tab} Q W E R T Y U I O P Ğ Ü { }",
    "{lock} A S D F G H J K L Ş İ ; {enter}",
    "{shift} > Z X C V B N M Ö Ç : \\ ` ´ {shift}",
    ".com @ {space}",
  ],
};

export const enLayout = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {enter}',
    "{shift} Z X C V B N M < > ? {shift}",
    ".com @ {space}",
  ],
};

export const rusLayout = {
  default: [
    "\u0451 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
    "{lock} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}",
    "{shift} / \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
    ".com @ {space}",
  ],
  shift: [
    '\u0401 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
    "{tab} \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
    "{lock} \u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d {enter}",
    "{shift} | \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
    ".com @ {space}",
  ],
};

export const jpnLayout = {
  default: [
    "1 2 3 4 5 6 7 8 9 0 - ^ \u00a5 {bksp}",
    "{tab} \u305f \u3066 \u3044 \u3059 \u304b \u3093 \u306a \u306b \u3089 \u305b \u309b \u309c \u3080",
    "{lock} \u3061 \u3068 \u3057 \u306f \u304D \u304f \u307e \u306e \u308a \u308c \u3051 {enter}",
    "{shift} \u3064 \u3055 \u305d \u3072 \u3053 \u307f \u3082 \u306d \u308b \u3081 {shift}",
    ".com @ {space}",
  ],
  shift: [
    "! \" # $ % & ' ( ) \u0301 = ~ | {bksp}",
    "{tab} \u305f \u3066 \u3043 \u3059 \u304b \u3093 \u306a \u306b \u3089 \u305b \u300c \u300d \u3080",
    "{lock} \u3061 \u3068 \u3057 \u306f \u304D \u304f \u307e \u306e \u308a \u308c \u3051 {enter}",
    "{shift} \u3063 \u3055 \u305d \u3072 \u3053 \u307f \u3082 \u3001 \u3002 \u30fb {shift}",
    ".com @ {space}",
  ],
};

export const lang = (i18n) => {
  if (i18n.resolvedLanguage === "tr") {
    return trLayout;
  } else if (i18n.resolvedLanguage === "en") {
    return enLayout;
  } else if (i18n.resolvedLanguage === "ru") {
    return rusLayout;
  } else {
    return enLayout;
  }
};
