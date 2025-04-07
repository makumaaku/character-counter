// このファイルは自動生成されています。手動で変更しないでください。
// Generated at: 2025-04-07T01:44:24.488Z

export interface CommonMessages {
  meta: {
    logoAlt: string;
  };
  siteName: string;
  publisher: string;
  header: {
    home: string;
    tools: string;
    about: string;
    contact: string;
  };
  menu: string;
  footer: {
    terms: string;
    privacy: string;
    about: string;
    contact: string;
    copyright: string;
  };
  error: {
    general: string;
    notFound: string;
    serverError: string;
  };
  form: {
    submitting: string;
  };
}

export interface MetaMessages {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  publisher: string;
  logoAlt: string;
}

export interface AboutMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  content: string;
}

export interface ContactMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  content: {
    intro: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      success: string;
      error: string;
      requiredFieldsError: string;
    };
    info: {
      title: string;
      email: string;
      hours: string;
      response: string;
    };
    faq: {
      title: string;
      text: string;
      button: string;
    };
  };
}

export interface CountryDataMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  ui: {
    title: string;
    searchLabel: string;
    filterLabel: string;
    noData: string;
    loading: string;
    error: string;
    allRegions: string;
    tableHeaders: {
      name: string;
      officialName: string;
      area: string;
      capital: string;
      languages: string;
      currency: string;
      region: string;
      source: string;
      lastUpdated: string;
    };
  };
  title: string;
  states: {
    loading: string;
    error: string;
    noData: string;
  };
  search: {
    label: string;
    placeholder: string;
  };
  filter: {
    label: string;
    allRegions: string;
  };
  table: {
    headers: {
      name: string;
      officialName: string;
      area: string;
      capital: string;
      languages: string;
      currency: string;
      region: string;
      source: string;
      lastUpdated: string;
    };
  };
}

export interface NumberQuizMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  game: {
    title: string;
    difficulty: {
      label: string;
      easy: string;
      normal: string;
      hard: string;
    };
    buttons: {
      newGame: string;
      checkSolution: string;
    };
    messages: {
      correct: string;
      incorrect: string;
      complete: string;
    };
  };
}

export interface PasswordStrengthMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  passwordLabel: string;
  strengthLabel: string;
  strengthLevel: {
    veryWeak: string;
    weak: string;
    medium: string;
    strong: string;
    veryStrong: string;
  };
  timeToCrack: string;
  timeUnits: {
    instantly: string;
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    months: string;
    years: string;
    centuries: string;
    impossible: string;
  };
  suggestions: {
    title: string;
    addLength: string;
    addNumbers: string;
    addSymbols: string;
    addUppercase: string;
    addLowercase: string;
    avoidCommon: string;
  };
  passwordVisible: string;
  passwordHidden: string;
}

export interface PrivacyPolicyMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  content: {
    intro: string;
    collection: string;
    collectionText: string;
    collectionItems: string[];
    usage: string;
    usageText: string;
    usageItems: string[];
    cookies: string;
    cookiesText: string;
    sharing: string;
    sharingText: string;
    external: string;
    externalText: string;
    contact: string;
    contactText: {
      before: string;
      link: string;
      after: string;
    };
    policy: string;
    policyText: string;
    conclusion: string;
    conclusionText: string;
  };
  updated: string;
}

export interface QrGenerationMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  ui: {
    inputLabel: string;
    placeholder: string;
    generateButton: string;
    downloadButton: string;
    copyButton: string;
    contentTypeLabel: string;
    contentTypes: {
      text: string;
      url: string;
      email: string;
      phone: string;
    };
    colorLabel: string;
    bgColorLabel: string;
    sizeLabel: string;
    errorCorrection: string;
    errorCorrectionLevels: {
      L: string;
      M: string;
      Q: string;
      H: string;
    };
    successMessage: string;
    errorMessage: string;
    emptyState: string;
  };
  features: {
    qrGeneration: string;
    textToQr: string;
    urlToQr: string;
    preview: string;
    free: string;
    noRegistration: string;
    browserRequirements: string;
  };
}

