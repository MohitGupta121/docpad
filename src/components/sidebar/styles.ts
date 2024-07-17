import { makeStyles } from '../../helpers/hooks/useTheme';
import { ITheme } from '../../assets/themes/mainTheme';

export const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    ...theme.globalStyles.elevation,
    height: '100%',
    position: 'absolute',
    left: 0,
    overflow: 'hidden',
    flexDirection: 'column',
    marginTop: theme.spacing.spacing7,
    paddingBottom: theme.spacing.spacing11,
    paddingTop: theme.spacing.spacing5,
    paddingLeft: theme.spacing.spacing7,
    borderTopRightRadius: theme.spacing.spacing8,
    borderBottomRightRadius: theme.spacing.spacing8,
    zIndex: 10,
  },
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonWrapper: {
    height: theme.spacing.spacing11,
    width: theme.spacing.spacing11,
    backgroundColor: theme.palette.button.secondaryDefault,
    borderTopLeftRadius: theme.spacing.spacing4,
    borderBottomLeftRadius: theme.spacing.spacing4,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing7,
  },
  brandPrimaryColor: {
    color: theme.palette.icon.brandPrimary,
  },
  rotatedArrow: {
    transform: [{ rotate: '180deg' }],
  },
  optionsWrapper: {
    marginTop: theme.spacing.spacing7,
    flexDirection: 'column',
  },
  option: {
    width: '100%',
    marginBottom: theme.spacing.spacing13,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: theme.spacing.spacing8,
  },
  optionText: {
    ...theme.typography.titleS,
    marginLeft: theme.spacing.spacing4,
  },
  notActiveOption: {
    color: theme.palette.text.primary,
  },
  doctorDataWrapper: {
    maxWidth: 216,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: theme.spacing.spacing4,
    backgroundColor: theme.palette.surface.secondary,
    padding: theme.spacing.spacing4,
  },
  doctorInitials: {
    height: theme.spacing.spacing8,
    width: theme.spacing.spacing8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.surface.doctorInitialsBackground,
    borderRadius: theme.spacing.spacing5,
  },
  doctorInitialsText: {
    ...theme.typography.titleXXS,
    color: theme.palette.text.invert,
  },
  doctorInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.spacing4,
  },
  doctorInfoHeader: {
    ...theme.typography.titleXS,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing4,
  },
  doctorAdditionalInfo: {
    ...theme.typography.bodyM,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.spacing4,
  },
  changeDepartmentButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...theme.typography.titleXS,
    color: theme.palette.text.brandPrimary,
    marginRight: theme.spacing.spacing2,
  },
  spacer: {
    flex: 1,
  },
  modal: {
    ...theme.globalStyles.elevation,
    backgroundColor: theme.palette.surface.primary,
    borderRadius: theme.spacing.spacing6,
    padding: theme.spacing.spacing10,
    gap: theme.spacing.spacing8,
    flexDirection: 'column',
    width: 816,
    maxHeight: 218,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderText: {
    ...theme.typography.titleL,
    fontWeight: 600,
  },
  modalCloseIcon: {
    marginLeft: 'auto',
  },
  modalInfoText: {
    ...theme.typography.bodyL,
  },
  modalButtonWrapper: {
    flexDirection: 'row',
  },
  modalButtonText: {
    ...theme.typography.titleXS,
  },
  modalButtonIcon: {
    color: theme.palette.icon.invert,
    marginRight: theme.spacing.spacing2,
  },
  textInvert: {
    color: theme.palette.text.invert,
  },
  textPrimary: {
    color: theme.palette.text.brandPrimary,
  },
  cancelButton: {
    marginLeft: theme.spacing.spacing8,
  },
  iconPrimaryColor: {
    color: theme.palette.icon.primary,
  },
}));
