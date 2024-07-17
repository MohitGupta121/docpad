import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { RootStackParamList } from 'src/navigation.tsx';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import Card from '../../components/card/card.tsx';
import { navigate, navigateBack } from '../../navigation/RootNavigation.tsx';
import Layout from '../../components/layout/layout.tsx';
import Header from '../../components/navigationHeaderWithTitle/header.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  body: {
    ...theme.typography.bodyL,
    marginBottom: theme.spacing.spacing6,
  },
  cardContainer: {
    marginBottom: theme.spacing.spacing9,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
  },
  cardTextBold: {
    ...theme.typography.titleXS,
    marginBottom: theme.spacing.spacing2,
    fontWeight: 600,
    marginRight: theme.spacing.spacing4,
  },
  cardText: {
    ...theme.typography.bodyM,
  },
  item: {
    ...theme.typography.linkXS,
    textDecorationLine: 'underline',
    marginRight: theme.spacing.spacing4,
  },
}));

type IDetailsOverview = NativeStackScreenProps<
  RootStackParamList,
  'DetailsOverview'
>;

export default function DetailsOverview({ route }: IDetailsOverview) {
  const { title } = route.params || undefined;

  const styles = useStyles();
  const { t } = useTranslation();

  const renderList = (list: string[]) => {
    return (
      <>
        <View style={styles.row}>
          {list.map((entry: string, index: number) => {
            return (
              <Text
                style={styles.item}
                key={entry}
                onPress={() => navigate('DetailsScreen', { title: entry })}
              >
                {entry}
                {index + 1 < list.length && ', '}
              </Text>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <Layout withoutSidebar>
      <Header title={title} onBackNavigation={() => navigateBack()} />
      <View>
        <Text style={styles.body}>
          {t('patientDashboard.detailsOverview.body')}
        </Text>
        <View style={styles.cardContainer}>
          <Card>
            <View style={styles.row}>
              <Text style={styles.cardTextBold}>
                {`${t('general.name')}, ${t('general.gender')}`}:
              </Text>
              <Text style={styles.cardText}>Geisen, Ana (W)</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardTextBold}>{t('general.age')}:</Text>
              <Text style={styles.cardText}>Age</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardTextBold}>
                {t('general.careSetting')}:
              </Text>
              <Text style={styles.cardText}>In-patient</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardTextBold}>
                {t('general.triggerForVisit')}:
              </Text>
              <Text style={styles.cardText}>Trigger for visit name</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardTextBold}>
                {t('general.episodeDates')}:
              </Text>
              <Text style={styles.cardText}>DD-MM-YYYY - DD-MM-YYYY</Text>
            </View>
          </Card>
        </View>
        {renderList([
          `${title} 1`,
          `${title} 2`,
          `${title} 3`,
          `${title} 4`,
          `${title} 5`,
          `${title} 6`,
        ])}
      </View>
    </Layout>
  );
}