export interface RouletteMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  buttons: {
    spin: string;
    spinning: string;
    edit: string;
    save: string;
    cancel: string;
  };
  result: {
    selected: string;
    placeholder: string;
  };
  content: {
    hero: {
      title: string;
      description: string;
      darkMode: string;
    };
    howTo: {
      title: string;
      steps: {
        input: {
          title: string;
          description: string;
          note: string;
        };
        spin: {
          title: string;
          description: string;
          note: string;
        };
        result: {
          title: string;
          description: string;
          note: string;
        };
      };
    };
    testimonials: {
      title: string;
      users: {
        teacher: {
          name: string;
          comment: string;
        };
        team: {
          name: string;
          comment: string;
        };
        family: {
          name: string;
          comment: string;
        };
      };
    };
    features: {
      title: string;
      items: {
        easy: {
          title: string;
          description: string;
        };
        fair: {
          title: string;
          description: string;
        };
        visual: {
          title: string;
          description: string;
        };
        free: {
          title: string;
          description: string;
        };
      };
    };
    faq: {
      title: string;
      questions: {
        what: {
          question: string;
          answer: string;
        };
        usage: {
          question: string;
          answer: string;
        };
        save: {
          question: string;
          answer: string;
        };
        limit: {
          question: string;
          answer: string;
        };
        mobile: {
          question: string;
          answer: string;
        };
      };
    };
  };
}

export interface CharacterCounterCommonMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  placeholder: string;
  charCount: string;
  lineCount: string;
  wordCount: string;
  byteCount: string;
  searchString: string;
  enterSearchString: string;
  occurrences: string;
  searchResultPreview: string;
  copyText: string;
  copied: string;
  sidebar: {
    function: string;
    usecase: string;
    faq: string;
    plan: string;
    column: string;
  };
  content: {
    hero: {
      title: string;
      description: string;
      darkMode: string;
    };
    howTo: {
      title: string;
      steps: {
        input: {
          title: string;
          description: string;
          note: string;
        };
        realtime: {
          title: string;
          description: string;
        };
        utilize: {
          title: string;
          description: string;
        };
      };
    };
    testimonials: {
      title: string;
      users: {
        writer: {
          name: string;
          comment: string;
        };
        social: {
          name: string;
          comment: string;
        };
        marketer: {
          name: string;
          comment: string;
        };
      };
    };
    features: {
      title: string;
      items: {
        easy: {
          title: string;
          description: string;
        };
        accurate: {
          title: string;
          description: string;
        };
        free: {
          title: string;
          description: string;
        };
        darkMode: {
          title: string;
          description: string;
        };
      };
    };
    faq: {
      title: string;
      questions: {
        what: {
          question: string;
          answer: string;
        };
        usage: {
          question: string;
          answer: string;
        };
        counting: {
          question: string;
          answer: string;
        };
        languages: {
          question: string;
          answer: string;
        };
        pricing: {
          question: string;
          answer: string;
        };
      };
    };
  };
}

