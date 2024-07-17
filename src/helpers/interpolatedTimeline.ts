export const getGradientStartColor = (theme: any, min: number, max: number) => {
  const colorMap = {
    0: {
      1: theme.palette.bodySystemChartSeverity.point1,
      2: theme.palette.bodySystemChartSeverity.point2_min0,
      3: theme.palette.bodySystemChartSeverity.point3_min0,
      4: theme.palette.bodySystemChartSeverity.point4_min0,
      5: theme.palette.bodySystemChartSeverity.point5,
    },
    1: {
      1: theme.palette.bodySystemChartSeverity.point1,
      2: theme.palette.bodySystemChartSeverity.point2_else,
      3: theme.palette.bodySystemChartSeverity.point3_else,
      4: theme.palette.bodySystemChartSeverity.point4_else,
      5: theme.palette.bodySystemChartSeverity.point5,
    },
    2: {
      2: theme.palette.bodySystemChartSeverity.point2_min0,
      3: theme.palette.bodySystemChartSeverity.point3_else,
      4: theme.palette.bodySystemChartSeverity.point4_else,
      5: theme.palette.bodySystemChartSeverity.point5,
    },
    3: {
      3: theme.palette.bodySystemChartSeverity.point3_min0,
      4: theme.palette.bodySystemChartSeverity.point4_else,
      5: theme.palette.bodySystemChartSeverity.point5,
    },
    4: {
      4: theme.palette.bodySystemChartSeverity.point4_min0,
      5: theme.palette.bodySystemChartSeverity.point5,
    },
    5: {
      5: theme.palette.bodySystemChartSeverity.point5,
    },
  };

  return colorMap[min]?.[max];
};

export const getGradientEndColor = (theme: any, min: number, max: number) => {
  const colorMap = {
    0: {
      1: theme.palette.bodySystemChartSeverity.point1,
      2: theme.palette.bodySystemChartSeverity.point1,
      3: theme.palette.bodySystemChartSeverity.point1,
      4: theme.palette.bodySystemChartSeverity.point1,
      5: theme.palette.bodySystemChartSeverity.point1,
    },
    1: {
      1: theme.palette.bodySystemChartSeverity.point1,
      2: theme.palette.bodySystemChartSeverity.point1,
      3: theme.palette.bodySystemChartSeverity.point1,
      4: theme.palette.bodySystemChartSeverity.point1,
      5: theme.palette.bodySystemChartSeverity.point1,
    },
    2: {
      2: theme.palette.bodySystemChartSeverity.point1,
      3: theme.palette.bodySystemChartSeverity.point2_else,
      4: theme.palette.bodySystemChartSeverity.point2_else,
      5: theme.palette.bodySystemChartSeverity.point2_else,
    },
    3: {
      3: theme.palette.bodySystemChartSeverity.point1,
      4: theme.palette.bodySystemChartSeverity.point3_else,
      5: theme.palette.bodySystemChartSeverity.point3_else,
    },
    4: {
      4: theme.palette.bodySystemChartSeverity.point1,
      5: theme.palette.bodySystemChartSeverity.point4_else,
    },
    5: {
      5: theme.palette.bodySystemChartSeverity.point1,
    },
  };

  return colorMap[min]?.[max];
};
