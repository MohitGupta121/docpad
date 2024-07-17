import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import InterpolatedTimeline from '../../components/interpolatedTimeline/interpolatedTimeline';
import Roundtree from '../../components/roundtree/roundtree';
import Card from '../../components/card/card';
import CardsColumn from './cardsColumn';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import Layout from '../../components/layout/layout';
import GlobalTimeline from '../../components/globalTimeline/globalTimeline';
import PatientDashboardHeader from './patientDashboardHeader';
import { bodySystems } from '../../constants/bodySystems';
import { useGetPatient } from '../../docpad-api/queries/patients';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: theme.palette.surface.appBackground,
    paddingHorizontal: theme.spacing.spacing7,
    paddingBottom: theme.spacing.spacing7,
  },
  container: {
    flexDirection: 'row',
    marginTop: theme.spacing.spacing4,
  },
  leftContainer: {
    height: 365,
    width: 740,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContainer: {
    width: 314,
    marginBottom: theme.spacing.spacing6,
  },
  roundtreeContainer: {
    justifyContent: 'center',
    padding: 35,
    bottom: theme.spacing.spacing4,
  },
  hintContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    width: 231,
  },
  hintText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.tertiary,
  },
}));

export type BodySystemKey = (typeof bodySystems)[number]['key'] | '';

export default function PatientDashboard() {
  const styles = useStyles();
  const { t } = useTranslation();
  const episodeSelected = true;
  const [roundtreeFilter, setRoundtreeFilter] = useState<BodySystemKey>('');
  //TODO Change when we have proper patients
  const { data: patient } = useGetPatient(40);

  return (
    <Layout isBackgroundWhite={true} isWithoutPadding={true}>
      <PatientDashboardHeader
        patient={patient}
        onNewEpisode={() => {}}
        onEditPatient={() => {}}
        onDiagnosePress={() => {}}
        onMedicationPress={() => {}}
        onLabValuesPress={() => {}}
        onDocumentsPress={() => {}}
        areButtonsDisabled={true}
      />
      <View style={styles.root}>
        <GlobalTimeline />
        <View style={styles.container}>
          <Card title={t('patientDashboard.bodySystemsCard.title')}>
            <View style={styles.leftContainer}>
              <View>
                <InterpolatedTimeline
                  roundtreeFilter={roundtreeFilter}
                  selectedEpisode={1}
                />
              </View>
              <View style={styles.roundtreeContainer}>
                <Roundtree
                  roundtreeFilter={roundtreeFilter}
                  onSelectNode={setRoundtreeFilter}
                />
              </View>
            </View>
          </Card>

          <View
            style={[
              styles.rightContainer,
              !episodeSelected && styles.hintContainer,
            ]}
          >
            {episodeSelected ? (
              <CardsColumn />
            ) : (
              <View>
                <View style={styles.hint}>
                  <Card>
                    <Text style={styles.hintText}>
                      {t('patientDashboard.cardsColumn.selectEpisodeHint')}
                    </Text>
                  </Card>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Layout>
  );
}