export interface CharacterCounterColumnMessages {
  title: string;
  description: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface CharacterCounterFaqMessages {
  title: string;
  general: {
    title: string;
    q1: {
      question: string;
      answer: string;
    };
    q2: {
      question: string;
      intro: string;
      uses: {
        1: string;
        2: string;
        3: string;
        4: string;
      };
      answer: string;
    };
  };
  technical: {
    title: string;
    q3: {
      question: string;
      answer: string;
    };
    q4: {
      question: string;
      answer: string;
    };
  };
  features: {
    title: string;
    q5: {
      question: string;
      intro: string;
      features: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
      };
    };
    q6: {
      question: string;
      answer: string;
    };
  };
  privacy: {
    title: string;
    q7: {
      question: string;
      answer: string;
    };
    q8: {
      question: string;
      answer: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface CharacterCounterFunctionMessages {
  title: string;
  keyFeatures: {
    title: string;
    charCount: {
      title: string;
      description: string;
    };
    inputBox: {
      title: string;
      description: string;
    };
    lineCount: {
      title: string;
      description: string;
    };
    wordCount: {
      title: string;
      description: string;
    };
    byteCount: {
      title: string;
      description: string;
    };
    copyButton: {
      title: string;
      description: string;
    };
    stringSearch: {
      title: string;
      description: string;
    };
  };
  howToUse: {
    title: string;
    step1: {
      title: string;
      description: string;
      text: string;
    };
    step2: {
      title: string;
      description: string;
      text: string;
    };
    step3: {
      title: string;
      description: string;
      text: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
    howTo: {
      title: string;
    };
  };
}

export interface CharacterCounterPlanMessages {
  title: string;
  description: string;
  pricing: {
    title: string;
    free: string;
    monthly: string;
    annual: string;
  };
  comparison: {
    title: string;
    feature: string;
    free: string;
    premium: string;
    features: {
      charCount: string;
      counts: string;
      search: string;
      darkMode: string;
      ads: string;
      export: string;
      api: string;
    };
    yes: string;
    no: string;
  };
  premiumFeatures: {
    title: string;
    basic: {
      title: string;
      description: string;
      features: {
        1: string;
        2: string;
        3: string;
      };
    };
    adFree: {
      title: string;
      description: string;
    };
    export: {
      title: string;
      description: string;
    };
    api: {
      title: string;
      description: string;
    };
  };
  subscriptions: {
    title: string;
    monthly: {
      title: string;
      description: string;
    };
    annual: {
      title: string;
      description: string;
    };
    note: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
    product: {
      description: string;
      offers: {
        free: {
          name: string;
          description: string;
        };
        monthly: {
          name: string;
          description: string;
        };
        annual: {
          name: string;
          description: string;
        };
      };
    };
  };
}

export interface CharacterCounterUsecaseMessages {
  title: string;
  subtitle: string;
  description: string;
  cases: {
    writing: {
      title: string;
      efficientArticle: {
        title: string;
        description: string;
      };
      structure: {
        title: string;
        description: string;
      };
    };
    social: {
      title: string;
      limits: {
        title: string;
        description: string;
      };
      adCopy: {
        title: string;
        description: string;
      };
    };
    seo: {
      title: string;
      content: {
        title: string;
        description: string;
      };
      structure: {
        title: string;
        description: string;
      };
    };
    marketing: {
      title: string;
      brand: {
        title: string;
        description: string;
      };
      documents: {
        title: string;
        description: string;
      };
    };
  };
  conclusion: string;
  testimonials: {
    title: string;
    users: {
      1: {
        name: string;
        quote: string;
      };
      2: {
        name: string;
        quote: string;
      };
      3: {
        name: string;
        quote: string;
      };
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
    article: {
      headline: string;
      description: string;
      body: string;
    };
  };
}

export interface HealthToolsCommonMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  common: {
    copyButton: string;
    copied: string;
    generateButton: string;
    downloadButton: string;
    resetButton: string;
    settings: string;
    preview: string;
    result: string;
    options: string;
    customize: string;
  };
  title: string;
  description: string;
  tools: {
    bmiCalculator: {
      title: string;
      description: string;
    };
    calorieCounter: {
      title: string;
      description: string;
    };
    heartRateZones: {
      title: string;
      description: string;
    };
    waterIntakeCalculator: {
      title: string;
      description: string;
    };
    sleepCalculator: {
      title: string;
      description: string;
    };
    stressLevelTest: {
      title: string;
      description: string;
    };
  };
}

export interface HealthToolsBmiCalculatorMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    height: {
      label: string;
      cm: string;
      feet: string;
      inches: string;
      placeholder: string;
    };
    weight: {
      label: string;
      kg: string;
      lbs: string;
      placeholder: string;
    };
    calculate: string;
    reset: string;
    units: {
      label: string;
      metric: string;
      imperial: string;
    };
  };
  result: {
    title: string;
    bmi: string;
    empty: string;
    categories: {
      underweight: string;
      underweightDesc: string;
      normal: string;
      normalDesc: string;
      overweight: string;
      overweightDesc: string;
      obese: string;
      obeseDesc: string;
    };
  };
  about: {
    whatIsBmi: {
      title: string;
      description: string;
    };
    howToCalculate: {
      title: string;
      description: string;
    };
    limitations: {
      title: string;
      description: string;
    };
    healthyRange: {
      title: string;
      description: string;
    };
    whatToDo: {
      title: string;
      description: string;
    };
  };
}

export interface ImageToolsCommonMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  tools: {
    jpgToPng: {
      title: string;
      description: string;
    };
    pngToJpg: {
      title: string;
      description: string;
    };
    heicToJpg: {
      title: string;
      description: string;
    };
    heicToPng: {
      title: string;
      description: string;
    };
    heicToWebp: {
      title: string;
      description: string;
    };
    jpgToWebp: {
      title: string;
      description: string;
    };
    pngToWebp: {
      title: string;
      description: string;
    };
    svgToJpg: {
      title: string;
      description: string;
    };
    svgToPng: {
      title: string;
      description: string;
    };
    svgToWebp: {
      title: string;
      description: string;
    };
  };
}

export interface ImageToolsHeicToJpgMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  result: {
    download: string;
    downloadAll: string;
    preview: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    convertingFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversion: string;
  };
  preview: {
    filesSelected: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsHeicToPngMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    title: string;
    dragndrop: string;
    button: string;
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  convert: {
    button: string;
    processing: string;
    download: string;
    downloadAll: string;
    converted: string;
  };
  preview: {
    title: string;
    nofiles: string;
  };
  error: {
    invalidFormat: string;
    tooLarge: string;
    noFiles: string;
    failed: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsHeicToWebpMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    title: string;
    dragndrop: string;
    button: string;
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  convert: {
    button: string;
    processing: string;
    download: string;
    downloadAll: string;
    converted: string;
  };
  preview: {
    title: string;
    nofiles: string;
  };
  error: {
    invalidFormat: string;
    tooLarge: string;
    noFiles: string;
    failed: string;
  };
  result: {
    download: string;
    downloadAll: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    convertingFile: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsJpgToPngMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      limitText: string;
    };
    convert: string;
  };
  result: {
    download: string;
    convertedResult: string;
    downloadAll: string;
    preview: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    browserProcessing: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversionFailed: string;
  };
  preview: {
    title: string;
    fileSelected: string;
    filesSelected: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsJpgToWebpMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  preview: {
    title: string;
    filesSelected: string;
  };
  result: {
    title: string;
    download: string;
    downloadAll: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsPngToJpgMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      limitText: string;
    };
    convert: string;
  };
  result: {
    download: string;
    downloadAll: string;
    preview: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    browserProcessing: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversionFailed: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsPngToWebpMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  upload: {
    limit: string;
  };
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  preview: {
    title: string;
    filesSelected: string;
  };
  result: {
    title: string;
    download: string;
    downloadAll: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsSvgToJpgMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      limitText: string;
    };
    convert: string;
  };
  result: {
    download: string;
    downloadAll: string;
    preview: string;
    selectedFiles: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    browserProcessing: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversionFailed: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsSvgToPngMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      limitText: string;
    };
    convert: string;
  };
  result: {
    download: string;
    downloadAll: string;
    preview: string;
    selectedFiles: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    browserProcessing: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversionFailed: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface ImageToolsSvgToWebpMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      limitText: string;
    };
    convert: string;
  };
  result: {
    download: string;
    downloadAll: string;
    preview: string;
    selectedFiles: string;
  };
  status: {
    processing: string;
    noFile: string;
    success: string;
    browserProcessing: string;
  };
  error: {
    fileType: string;
    fileSize: string;
    conversionFailed: string;
  };
  seoText: {
    overview: {
      title: string;
      content: string;
    };
    howTo: {
      title: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
    testimonials: {
      title: string;
      users: {
        name: string;
        comment: string;
      }[];
    };
    features: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    faq: {
      title: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
}

export interface PdfToolsCommonMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  tools: {
    pdfToJpg: {
      title: string;
      description: string;
    };
    jpgToPdf: {
      title: string;
      description: string;
    };
    webToPdf: {
      title: string;
      description: string;
    };
    pdfToWord: {
      title: string;
      description: string;
    };
    pdfToPng: {
      title: string;
      description: string;
    };
    pngToPdf: {
      title: string;
      description: string;
    };
    svgToPdf: {
      title: string;
      description: string;
    };
    pdfToEpub: {
      title: string;
      description: string;
    };
    heicToPdf: {
      title: string;
      description: string;
    };
  };
}

export interface PdfToolsHeicToPdfMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  result: {
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileSize: string;
    fileType: string;
    conversion: string;
  };
  success: {
    message: string;
  };
}

export interface PdfToolsJpgToPdfMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    quality: {
      label: string;
      low: string;
      medium: string;
      high: string;
    };
    convert: string;
  };
  result: {
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
  preview: {
    title: string;
    imageSelected: string;
    imagesSelected: string;
  };
}

export interface PdfToolsPdfToEpubMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      dragging: string;
      instruction: string;
      maxSize: string;
    };
    convert: string;
  };
  result: {
    download: string;
    conversionComplete: string;
  };
  status: {
    processing: string;
    noFile: string;
    loading: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
}

export interface PdfToolsPdfToJpgMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    quality: {
      label: string;
      low: string;
      medium: string;
      high: string;
    };
    convert: string;
  };
  result: {
    downloadAll: string;
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
}

export interface PdfToolsPdfToPngMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    quality: {
      label: string;
      low: string;
      medium: string;
      high: string;
    };
    convert: string;
  };
  result: {
    downloadAll: string;
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
}

export interface PdfToolsPdfToWordMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      dragging: string;
      instruction: string;
      maxSize: string;
    };
    format: {
      label: string;
      docx: string;
      doc: string;
    };
    convert: string;
  };
  result: {
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
  loading: string;
}

export interface PdfToolsPngToPdfMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  result: {
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
}

export interface PdfToolsSvgToPdfMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
    };
    convert: string;
  };
  result: {
    download: string;
  };
  status: {
    processing: string;
    noFile: string;
  };
  error: {
    fileType: string;
    fileSize: string;
  };
}

export interface PdfToolsWebToPdfMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    url: {
      label: string;
      placeholder: string;
      button: string;
    };
  };
  result: {
    download: string;
    preview: string;
  };
  status: {
    processing: string;
    noUrl: string;
    success: string;
  };
  error: {
    invalidUrl: string;
    conversionFailed: string;
    networkError: string;
    timeout: string;
  };
  loading: string;
  preview: {
    loading: string;
    error: string;
    pageOf: string;
  };
}

export interface SeoToolsCommonMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  tools: {
    pageSpeedChecker: {
      title: string;
      description: string;
    };
    linkStatusChecker: {
      title: string;
      description: string;
    };
    seoCannibalizationChecker: {
      title: string;
      description: string;
    };
    seoVolumeGuess: {
      title: string;
      description: string;
    };
    pageStructureChecker: {
      title: string;
      description: string;
    };
    metaCraftForLlm: {
      title: string;
      description: string;
    };
  };
}

export interface SeoToolsLinkStatusCheckerMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    url: {
      label: string;
      placeholder: string;
    };
    button: {
      check: string;
      checking: string;
    };
  };
  results: {
    title: string;
    status: string;
    processing_url: string;
    checking_links: string;
    total_links_checked: string;
  };
  errors: {
    general: string;
    timeout: string;
    network: string;
    invalid_url: string;
  };
}

export interface SeoToolsMetaCraftForLlmMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  url: {
    label: string;
    placeholder: string;
    button: string;
  };
  result: {
    title: string;
    titleTag: string;
    metaDescription: string;
    ogTags: string;
    twitterTags: string;
    jsonLd: string;
    jsonLdImportance: string;
    jsonLdDescription: string;
    otherElements: string;
  };
  copy: {
    button: string;
  };
  error: {
    fetch: string;
    parsing: string;
    urlRequired: string;
    invalidUrl: string;
    fetchFailed: string;
    fetchWithStatus: string;
  };
  loading: string;
  seoInfo: {
    title: string;
    description: string;
    points: string[];
    conclusion: string;
  };
}

export interface SeoToolsPageSpeedCheckerMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  input: {
    url: string;
    analyzeButton: string;
    securityNote: string;
  };
  results: {
    loading: string;
    loadTime: string;
    resources: string;
    suggestions: string;
  };
  error: {
    invalidUrl: string;
    fetchFailed: string;
  };
  status: {
    noUrl: string;
  };
  analysis: {
    loadTime: {
      slow: string;
      medium: string;
      fast: string;
    };
    resources: {
      totalSize: string;
      largeImages: string;
      manyJs: string;
      slowResources: string;
      others: string;
    };
    security: string;
    imageOptimization: string;
    javascriptOptimization: string;
    cssOptimization: string;
    fontOptimization: string;
    serverOptimization: string;
    mobileOptimization: string;
    coreWebVitals: string;
    recommendedTools: string;
    tryPageSpeedInsights: string;
  };
}

export interface SeoToolsPageStructureCheckerMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    urlLabel: string;
    urlPlaceholder: string;
    analyzing: string;
    analyze: string;
    example: string;
  };
  error: {
    title: string;
    urlRequired: string;
    invalidUrl: string;
    fetchFailed: string;
    networkError: string;
    serverError: string;
    timeoutError: string;
    parsingError: string;
    invalidJson: string;
    fetchWithStatus: string;
    emptyHtml: string;
    timeout: string;
    fetchError: string;
    unknownFetchError: string;
    unknownServerError: string;
  };
  metaTitle: string;
  headingStructure: string;
  headingsStructure: string;
  headingsExplanation: string;
  headingsLevelsTitle: string;
  contentStructureTitle: string;
  contentStructureExplanation: string;
  viewHeadings: string;
  issues: string;
  noTitle: string;
  noDescription: string;
  noCanonical: string;
  noHeadings: string;
  warning: string;
  analysis: string;
  good: string;
  missing: string;
  present: string;
  tag: string;
  count: string;
  hierarchyIssue: string;
  headingIssue: string;
  noH1: string;
  multipleH1: string;
  skippedLevel: string;
  issueFound: string;
  hierarchyIssueMessage: string;
  recommended: string;
  importantForSeo: string;
  headings: string;
}

