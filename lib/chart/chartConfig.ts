import type { ChartSeries } from "@/types";
import { CHART_CONFIG } from "@/lib/constants";

export function createVisitorTrendsChartOptions(series: ChartSeries[]) {
  return {
    chart: {
      height: CHART_CONFIG.HEIGHT,
      zoomType: CHART_CONFIG.ZOOM_TYPE,
    },
    title: {
      text: "Museum Visitor Trends Over Time",
      align: "left",
    },
    subtitle: {
      text: 'Click and drag to zoom in. Click "Reset zoom" to zoom out. Click legend items to show/hide lines.',
      align: "left",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
      labels: {
        format: "{value:%Y-%m}",
      },
    },
    yAxis: {
      title: {
        text: "Number of Visitors",
      },
      type: "linear",
      minorTickInterval: 0.1,
      accessibility: {
        rangeDescription: "Range: 0 to max visitors",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 1,
      borderRadius: 8,
      shadow: true,
      useHTML: true,
      headerFormat:
        '<span style="font-size: 12px; font-weight: bold">{point.key:%B %Y}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.0f}</b> visitors<br/>',
      footerFormat: "",
    },
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        fontSize: "12px",
        cursor: "pointer",
      },
      itemHoverStyle: {
        color: "#000",
      },
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 3,
        },
        lineWidth: 2,
      },
      series: {
        animation: {
          duration: CHART_CONFIG.ANIMATION_DURATION,
        },
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
}
