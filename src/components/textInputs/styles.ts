import { makeStyles } from '../../helpers/hooks/useTheme';
import { ITheme } from '../../assets/themes/mainTheme';

export const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flexDirection: 'column',
  },
  label: {
    ...theme.typography.bodySMediumWeight,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing5,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  message: {
    paddingLeft: theme.spacing.spacing4,
  },
  successText: {
    color: theme.palette.text.positive,
  },
  errorText: {
    color: theme.palette.text.negative,
  },
  successBorder: {
    borderColor: theme.palette.border.positive,
  },
  errorBorder: {
    borderColor: theme.palette.border.negative,
  },
  inputContainer: {
    height: theme.spacing.spacing10,
    width: 260,
    backgroundColor: theme.palette.surface.primary,
    borderWidth: 1,
    borderRadius: theme.spacing.spacing2,
    borderColor: theme.palette.border.grayInputDefault,
  },
  ifEyeIcon: {
    flexDirection: 'row',
  },
  eyeIcon: {
    position: 'absolute',
    left: '90%',
    top: '20%',
  },
  fullWidthInputContainer: {
    width: '100%',
  },
  extendedHeight: {
    height: theme.spacing.spacing13,
  },
  disabledBackground: {
    backgroundColor: theme.palette.surface.disabled,
  },
  disabledBorder: {
    borderColor: theme.palette.border.grayControlsDefaultDisabled,
  },
  focusBorder: {
    borderColor: theme.palette.border.brandSecondary,
  },
  textInput: {
    ...theme.typography.bodyM,
    padding: theme.spacing.spacing2,
    width: '100%',
    height: '100%',
  },
  disabledText: {
    color: theme.palette.text.disabled,
  },
  icon: {
    position: 'absolute',
    left: '100%',
    top: '100%',
    color: theme.palette.icon.primary,
  },
  disabledIcon: {
    color: theme.palette.icon.disabled,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.spacing.spacing15,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing5,
    paddingEnd: theme.spacing.spacing7,
  },
  searchTextInput: {
    width: '85%',
    marginLeft: theme.spacing.spacing3,
  },
  searchIcon: {
    color: theme.palette.icon.primary,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
  errorMessageWrapper: {
    marginLeft: theme.spacing.spacing5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIconWrapper: {
    width: theme.spacing.spacing6,
    height: theme.spacing.spacing6,
    backgroundColor: theme.palette.surface.negative,
    borderRadius: theme.spacing.spacing4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    color: theme.palette.icon.invert,
  },
  fullWidth: {
    width: '100%',
  },
}));