export interface SeoToolsSeoCannibalizationCheckerMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  domain: {
    label: string;
    placeholder: string;
    help: string;
  };
  keyword: {
    label: string;
    placeholder: string;
    help: string;
  };
  button: {
    check: string;
    processing: string;
  };
  result: {
    title: string;
    description: string;
    openButton: string;
  };
  error: {
    emptyDomain: string;
    invalidDomain: string;
    emptyKeyword: string;
    generic: string;
  };
}

export interface SeoToolsSeoVolumeGuessMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  input: {
    placeholder: string;
  };
  button: {
    analyze: string;
  };
  result: {
    volumeScore: string;
    suggestions: string;
    allSuggestions: string;
    scoreDescription1: string;
    scoreDescription2: string;
    scoreDescription3: string;
    scoreDescription4: string;
    scoreDescription5: string;
  };
  error: {
    emptyKeyword: string;
    unknown: string;
    apiError: string;
  };
  country: {
    selector: string;
    result: string;
    japan: string;
    us: string;
    uk: string;
    australia: string;
    canada: string;
    germany: string;
    france: string;
    india: string;
  };
  notice: {
    title: string;
    language: string;
    location: string;
  };
}

export interface WordGenCommonMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  common: {
    copyButton: string;
    copied: string;
    generateButton: string;
    downloadButton: string;
    resetButton: string;
    settings: string;
    preview: string;
    result: string;
    length: string;
    options: string;
    customize: string;
  };
  title: string;
  description: string;
  tools: {
    wordGenerator: {
      title: string;
      description: string;
    };
    wordCardGenerator: {
      title: string;
      description: string;
    };
    sentenceGenerator: {
      title: string;
      description: string;
    };
    nameGenerator: {
      title: string;
      description: string;
    };
    passwordGenerator: {
      title: string;
      description: string;
    };
    storyGenerator: {
      title: string;
      description: string;
    };
    japaneseKanjiGenerator: {
      title: string;
      description: string;
    };
  };
}

export interface WordGenJapaneseKanjiGeneratorMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  generate: {
    button: string;
    loading: string;
  };
  download: {
    button: string;
    jpg: string;
    png: string;
  };
  copy: {
    button: string;
    success: string;
  };
  display: {
    noImage: string;
  };
  error: {
    generation: string;
    download: string;
  };
  font: {
    loading: string;
  };
}

export interface WordGenNameGeneratorMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    count: {
      label: string;
    };
    generate: string;
  };
  result: {
    title: string;
    empty: string;
    copyTitle: string;
    copy: string;
    copied: string;
    download: string;
    downloaded: string;
  };
  about: {
    catchphrase: string;
    introduction: string;
    features: {
      title: string;
      oneClick: {
        title: string;
        description: string;
      };
      patterns: {
        title: string;
        description: string;
      };
      categories: {
        title: string;
        description: string;
      };
    };
    useCases: {
      title: string;
      character: {
        title: string;
        description: string;
      };
      branding: {
        title: string;
        description: string;
      };
      personal: {
        title: string;
        description: string;
      };
    };
    technical: {
      title: string;
      algorithm: {
        title: string;
        description: string;
      };
      updates: {
        title: string;
        description: string;
      };
      responsive: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      commercial: {
        question: string;
        answer: string;
      };
      categories: {
        question: string;
        answer: string;
      };
      retry: {
        question: string;
        answer: string;
      };
    };
    conclusion: {
      title: string;
      description: string;
    };
  };
  useCases: {
    title: string;
    creative: {
      title: string;
      description: string;
    };
    gaming: {
      title: string;
      description: string;
    };
    testing: {
      title: string;
      description: string;
    };
  };
  faq: {
    title: string;
    q1: {
      question: string;
      answer: string;
    };
    q2: {
      question: string;
      answer: string;
    };
    q3: {
      question: string;
      answer: string;
    };
  };
}

export interface WordGenPasswordGeneratorMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  catchphrase: string;
  intro: string;
  generatedPassword: string;
  copyButton: string;
  copied: string;
  passwordLength: string;
  characterTypes: {
    uppercase: string;
    lowercase: string;
    numbers: string;
    symbols: string;
  };
  generateButton: string;
  description: {
    title: string;
    intro: string;
  };
  features: {
    title: string;
    easyOperation: {
      title: string;
      description: string;
    };
    customization: {
      title: string;
      description: string;
    };
    security: {
      title: string;
      description: string;
    };
  };
  useCases: {
    title: string;
    onlineAccounts: {
      title: string;
      description: string;
    };
    corporate: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
  };
  technical: {
    title: string;
    algorithm: {
      title: string;
      description: string;
    };
    performance: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
  };
  faq: {
    title: string;
    questions: {
      security: {
        question: string;
        answer: string;
      };
      customization: {
        question: string;
        answer: string;
      };
      commercial: {
        question: string;
        answer: string;
      };
    };
  };
  conclusion: {
    title: string;
    description: string;
  };
}

export interface WordGenSentenceGeneratorMessages {
  title: string;
  description: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  form: {
    count: {
      label: string;
    };
    generate: string;
    copy: string;
  };
  result: {
    empty: string;
    copyTitle: string;
    copied: string;
  };
  detailedContent: {
    catchphrase: string;
    introduction: string;
    features: {
      title: string;
      easyOperation: {
        title: string;
        description: string;
      };
      patterns: {
        title: string;
        description: string;
      };
      customization: {
        title: string;
        description: string;
      };
    };
    useCases: {
      title: string;
      writer: {
        title: string;
        description: string;
      };
      creative: {
        title: string;
        description: string;
      };
      education: {
        title: string;
        description: string;
      };
    };
    technical: {
      title: string;
      nlp: {
        title: string;
        description: string;
      };
      database: {
        title: string;
        description: string;
      };
      performance: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      quality: {
        question: string;
        answer: string;
      };
      commercial: {
        question: string;
        answer: string;
      };
      style: {
        question: string;
        answer: string;
      };
    };
    conclusion: {
      title: string;
      description: string;
    };
  };
}

export interface WordGenStoryGeneratorMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  catchphrase: string;
  intro: string;
  form: {
    generate: string;
  };
  result: {
    empty: string;
    copyTitle: string;
    copyAlt: string;
    copied: string;
  };
  features: {
    title: string;
    oneClick: {
      title: string;
      description: string;
    };
    patterns: {
      title: string;
      description: string;
    };
    customization: {
      title: string;
      description: string;
    };
  };
  useCases: {
    title: string;
    novel: {
      title: string;
      description: string;
    };
    game: {
      title: string;
      description: string;
    };
    workshop: {
      title: string;
      description: string;
    };
  };
  technical: {
    title: string;
    algorithm: {
      title: string;
      description: string;
    };
    database: {
      title: string;
      description: string;
    };
    performance: {
      title: string;
      description: string;
    };
  };
  faq: {
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
  };
  conclusion: {
    title: string;
    description: string;
  };
}

export interface WordGenWordCardGeneratorMessages {
  title: string;
  description: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  form: {
    count: {
      label: string;
    };
    generate: string;
  };
  result: {
    title: string;
    empty: string;
    copy: string;
    copied: string;
  };
  card: {
    length: string;
    category: string;
  };
  howTo: {
    title: string;
    description: string;
  };
  useCases: {
    title: string;
    vocabulary: string;
    teaching: string;
    games: string;
    writing: string;
    esl: string;
  };
  about: {
    catchphrase: string;
    introduction: string;
    features: {
      title: string;
      oneClick: {
        title: string;
        description: string;
      };
      database: {
        title: string;
        description: string;
      };
      design: {
        title: string;
        description: string;
      };
    };
    useCases: {
      title: string;
      vocabulary: {
        title: string;
        description: string;
      };
      brainstorming: {
        title: string;
        description: string;
      };
      games: {
        title: string;
        description: string;
      };
    };
    technical: {
      title: string;
      algorithm: {
        title: string;
        description: string;
      };
      database: {
        title: string;
        description: string;
      };
      responsive: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      questions: {
        free: {
          question: string;
          answer: string;
        };
        customize: {
          question: string;
          answer: string;
        };
        print: {
          question: string;
          answer: string;
        };
      };
    };
    conclusion: {
      title: string;
      description: string;
    };
  };
}

