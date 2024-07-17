import React, { useMemo, useState } from 'react';
import { View, Text, ViewStyle, LayoutChangeEvent } from 'react-native';
import Modal from 'react-native-modal';
import { makeStyles } from '../../../helpers/hooks/useTheme';
import { ITheme } from 'src/assets/themes/mainTheme';
import { getDiamondStyle } from '../diagnosticTable/constants';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    maxWidth: 651,
    marginLeft: '16%',
    padding: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing6,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: 'white',
    gap: theme.spacing.spacing5,
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    elevation: 10,
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  title: {
    ...theme.typography.titleXS,
  },
  text: {
    ...theme.typography.bodyM,
  },
  bulletListWrapper: {
    paddingEnd: theme.spacing.spacing4,
    flexDirection: 'row',
    gap: 4,
  },
  bulletTextIcon: {
    fontSize: 16,
    lineHeight: 16,
  },
  etiologyContainer: {
    paddingStart: theme.spacing.spacing5,
    gap: theme.spacing.spacing4,
  },
  etiologyWrapper: {
    flexDirection: 'row',
    gap: theme.spacing.spacing3,
    alignItems: 'center',
  },
  indexText: {
    ...theme.typography.bodyXS,
  },
  indexWrapper: {
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    padding: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskContainer: {
    flexDirection: 'row',
    paddingStart: theme.spacing.spacing5,
    gap: theme.spacing.spacing6,
  },
  riskIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  riskWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing3,
  },
  veryLowRiskIndicator: {
    backgroundColor: theme.palette.surface.veryLowRisk,
  },
  lowRiskIndicator: {
    backgroundColor: theme.palette.surface.lowRisk,
  },
  mediumRiskIndicator: {
    backgroundColor: theme.palette.surface.mediumRisk,
  },
  highRiskIndicator: {
    backgroundColor: theme.palette.surface.highRisk,
  },
  veryHighRiskIndicator: {
    backgroundColor: theme.palette.surface.veryHighRisk,
  },
  diamondWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  diamondText: {
    ...theme.typography.bodyS,
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
  },
  riskFactorsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.spacing6,
    left: 12,
  },
  riskFactorsWrapper: {
    flexDirection: 'column',
    gap: theme.spacing.spacing7,
  },
  riskFactorsDiamonds: {
    alignItems: 'center',
  },
}));

interface IDiagnosticDescriptionDialog {
  isOpen: boolean;
  onClose: () => void;
}

interface BulletTextProps {
  text: string;
}

const BulletText: React.FC<BulletTextProps> = ({ text }) => {
  const styles = useStyles();
  return (
    <View style={styles.bulletListWrapper}>
      <Text style={styles.bulletTextIcon}>{'\u2022'}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

interface EtiologyItemProps {
  index: string;
  description: string;
}

const EtiologyItem: React.FC<EtiologyItemProps> = ({ index, description }) => {
  const styles = useStyles();
  return (
    <View style={styles.etiologyWrapper}>
      <View style={styles.indexWrapper}>
        <Text style={styles.indexText}>{index}</Text>
      </View>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

interface RiskIndicatorProps {
  style: ViewStyle;
  label: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ style, label }) => {
  const styles = useStyles();
  return (
    <View style={styles.riskWrapper}>
      <View style={[styles.riskIndicator, style]} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

interface DiamondItemProps {
  number: number;
  columnStyle: ViewStyle;
}

const DiamondItem: React.FC<DiamondItemProps> = ({ number, columnStyle }) => {
  const styles = useStyles();
  const diamondStyle = getDiamondStyle(number);

  return (
    <View style={[styles.diamondWrapper, diamondStyle.shape, columnStyle]}>
      <Text style={[styles.diamondText, diamondStyle.text]}>{number}</Text>
    </View>
  );
};

const DiagnosticDescriptionDialog = ({
  isOpen,
  onClose,
}: IDiagnosticDescriptionDialog) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'diagnosticMatrix.dialog',
  });
  const styles = useStyles();
  const [containerHeight, setContainerHeight] = useState(0);
  const riskFactorsList = useMemo(() => {
    return [
      {
        style: styles.veryLowRiskIndicator,
        label: t('veryLowRisk'),
        range: t('diagnose1'),
        rangeStyle: { marginTop: -4 },
      },
      {
        style: styles.lowRiskIndicator,
        label: t('lowRisk'),
        range: t('diagnose2'),
        rangeStyle: { marginTop: -4 },
      },
      {
        style: styles.mediumRiskIndicator,
        label: t('mediumRisk'),
        range: t('diagnose3'),
        rangeStyle: { marginTop: 1 },
      },
      {
        style: styles.highRiskIndicator,
        label: t('highRisk'),
        range: t('diagnose4'),
        rangeStyle: { marginTop: 4 },
      },
      {
        style: styles.veryHighRiskIndicator,
        label: t('veryHighRisk'),
        range: t('diagnose5'),
        rangeStyle: { marginTop: 9 },
      },
    ];
  }, [styles, t]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const getMarginBottom = (height: number): string => {
    if (height > 700) {
      return '1%';
    }
    return '4%';
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      backdropColor="transparent"
    >
      <View
        style={[
          styles.container,
          { marginBottom: getMarginBottom(containerHeight) },
        ]}
        onLayout={handleLayout}
      >
        <Text style={styles.title}>{t('title')}</Text>
        {[
          t('point1'),
          t('point2'),
          t('point3'),
          t('point4'),
          t('point5'),
          t('point6'),
        ].map((text, index) => (
          <BulletText key={index} text={text} />
        ))}

        <View style={styles.etiologyContainer}>
          {[
            {
              index: 'INT',
              description: t('int'),
            },
            {
              index: 'EXT',
              description: t('ext'),
            },
            {
              index: 'INT/EXT',
              description: t('intExt'),
            },
            {
              index: 'OTHER',
              description: t('other'),
            },
          ].map((item, index) => (
            <EtiologyItem key={index} {...item} />
          ))}
        </View>

        <BulletText text={t('risks')} />

        <View style={styles.riskContainer}>
          {riskFactorsList.map((item, index) => (
            <RiskIndicator key={index} {...item} />
          ))}
        </View>

        <BulletText text={t('point7')} />

        <View style={styles.riskFactorsContainer}>
          {riskFactorsList.map((_, colIndex) => (
            <View
              key={colIndex}
              style={[styles.riskFactorsWrapper, styles.riskFactorsDiamonds]}
            >
              {[1, 4, 9, 20, 50].map((number, numIndex) => (
                <DiamondItem
                  key={`${colIndex}-${numIndex}`}
                  number={number}
                  columnStyle={riskFactorsList[colIndex].style}
                />
              ))}
            </View>
          ))}
          <View style={styles.riskFactorsWrapper}>
            {riskFactorsList.map(({ range, rangeStyle }, index) => (
              <Text key={index} style={[styles.text, rangeStyle]}>
                {range}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DiagnosticDescriptionDialog;
