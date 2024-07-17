import { ITheme } from '../../../assets/themes/mainTheme';
import { makeStyles } from '../../../helpers/hooks/useTheme';

export const useStyles = makeStyles((theme: ITheme) => ({
  header: {
    flexDirection: 'row',
  },
  headerCell: {
    padding: theme.spacing.spacing3,
    borderLeftWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
  },
  headerText: {
    ...theme.typography.bodyS,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  headerTextBottomLeft: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 70,
  },
  headerTextTopRight: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 70,
  },
  diagonal: {
    width: 200,
    height: 1,
    backgroundColor: theme.palette.border.grayInputDefault,
    transform: [{ rotate: '16deg' }],
    transformOrigin: 'bottom right',
    top: 21,
    left: -55,
  },
  diamondText: {
    ...theme.typography.bodyS,
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 42,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastCellHeaderBoarder: {
    borderRightWidth: 1,
  },
  bottomCells: {
    borderBottomWidth: 1,
  },
  firstColumn: {
    borderLeftWidth: 0,
    height: 44,
    width: 150,
    paddingVertical: 0,
    paddingHorizontal: theme.spacing.spacing2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  selectedCell: {
    backgroundColor: theme.palette.surface.tertiary,
  },
  etiologyWrapper: {
    flexDirection: 'row',
    gap: theme.spacing.spacing2,
    alignItems: 'center',
  },
  indexText: {
    ...theme.typography.bodyXS,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  indexWrapper: {
    borderWidth: 1,
    borderColor: theme.palette.border.grayInputDefault,
    padding: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing2,
    justifyContent: 'center',
    width: 26,
  },
  indexWrapperOther: {
    width: 'auto',
  },
  diamondWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
}));