export interface WordGenWordGeneratorMessages {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  title: string;
  description: string;
  form: {
    length: {
      label: string;
      min: string;
      max: string;
    };
    count: {
      label: string;
      placeholder: string;
    };
    generate: string;
    clear: string;
  };
  result: {
    title: string;
    empty: string;
    copy: string;
    copied: string;
    download: string;
    downloaded: string;
  };
  about: {
    catchphrase: string;
    introduction: string;
    features: {
      title: string;
      oneClick: {
        title: string;
        description: string;
      };
      database: {
        title: string;
        description: string;
      };
      design: {
        title: string;
        description: string;
      };
    };
    useCases: {
      title: string;
      scenes: {
        title: string;
        writer: string;
        designer: string;
        brainstorming: string;
      };
      testimonials: {
        title: string;
        writer: {
          name: string;
          quote: string;
        };
        designer: {
          name: string;
          quote: string;
        };
      };
    };
    technical: {
      title: string;
      algorithm: {
        title: string;
        description: string;
      };
      database: {
        title: string;
        description: string;
      };
      performance: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      questions: {
        free: {
          question: string;
          answer: string;
        };
        words: {
          question: string;
          answer: string;
        };
        commercial: {
          question: string;
          answer: string;
        };
        mobile: {
          question: string;
          answer: string;
        };
      };
    };
    conclusion: {
      title: string;
      description: string;
    };
  };
}

export interface AllMessages {
  common?: CommonMessages;
  about?: AboutMessages;
  contact?: ContactMessages;
  countryData?: CountryDataMessages;
  numberQuiz?: NumberQuizMessages;
  passwordStrength?: PasswordStrengthMessages;
  privacyPolicy?: PrivacyPolicyMessages;
  qrGeneration?: QrGenerationMessages;
  roulette?: RouletteMessages;
  characterCounter?: {
    common?: CharacterCounterCommonMessages;
    column?: CharacterCounterColumnMessages;
    faq?: CharacterCounterFaqMessages;
    function?: CharacterCounterFunctionMessages;
    plan?: CharacterCounterPlanMessages;
    usecase?: CharacterCounterUsecaseMessages;
  };
  healthTools?: {
    common?: HealthToolsCommonMessages;
    bmiCalculator?: HealthToolsBmiCalculatorMessages;
  };
  imageTools?: {
    common?: ImageToolsCommonMessages;
    heicToJpg?: ImageToolsHeicToJpgMessages;
    heicToPng?: ImageToolsHeicToPngMessages;
    heicToWebp?: ImageToolsHeicToWebpMessages;
    jpgToPng?: ImageToolsJpgToPngMessages;
    jpgToWebp?: ImageToolsJpgToWebpMessages;
    pngToJpg?: ImageToolsPngToJpgMessages;
    pngToWebp?: ImageToolsPngToWebpMessages;
    svgToJpg?: ImageToolsSvgToJpgMessages;
    svgToPng?: ImageToolsSvgToPngMessages;
    svgToWebp?: ImageToolsSvgToWebpMessages;
  };
  pdfTools?: {
    common?: PdfToolsCommonMessages;
    heicToPdf?: PdfToolsHeicToPdfMessages;
    jpgToPdf?: PdfToolsJpgToPdfMessages;
    pdfToEpub?: PdfToolsPdfToEpubMessages;
    pdfToJpg?: PdfToolsPdfToJpgMessages;
    pdfToPng?: PdfToolsPdfToPngMessages;
    pdfToWord?: PdfToolsPdfToWordMessages;
    pngToPdf?: PdfToolsPngToPdfMessages;
    svgToPdf?: PdfToolsSvgToPdfMessages;
    webToPdf?: PdfToolsWebToPdfMessages;
  };
  seoTools?: {
    common?: SeoToolsCommonMessages;
    linkStatusChecker?: SeoToolsLinkStatusCheckerMessages;
    metaCraftForLlm?: SeoToolsMetaCraftForLlmMessages;
    pageSpeedChecker?: SeoToolsPageSpeedCheckerMessages;
    pageStructureChecker?: SeoToolsPageStructureCheckerMessages;
    seoCannibalizationChecker?: SeoToolsSeoCannibalizationCheckerMessages;
    seoVolumeGuess?: SeoToolsSeoVolumeGuessMessages;
  };
  wordGen?: {
    common?: WordGenCommonMessages;
    japaneseKanjiGenerator?: WordGenJapaneseKanjiGeneratorMessages;
    nameGenerator?: WordGenNameGeneratorMessages;
    passwordGenerator?: WordGenPasswordGeneratorMessages;
    sentenceGenerator?: WordGenSentenceGeneratorMessages;
    storyGenerator?: WordGenStoryGeneratorMessages;
    wordCardGenerator?: WordGenWordCardGeneratorMessages;
    wordGenerator?: WordGenWordGeneratorMessages;
  };
}