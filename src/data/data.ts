export interface AnalyticsData {
  overview: {
    visitors: number;
    visitorsChange: number;
    sessions: number;
    sessionsChange: number;
    avgSessionSeconds: number;
    avgSessionChange: number;
    liveNow: number;
    returningVisitors: number;
    visitorTrend: {
      label: string;
      value: number;
    }[];
  };

  audience: {
    devices: {
      desktop: number;
      mobile: number;
      tablet: number;
    };

    countries: {
      name: string;
      percentage: number;
    }[];

    technology: {
      browser: {
        name: string;
        percentage: number;
      };
      os: {
        name: string;
        percentage: number;
      };
      resolution: {
        name: string;
        percentage: number;
      };
      language: {
        name: string;
        percentage: number;
      };
    };
  };

  acquisition: {
    sources: {
      name: string;
      percentage: number;
    }[];

    newUsers: number;

    newUsersTrend: number[];

    engagementRate: number;

    engagementChange: number;

    bestReferral: {
      name: string;
      avgSessionSeconds: number;
    };
  };

  content: {
    mostViewed: {
      name: string;
      views: number;
    }[];

    pagesPerSession: number;

    pagesTrend: number[];

    bounceRate: number;

    bounceTrend: number[];

    topProject: {
      name: string;
      percentage: number;
    };
  };
}

export const AnalyticsDataList: AnalyticsData[] = [
  {
    overview: {
      visitors: 1284,
      visitorsChange: 18.4,
      sessions: 1637,
      sessionsChange: 12.8,
      avgSessionSeconds: 161,
      avgSessionChange: 14,
      liveNow: 7,
      returningVisitors: 68,
      visitorTrend: [
        { label: "Pzt", value: 12 },
        { label: "Sal", value: 3 },
        { label: "Çar", value: 0 },
        { label: "Per", value: 2 },
        { label: "Cum", value: 5 },
        { label: "Cmt", value: 1 },
        { label: "Paz", value: 0 },
      ],
    },

    audience: {
      devices: {
        desktop: 923,
        mobile: 231,
        tablet: 130,
      },
      countries: [
        { name: "Türkiye", percentage: 54 },
        { name: "Almanya", percentage: 13 },
        { name: "Amerika Birleşik Devletleri", percentage: 10 },
        { name: "Birleşik Krallık", percentage: 8 },
        { name: "Diğer", percentage: 15 },
      ],
      technology: {
        browser: {
          name: "Chrome",
          percentage: 64,
        },
        os: {
          name: "Windows",
          percentage: 61,
        },
        resolution: {
          name: "1920×1080",
          percentage: 34,
        },
        language: {
          name: "TR",
          percentage: 57,
        },
      },
    },

    acquisition: {
      sources: [
        { name: "Doğrudan", percentage: 38 },
        { name: "Google", percentage: 26 },
        { name: "LinkedIn", percentage: 22 },
        { name: "GitHub", percentage: 14 },
      ],
      newUsers: 411,
      newUsersTrend: [30, 45, 35, 62, 48, 75, 68, 84],
      engagementRate: 68.2,
      engagementChange: 8.6,
      bestReferral: {
        name: "LinkedIn ziyaretçileri",
        avgSessionSeconds: 252,
      },
    },

    content: {
      mostViewed: [
        { name: "Projeler", views: 892 },
        { name: "Hakkımda", views: 641 },
        { name: "Yetenekler", views: 534 },
        { name: "İletişim", views: 218 },
      ],
      pagesPerSession: 4.7,
      pagesTrend: [35, 48, 42, 65, 54, 76, 82],
      bounceRate: 31.8,
      bounceTrend: [72, 64, 69, 58, 52, 47, 44, 38],
      topProject: {
        name: "TurkishEngineering",
        percentage: 37.4,
      },
    },
  },
];
