import { TFunction } from 'i18next';

import spacing from '../../../assets/themes/mainTheme/spacing';
import Colors from '../../../assets/themes/mainTheme/palette';
import { bodySystems } from '../../../constants/bodySystems';

const bodySystemsCount = bodySystems.length;

export const data = ({
  t,
}: {
  t: TFunction<'translation', 'diagnosticMatrix.diagnosticTable'>;
}) => [
  {
    index: 'INT',
    etiology: t('rows.geneticDevelopmental'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((item, index) => (index === item.index ? '1' : '')),
  },
  {
    index: 'INT',
    etiology: t('rows.anatomicStructural'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((_, index) => (index === 0 ? '12' : '')),
  },
  {
    index: 'INT',
    etiology: t('rows.degenerativeAging'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((_, index) => (index === 7 ? '2' : '')),
  },
  {
    index: 'INT',
    etiology: t('rows.neoplastic'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((item, index) => (index === item.index ? '1' : '')),
  },
  {
    index: 'INT',
    etiology: t('rows.regulatoryPhysiologic'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((_, index) => (index === 5 ? '1' : '')),
  },
  {
    index: 'INT/ EXT',
    etiology: t('rows.infectiousImmune'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((_, index) => (index === 12 ? '9' : '')),
  },
  {
    index: 'EXT',
    etiology: t('rows.toxicChemical'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((item, index) => (index === item.index ? '1' : '')),
  },
  {
    index: 'EXT',
    etiology: t('rows.traumaPhysical'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((_, index) => (index === 8 ? '21' : '')),
  },
  {
    index: 'EXT',
    etiology: t('rows.environmentalSupply'),
    bodySystems: Array(bodySystemsCount).fill(''),
  },
  {
    index: 'OTHER',
    etiology: t('rows.idiopathic'),
    bodySystems: Array(bodySystemsCount)
      .fill('')
      .map((item, index) => (index === item.index ? '1' : '')),
  },
];

export const getDiamondStyle = (value: number) => {
  let size = 12;
  let fontSize = 10;
  let borderRadius = spacing.spacing.spacing1;
  let backgroundColor = Colors.palette.surface.veryLowRisk;
  let marginTop = 0;
  let marginLeft = 0;

  if (value === 1) {
    size = 12;
    fontSize = 10;
    borderRadius = spacing.spacing.spacing1;
    backgroundColor = Colors.palette.surface.veryLowRisk;
    marginTop = -1;
    marginLeft = -1;
  } else if (value >= 2 && value <= 4) {
    size = 14;
    fontSize = 10;
    borderRadius = spacing.spacing.spacing1;
    backgroundColor = Colors.palette.surface.lowRisk;
  } else if (value >= 5 && value <= 9) {
    size = 20;
    fontSize = 12;
    borderRadius = spacing.spacing.spacing2;
    backgroundColor = Colors.palette.surface.mediumRisk;
  } else if (value >= 10 && value <= 20) {
    size = 24;
    fontSize = 12;
    borderRadius = spacing.spacing.spacing2;
    backgroundColor = Colors.palette.surface.highRisk;
  } else if (value > 20) {
    size = 28;
    fontSize = 12;
    borderRadius = spacing.spacing.spacing3;
    backgroundColor = Colors.palette.surface.veryHighRisk;
  }

  return {
    shape: {
      width: size,
      height: size,
      backgroundColor,
      borderRadius,
    },
    text: {
      fontSize: fontSize,
      marginTop,
      marginLeft,
    },
  };
};
