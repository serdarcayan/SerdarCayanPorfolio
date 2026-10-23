import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type UIEvent } from "react";
import { AnalyticsDataList, type AnalyticsData } from "../../data/data";
import SectionTemplate from "../layout/SectionTemplate";

const dataPointCount = 4;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("tr-TR").format(value);
};

const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

const formatChange = (value: number) => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
};

const getChangeClass = (value: number) => {
  if (value > 0) return "text-emerald-600";
  if (value < 0) return "text-red-500";
  return "text-neutral-500";
};

const getDeviceTotal = (devices: AnalyticsData["audience"]["devices"]) => {
  return devices.desktop + devices.mobile + devices.tablet;
};

const getDevicePercentage = (value: number, total: number) => {
  if (!total) return 0;

  return Math.round((value / total) * 100);
};

/* -------------------------------------------------------------------------- */
/* Dynamic SVG chart helpers                                                  */
/* -------------------------------------------------------------------------- */

const buildLinePath = (
  values: number[],
  width = 700,
  height = 120,
  padding = 8,
) => {
  if (!values.length) return "";

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x =
        values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;

      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
};

const buildAreaPath = (
  values: number[],
  width = 700,
  height = 120,
  padding = 8,
) => {
  const linePath = buildLinePath(values, width, height, padding);

  if (!linePath) return "";

  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
};

const getMaxValue = (values: number[]) => {
  if (!values.length) return 1;

  return Math.max(...values, 1);
};

/* -------------------------------------------------------------------------- */
/* Fallback                                                                   */
/* -------------------------------------------------------------------------- */

const fallbackAnalytics: AnalyticsData = {
  overview: {
    visitors: 0,
    visitorsChange: 0,
    sessions: 0,
    sessionsChange: 0,
    avgSessionSeconds: 0,
    avgSessionChange: 0,
    liveNow: 0,
    returningVisitors: 0,
    visitorTrend: [],
  },

  audience: {
    devices: {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    },

    countries: [],

    technology: {
      browser: {
        name: "—",
        percentage: 0,
      },
      os: {
        name: "—",
        percentage: 0,
      },
      resolution: {
        name: "—",
        percentage: 0,
      },
      language: {
        name: "—",
        percentage: 0,
      },
    },
  },

  acquisition: {
    sources: [],
    newUsers: 0,
    newUsersTrend: [],
    engagementRate: 0,
    engagementChange: 0,
    bestReferral: {
      name: "—",
      avgSessionSeconds: 0,
    },
  },

  content: {
    mostViewed: [],
    pagesPerSession: 0,
    pagesTrend: [],
    bounceRate: 0,
    bounceTrend: [],
    topProject: {
      name: "—",
      percentage: 0,
    },
  },
};

