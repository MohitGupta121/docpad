import { makeStyles } from '../../helpers/hooks/useTheme';
import { ITheme } from '../../assets/themes/mainTheme';

export const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.typography.titleM,
    textAlign: 'center',
    marginBottom: theme.spacing.spacing7,
  },
  titleMiddle: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  placeholder: {
    width: theme.spacing.spacing7,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: theme.palette.border.brandSecondary,
    position: 'absolute',
    height: 1,
    width: '105%',
    left: -theme.spacing.spacing7,
    bottom: 0,
  },
  infoText: {
    ...theme.typography.bodyL,
    color: theme.palette.text.primary,
    marginTop: theme.spacing.spacing8,
  },
  selectContentWrapper: {
    ...theme.globalStyles.elevation,
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.palette.surface.primary,
    marginTop: theme.spacing.spacing8,
    minHeight: 150,
  },
  tabWrapper: {
    flexDirection: 'row',
    height: 46,
  },
  tabButton: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.border.grayInputDefault,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.text.brandPrimary,
  },
  buttonText: {
    ...theme.typography.titleXXS,
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  activeButtonText: {
    color: theme.palette.text.brandPrimary,
  },
  dropdownWrapper: {
    paddingTop: theme.spacing.spacing4,
    paddingBottom: theme.spacing.spacing6,
    paddingHorizontal: theme.spacing.spacing6,
  },
  dropdown: {
    marginBottom: theme.spacing.spacing4,
    zIndex: 1,
  },
  menuContent: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    padding: theme.spacing.spacing5,
    justifyContent: 'center',
  },
  dropdownLabel: {
    ...theme.typography.bodySMediumWeight,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  menuIcon: {
    marginLeft: 'auto',
  },
  placeholderText: {
    ...theme.typography.bodyM,
    color: theme.palette.text.inputPlaceholder,
  },
  textInputCounter: {
    ...theme.typography.bodySMediumWeight,
    marginTop: theme.spacing.spacing4,
    marginLeft: 'auto',
  },
  buttonContainer: {
    marginTop: 'auto',
    backgroundColor: theme.palette.surface.primary,
    paddingHorizontal: theme.spacing.spacing7,
    paddingTop: theme.spacing.spacing6,
    paddingBottom: theme.spacing.spacing9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.spacing9,
  },
  saveIcon: {
    marginRight: theme.spacing.spacing2,
    color: theme.palette.icon.invert,
  },
  disabledIcon: {
    color: theme.palette.icon.disabled,
  },
  saveButtonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.disabled,
  },
}));
