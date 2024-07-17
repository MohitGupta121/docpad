import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { navigate } from '../../navigation/RootNavigation.tsx';
import { Button } from '../../components/button';
import Card from '../../components/card/card.tsx';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import ChevronRight from '../../assets/icons/chevronRight.svg';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    marginLeft: theme.spacing.spacing4,
    flex: 1,
  },
  title: {
    ...theme.typography.titleXS,
    fontWeight: 600,
    marginBottom: theme.spacing.spacing4,
  },
  list: {
    flexDirection: 'row',
  },
  cardText: {
    ...theme.typography.bodyM,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing1,
  },
  link: {
    ...theme.typography.linkXS,
    textDecorationLine: 'underline',
    marginRight: theme.spacing.spacing2,
  },
  icon: {
    color: theme.palette.text.brandPrimary,
  },
  buttonContainer: { alignSelf: 'flex-start' },
}));

const CardsColumn = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const renderDetailButton = (detailsTitle: string) => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigate('DetailsOverview', { title: detailsTitle })}
          backgroundStyle={'linkButton'}
          icon={<ChevronRight style={styles.icon} />}
          iconPosition={'right'}
        >
          {t('general.seeMoreButton')}
        </Button>
      </View>
    );
  };

  const renderList = (
    list: string[],
    entryNumber: number,
    detailsTitle: string,
  ) => {
    const maxEntryNumber = Math.min(list.length, entryNumber);
    return (
      <>
        <View style={styles.list}>
          {list.slice(0, maxEntryNumber).map((entry: string, index: number) => {
            return (
              <Text style={[styles.cardText, styles.link]} key={entry}>
                {entry}
                {index + 1 < maxEntryNumber && ', '}
              </Text>
            );
          })}
        </View>
        {maxEntryNumber < list.length && renderDetailButton(detailsTitle)}
      </>
    );
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>
        {t('patientDashboard.cardsColumn.title')}
      </Text>
      <ScrollView>
        <Card title={t('patientDashboard.cardsColumn.institutionCard.title')}>
          <Text style={styles.cardText}>
            Robert-Bosch-Krankenhaus, Stuttgart
          </Text>
          <Text style={styles.cardText}>Team A</Text>
        </Card>
        <Card
          title={t('patientDashboard.cardsColumn.triggerForVisitCard.title')}
        >
          <Text style={[styles.cardText, styles.link]}>
            Trigger for visit name
          </Text>
        </Card>
        <Card title={t('patientDashboard.cardsColumn.diagnosesCard.title')}>
          {renderList(
            ['Diagnose 1', 'Diagnose 2', 'Diagnose 3', 'Diagnose 4'],
            3,
            'Diagnoses',
          )}
        </Card>
        <Card title={t('patientDashboard.cardsColumn.risksCard.title')}>
          {renderList(
            [
              'Risk Factor 1',
              'Risk Factor 2',
              'Risk Factor 3',
              'Risk Factor 4',
            ],
            2,
            'Risk Factors',
          )}
        </Card>
        <Card title={t('patientDashboard.cardsColumn.proceduresCard.title')}>
          {renderList(['Procedure 1', 'Operation 1'], 3, 'Procedures')}
        </Card>
      </ScrollView>
    </View>
  );
};

export default CardsColumn;
