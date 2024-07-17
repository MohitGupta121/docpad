import { ITheme } from '../../../assets/themes/mainTheme';
import { makeStyles } from '../../../helpers/hooks/useTheme';

export const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.spacing5,
  },
  listContainer: {
    width: 180,
    backgroundColor: theme.palette.surface.secondary,
    borderRadius: 8,
  },
  listTitle: {
    ...theme.typography.titleXS,
    padding: theme.spacing.spacing5,
  },
  filterWrapper: {
    paddingTop: 0,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
    gap: theme.spacing.spacing4,
  },
  filterTitle: {
    ...theme.typography.titleXXS,
    color: theme.palette.text.tertiary,
  },
  filterTag: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexShrink: 1,
    height: 33,
    padding: theme.spacing.spacing4,
  },
  filterText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.brandPrimary,
    flexShrink: 1,
  },
  diagnosisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.spacing5,
    paddingEnd: theme.spacing.spacing9,
    gap: theme.spacing.spacing4,
  },
  selectedDiagnosisItem: {
    backgroundColor: theme.palette.surface.tertiary,
  },
  diagnosisBullet: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  diagnosisName: {
    ...theme.typography.bodyM,
  },

  detailsContainer: {
    width: 180,
    backgroundColor: theme.palette.surface.secondary,
    borderRadius: 8,
    gap: theme.spacing.spacing8,
    paddingHorizontal: theme.spacing.spacing5,
  },
  detailsTitle: {
    ...theme.typography.titleXS,
    paddingVertical: theme.spacing.spacing5,
  },
  detailsWrapper: {
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing5,
    gap: theme.spacing.spacing4,
    backgroundColor: theme.palette.surface.primary,
  },
  detailsDiagnosisText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing4,
  },
  selectedDetailsContainer: {
    padding: 0,
    gap: 0,
  },
  selectedDetailsWrapper: {
    gap: theme.spacing.spacing5,
  },
  detailsPlaceholder: {
    ...theme.typography.bodyM,
    color: theme.palette.text.tertiary,
    textAlign: 'left',
  },
  prevalenceWrapper: {
    gap: theme.spacing.spacing3,
  },
  moreDetailsWrapper: {
    gap: theme.spacing.spacing3,
  },
  rotateDeviceWrapper: {
    flexDirection: 'row',
    gap: theme.spacing.spacing4,
    alignItems: 'center',
    paddingEnd: theme.spacing.spacing5,
    paddingStart: theme.spacing.spacing2,
  },
  rotateIcon: {
    color: theme.palette.icon.brandPrimary,
  },
  rotateText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.brandPrimary,
  },
  roundtreeContainer: {
    justifyContent: 'center',
  },
  detailTreeTitle: {
    ...theme.typography.titleXS,
  },
  detailTreeDescription: {
    ...theme.typography.bodyM,
  },
  bulletTextIcon: {
    paddingStart: theme.spacing.spacing2,
  },
  bulletListWrapper: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
    paddingLeft: theme.spacing.spacing2,
  },
  detailScrollView: {
    height: '90%',
  },
}));