const DataSection = () => {
  const [activeDataPoint, setActiveDataPoint] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const [analytics, setAnalytics] = useState<AnalyticsData>(fallbackAnalytics);

  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  /* ------------------------------------------------------------------------ */
  /* Analytics API                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      try {
        const response = await fetch("/api/stats", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Analytics API failed: ${response.status}`);
        }

        const data: AnalyticsData = await response.json();

        if (!cancelled) {
          setAnalytics(data);
          setAnalyticsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load analytics:", error);
        const fallbackData = AnalyticsDataList[0] ?? fallbackAnalytics;

        if (!cancelled) {
          setAnalytics(fallbackData);
          setAnalyticsLoading(false);
        }
      }
    };

    loadAnalytics();

    /*
     * Near real-time refresh.
     * 30 seconds keeps the database/API load reasonable.
     */
    const interval = window.setInterval(loadAnalytics, 30_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Carousel                                                                 */
  /* ------------------------------------------------------------------------ */

  const handleCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget;

    const carouselCenter =
      carousel.getBoundingClientRect().left + carousel.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(carousel.children).forEach((child, index) => {
      const card = child as HTMLElement;

      const cardCenter =
        card.getBoundingClientRect().left + card.offsetWidth / 2;

      const distance = Math.abs(cardCenter - carouselCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveDataPoint(closestIndex);
  };

  const goToDataPoint = (index: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.children[index];

    if (!carousel || !(card instanceof HTMLElement)) return;

    const carouselCenter =
      carousel.getBoundingClientRect().left + carousel.clientWidth / 2;

    const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;

    carousel.scrollTo({
      left: carousel.scrollLeft + cardCenter - carouselCenter,
      behavior: "smooth",
    });
  };

  const goToPreviousDataPoint = () => {
    goToDataPoint(Math.max(0, activeDataPoint - 1));
  };

  const goToNextDataPoint = () => {
    const lastIndex =
      (carouselRef.current?.children.length ?? dataPointCount) - 1;

    goToDataPoint(Math.min(lastIndex, activeDataPoint + 1));
  };

  /* ------------------------------------------------------------------------ */
  /* Derived data                                                             */
  /* ------------------------------------------------------------------------ */

  const { overview, audience, acquisition, content } = analytics;

  const deviceTotal = getDeviceTotal(audience.devices);

  const desktopPercentage = getDevicePercentage(
    audience.devices.desktop,
    deviceTotal,
  );

  const mobilePercentage = getDevicePercentage(
    audience.devices.mobile,
    deviceTotal,
  );

  const tabletPercentage = getDevicePercentage(
    audience.devices.tablet,
    deviceTotal,
  );

  const visitorValues = overview.visitorTrend.map((item) => item.value);

  const visitorPath = buildLinePath(visitorValues);

  const visitorAreaPath = buildAreaPath(visitorValues);

  const mostViewedMax = Math.max(
    ...content.mostViewed.map((item) => item.views),
    1,
  );

  const newUsersMax = getMaxValue(acquisition.newUsersTrend);

  const pagesMax = getMaxValue(content.pagesTrend);

  const bounceMax = getMaxValue(content.bounceTrend);

  const deviceDegrees = {
    desktop: desktopPercentage * 3.6,
    mobile: desktopPercentage * 3.6 + mobilePercentage * 3.6,
  };

  if (analyticsLoading) {
    return (
      <SectionTemplate
        className="analytics-theme"
        hasHeader={false}
        hasJourney={false}
      >
        <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
          Analitikler yükleniyor...
        </div>
      </SectionTemplate>
    );
  }

  return (
    <SectionTemplate
      className="analytics-theme relative"
      hasHeader={true}
      hasJourney={false}
      smallText={"BUNU DA İLGİNİZİ ÇEKEBİLİR"}
      sectionTitle={"CANLI VERİ VE ANALİTİKLER"}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl min-h-0 flex-col gap-6 sm:gap-8 md:gap-10">
        <section
          aria-label="Data analytics highlights"
          className="flex w-full min-h-0 min-w-0 flex-1"
        >
          <div
            ref={carouselRef}
            aria-label="Data points carousel"
            className="data-carousel flex h-full w-full touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-4"
            onScroll={handleCarouselScroll}
            role="region"
            tabIndex={0}
          >
            {/* ---------------------------------------------------------------- */}
            {/* OVERVIEW                                                         */}
            {/* ---------------------------------------------------------------- */}

            <article className="flex min-h-40 basis-[97%] shrink-0 snap-center flex-col overflow-hidden rounded-lg bg-linear-to-br from-white/95 via-sky-50/80 to-cyan-50/60 p-3 shadow-md sm:rounded-xl sm:p-5 overflow-y-auto">
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[9px]">
                    Genel bakış
                  </p>

                  <h4 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-2xl">
                    Kitle genel görünümü
                  </h4>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-neutral-900 px-2.5 py-1 text-[8px] font-semibold text-white sm:px-3 sm:text-[9px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  CANLI
                </div>
              </div>

              <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-4 sm:gap-3">
                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-2.5 sm:rounded-xl sm:p-3">
                  <p className="text-[8px] uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                    Ziyaretçiler
                  </p>

                  <p className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                    {formatNumber(overview.visitors)}
                  </p>

                  <p
                    className={`mt-0.5 text-[8px] font-medium sm:text-[9px] ${getChangeClass(
                      overview.visitorsChange,
                    )}`}
                  >
                    {formatChange(overview.visitorsChange)}
                  </p>
                </div>

                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-2.5 sm:rounded-xl sm:p-3">
                  <p className="text-[8px] uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                    Oturumlar
                  </p>

                  <p className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                    {formatNumber(overview.sessions)}
                  </p>

                  <p
                    className={`mt-0.5 text-[8px] font-medium sm:text-[9px] ${getChangeClass(
                      overview.sessionsChange,
                    )}`}
                  >
                    {formatChange(overview.sessionsChange)}
                  </p>
                </div>

                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-2.5 sm:rounded-xl sm:p-3">
                  <p className="text-[8px] uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                    Ort. Oturum
                  </p>

                  <p className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                    {formatDuration(overview.avgSessionSeconds)}
                  </p>

                  <p
                    className={`mt-0.5 text-[8px] font-medium sm:text-[9px] ${getChangeClass(
                      overview.avgSessionChange,
                    )}`}
                  >
                    {overview.avgSessionChange >= 0 ? "+" : ""}
                    {overview.avgSessionChange}s
                  </p>
                </div>

                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-2.5 sm:rounded-xl sm:p-3">
                  <p className="text-[8px] uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                    Şu an canlı
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 sm:h-2 sm:w-2" />

                    <p className="text-xl font-bold tracking-tight sm:text-2xl">
                      {formatNumber(overview.liveNow)}
                    </p>
                  </div>

                  <p className="mt-0.5 text-[8px] text-neutral-500 sm:text-[9px]">
                    aktif
                  </p>
                </div>

                <div className="col-span-2 min-h-28 rounded-lg border border-neutral-200/80 bg-white/70 p-2.5 sm:min-h-32 sm:rounded-xl sm:p-3 md:col-span-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                      Ziyaretçiler · 7 gün
                    </p>

                    <span className="text-[8px] text-neutral-400 sm:text-[9px]">
                      {formatNumber(overview.visitors)}
                    </span>
                  </div>

                  <div className="mt-2 h-20 w-full sm:mt-3 sm:h-24">
                    {visitorPath ? (
                      <svg
                        viewBox="0 0 700 120"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                        role="img"
                        aria-label="Visitors trend"
                      >
                        <defs>
                          <linearGradient
                            id="overviewArea"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#0e7490"
                              stopOpacity=".15"
                            />

                            <stop
                              offset="100%"
                              stopColor="#0e7490"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        <path d={visitorAreaPath} fill="url(#overviewArea)" />

                        <path
                          d={visitorPath}
                          fill="none"
                          stroke="#0e7490"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />

                        {visitorValues.length > 0 && (
                          <circle
                            cx={visitorValues.length === 1 ? 350 : 700}
                            cy={
                              visitorValues.length === 1
                                ? 60
                                : Number(visitorPath.split(" ").slice(-1)[0]) ||
                                  8
                            }
                            r="4"
                            fill="#155e75"
                          />
                        )}
                      </svg>
                    ) : (
                      <div className="flex h-full items-center justify-center text-[9px] text-neutral-400">
                        Ziyaretçi eğilim verisi yok
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-2 min-h-28 rounded-lg bg-neutral-900 p-3 text-white sm:min-h-32 sm:rounded-xl sm:p-4 md:col-span-1">
                  <p className="text-[8px] uppercase tracking-wider text-neutral-500 sm:text-[9px]">
                    Geri dönen ziyaretçiler
                  </p>

                  <div className="mt-2 flex items-end gap-2 sm:mt-3">
                    <p className="text-3xl font-bold sm:text-4xl">
                      {overview.returningVisitors}%
                    </p>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, overview.returningVisitors),
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="mt-1.5 flex justify-between text-[7px] text-neutral-500 sm:text-[8px]">
                    <span>
                      Yeni {Math.max(0, 100 - overview.returningVisitors)}%
                    </span>

                    <span>Geri dönen {overview.returningVisitors}%</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------------------------------------------------------------- */}
            {/* AUDIENCE                                                         */}
            {/* ---------------------------------------------------------------- */}

            <article className="flex min-h-40 basis-[97%] shrink-0 snap-center flex-col overflow-hidden rounded-lg bg-linear-to-br from-white/95 via-sky-50/80 to-cyan-50/60 p-3 shadow-md sm:rounded-xl sm:p-5 overflow-y-auto">
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[9px]">
                    Kitle
                  </p>

                  <h4 className="mt-1 text-lg font-semibold tracking-tight sm:text-2xl">
                    Kimler ziyaret ediyor?
                  </h4>
                </div>

                <span className="shrink-0 text-[7px] uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                  30 gün
                </span>
              </div>

              <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                      Cihazlar
                    </p>

                    <span className="text-[8px] text-neutral-400">
                      {formatNumber(deviceTotal)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-center sm:mt-4">
                    <div
                      className="relative flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32"
                      style={{
                        background: `conic-gradient(
                            #2563EB 0deg ${deviceDegrees.desktop}deg,
                            #0E7490 ${deviceDegrees.desktop}deg ${deviceDegrees.mobile}deg,
                            #D97706 ${deviceDegrees.mobile}deg 360deg
                          )`,
                      }}
                    >
                      <div className="flex h-18 w-18 flex-col items-center justify-center rounded-full bg-sky-50 sm:h-20 sm:w-20">
                        <span className="text-lg font-bold text-blue-600 sm:text-xl">
                          {desktopPercentage}%
                        </span>

                        <span className="text-[7px] uppercase tracking-wider text-blue-600 sm:text-[8px]">
                          Masaüstü
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-4 sm:gap-2">
                    <div className="rounded-md bg-blue-50 p-1.5 text-center">
                      <p className="text-[9px] font-bold sm:text-[10px]">
                        {desktopPercentage}%
                      </p>

                      <p className="text-[7px] text-blue-600">Masaüstü</p>
                    </div>

                    <div className="rounded-md bg-cyan-100 p-1.5 text-center">
                      <p className="text-[9px] font-bold sm:text-[10px]">
                        {mobilePercentage}%
                      </p>

                      <p className="text-[7px] text-cyan-700">Mobil</p>
                    </div>

                    <div className="rounded-md bg-amber-100 p-1.5 text-center">
                      <p className="text-[9px] font-bold sm:text-[10px]">
                        {tabletPercentage}%
                      </p>

                      <p className="text-[7px] text-amber-700">Tablet</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                    Bölgeler
                  </p>

                  <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                    {audience.countries.length ? (
                      audience.countries
                        .slice(0, 5)
                        .map(({ name, percentage }) => (
                          <div key={name}>
                            <div className="mb-1 flex justify-between text-[8px] sm:text-[9px]">
                              <span>{name}</span>

                              <span className="font-semibold">
                                {percentage}%
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
                              <div
                                className="h-full rounded-full bg-neutral-800 transition-all duration-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(0, percentage),
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-[9px] text-neutral-400">
                        Bölge verisi yok
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                    Teknoloji
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
                    <div className="rounded-lg bg-neutral-100 p-2.5 sm:p-3">
                      <p className="text-[7px] uppercase tracking-wider text-neutral-400">
                        Tarayıcı
                      </p>

                      <p className="mt-1 text-xs font-bold sm:text-sm">
                        {audience.technology.browser.name}
                      </p>

                      <p className="text-[8px] text-neutral-500">
                        {audience.technology.browser.percentage}%
                      </p>
                    </div>

                    <div className="rounded-lg bg-neutral-100 p-2.5 sm:p-3">
                      <p className="text-[7px] uppercase tracking-wider text-neutral-400">
                        İS
                      </p>

                      <p className="mt-1 text-xs font-bold sm:text-sm">
                        {audience.technology.os.name}
                      </p>

                      <p className="text-[8px] text-neutral-500">
                        {audience.technology.os.percentage}%
                      </p>
                    </div>

                    <div className="rounded-lg bg-neutral-100 p-2.5 sm:p-3">
                      <p className="text-[7px] uppercase tracking-wider text-neutral-400">
                        Çözünürlük
                      </p>

                      <p className="mt-1 text-xs font-bold sm:text-sm">
                        {audience.technology.resolution.name}
                      </p>

                      <p className="text-[8px] text-neutral-500">
                        {audience.technology.resolution.percentage}%
                      </p>
                    </div>

                    <div className="rounded-lg bg-neutral-100 p-2.5 sm:p-3">
                      <p className="text-[7px] uppercase tracking-wider text-neutral-400">
                        Dil
                      </p>

                      <p className="mt-1 text-xs font-bold sm:text-sm">
                        {audience.technology.language.name}
                      </p>

                      <p className="text-[8px] text-neutral-500">
                        {audience.technology.language.percentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------------------------------------------------------------- */}
            {/* ACQUISITION                                                      */}
            {/* ---------------------------------------------------------------- */}

            <article className="flex min-h-40 basis-[97%] shrink-0 snap-center flex-col overflow-hidden rounded-lg bg-linear-to-br from-white/95 via-sky-50/80 to-cyan-50/60 p-3 shadow-md sm:rounded-xl sm:p-5 overflow-y-auto">
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[9px]">
                    Kazanım
                  </p>

                  <h4 className="mt-1 text-lg font-semibold tracking-tight sm:text-2xl">
                    Trafik kaynakları
                  </h4>
                </div>

                <span className="shrink-0 rounded-full bg-neutral-200 px-2 py-1 text-[7px] text-neutral-600 sm:px-3 sm:text-[9px]">
                  {formatNumber(overview.visitors)} ziyaretçi
                </span>
              </div>

              <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                      Kaynaklar
                    </p>

                    <span className="text-[8px] text-neutral-400">
                      Paylaşım
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                    {acquisition.sources.length ? (
                      acquisition.sources
                        .slice(0, 5)
                        .map(({ name, percentage }) => (
                          <div key={name}>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-[10px] font-medium sm:text-xs">
                                {name}
                              </span>

                              <span className="text-[8px] font-semibold text-neutral-500 sm:text-[10px]">
                                {percentage}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                              <div
                                className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(0, percentage),
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-[9px] text-neutral-400">
                        Trafik kaynağı verisi yok
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                    <p className="text-[8px] uppercase tracking-wider text-neutral-400">
                      Yeni kullanıcılar
                    </p>

                    <p className="mt-1 text-2xl font-bold sm:text-3xl">
                      {formatNumber(acquisition.newUsers)}
                    </p>

                    <div className="mt-3 flex h-10 items-end gap-1 sm:h-12">
                      {acquisition.newUsersTrend.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t bg-neutral-800/80 transition-all duration-500"
                          style={{
                            height: `${Math.max(
                              2,
                              (value / newUsersMax) * 100,
                            )}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                    <p className="text-[8px] uppercase tracking-wider text-neutral-400">
                      Etkileşim
                    </p>

                    <p className="mt-1 text-2xl font-bold sm:text-3xl">
                      {acquisition.engagementRate.toFixed(1)}%
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
                      <div
                        className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, acquisition.engagementRate),
                          )}%`,
                        }}
                      />
                    </div>

                    <p
                      className={`mt-2 text-[8px] ${getChangeClass(
                        acquisition.engagementChange,
                      )}`}
                    >
                      {formatChange(acquisition.engagementChange)} önceki döneme
                      göre
                    </p>
                  </div>

                  <div className="col-span-2 rounded-lg bg-neutral-900 p-3 text-white sm:rounded-xl sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[7px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[9px]">
                          En iyi yönlendirme
                        </p>

                        <p className="mt-1 truncate text-xs font-medium sm:text-sm">
                          {acquisition.bestReferral.name}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-lg font-bold sm:text-2xl">
                          {formatDuration(
                            acquisition.bestReferral.avgSessionSeconds,
                          )}
                        </p>

                        <p className="text-[7px] uppercase tracking-wider text-neutral-500">
                          ort. oturum
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------------------------------------------------------------- */}
            {/* CONTENT                                                          */}
            {/* ---------------------------------------------------------------- */}

            <article className="flex min-h-40 basis-[97%] shrink-0 snap-center flex-col overflow-hidden rounded-lg bg-linear-to-br from-white/95 via-sky-50/80 to-cyan-50/60 p-3 shadow-md sm:rounded-xl sm:p-5 overflow-y-auto">
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[9px]">
                    İçerik
                  </p>

                  <h4 className="mt-1 text-lg font-semibold tracking-tight sm:text-2xl">
                    Ziyaretçiler hangi içerikleri inceliyor?
                  </h4>
                </div>

                <span className="shrink-0 text-[7px] uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                  Performans
                </span>
              </div>

              <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-wider text-neutral-400 sm:text-[9px]">
                      En çok izlenenler
                    </p>

                    <span className="text-[8px] text-neutral-400">
                      Görüntüleme
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                    {content.mostViewed.length ? (
                      content.mostViewed
                        .slice(0, 5)
                        .map(({ name, views }, index) => (
                          <div key={name} className="flex items-center gap-2">
                            <span className="w-3 text-[8px] font-bold text-neutral-400 sm:w-4 sm:text-[9px]">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="w-12 truncate text-[9px] font-medium sm:w-16 sm:text-xs">
                              {name}
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                                <div
                                  className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      (views / mostViewedMax) * 100,
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <span className="w-7 text-right text-[8px] font-semibold sm:w-10 sm:text-[10px]">
                              {formatNumber(views)}
                            </span>
                          </div>
                        ))
                    ) : (
                      <p className="text-[9px] text-neutral-400">
                        İçerik verisi yok
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                    <p className="text-[8px] uppercase tracking-wider text-neutral-400">
                      Sayfa / oturum
                    </p>

                    <p className="mt-1 text-2xl font-bold sm:text-3xl">
                      {content.pagesPerSession.toFixed(1)}
                    </p>

                    <div className="mt-3 flex h-10 items-end gap-1 sm:h-12">
                      {content.pagesTrend.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t bg-neutral-700 transition-all duration-500"
                          style={{
                            height: `${Math.max(2, (value / pagesMax) * 100)}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-neutral-200/80 bg-white/70 p-3 sm:rounded-xl sm:p-4">
                    <p className="text-[8px] uppercase tracking-wider text-neutral-400">
                      Hemen çıkma oranı
                    </p>

                    <p className="mt-1 text-2xl font-bold sm:text-3xl">
                      {content.bounceRate.toFixed(1)}%
                    </p>

                    <div className="mt-3 flex h-10 items-end gap-1 sm:h-12">
                      {content.bounceTrend.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t bg-neutral-800/70 transition-all duration-500"
                          style={{
                            height: `${Math.max(
                              2,
                              (value / bounceMax) * 100,
                            )}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 rounded-lg bg-neutral-900 p-3 text-white sm:rounded-xl sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[7px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[9px]">
                          En iyi proje
                        </p>

                        <p className="mt-1 truncate text-xs font-semibold sm:text-lg">
                          {content.topProject.name}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-xl font-bold sm:text-2xl">
                          {content.topProject.percentage}%
                        </p>

                        <p className="text-[7px] uppercase tracking-wider text-neutral-500">
                          proje görüntülemeleri
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <footer className="flex shrink-0 items-center justify-center gap-4 pb-1">
          <button
            type="button"
            aria-label="Previous data point"
            disabled={activeDataPoint === 0}
            onClick={goToPreviousDataPoint}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Data point slides"
          >
            {Array.from({ length: dataPointCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to data point ${index + 1}`}
                aria-current={activeDataPoint === index ? "true" : undefined}
                onClick={() => goToDataPoint(index)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50 ${
                  activeDataPoint === index
                    ? "w-6 bg-neutral-800"
                    : "w-2.5 bg-neutral-400/60 hover:bg-neutral-600"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next data point"
            disabled={activeDataPoint === dataPointCount - 1}
            onClick={goToNextDataPoint}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </footer>
      </div>
    </SectionTemplate>
  );
};

export default DataSection;
