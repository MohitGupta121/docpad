import { useTranslation } from 'react-i18next';

import ThemeMain from '../assets/themes/mainTheme/main';

const MainTheme = ThemeMain();

export type BodySystem = {
  key: string;
  label: string;
  chartLineColor: string;
};

export const bodySystems = [
  {
    key: 'MET',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.met,
  },
  {
    key: 'PSY',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.psy,
  },
  {
    key: 'NEU',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.neu,
  },
  {
    key: 'EYE',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.eye,
  },
  {
    key: 'ENT',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.ent,
  },
  {
    key: 'PUL',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.pul,
  },
  {
    key: 'CV',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.cv,
  },
  {
    key: 'GI',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.gi,
  },
  {
    key: 'GU',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.gu,
  },
  {
    key: 'MUS',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.mus,
  },
  {
    key: 'DERM',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.derm,
  },
  {
    key: 'HEME',
    chartLineColor: MainTheme.palette.bodySystemChartIndicators.heme,
  },
];

export const useBodySystems = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'roundtree',
  });

  return bodySystems.map((record) => {
    return {
      key: record.key,
      label: t(record.key),
      chartLineColor: record.chartLineColor,
    };
  });
};
