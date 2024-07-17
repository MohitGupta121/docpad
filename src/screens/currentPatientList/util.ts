import Colors from '../../assets/themes/mainTheme/palette';

export function getColorByScore(severity) {
  if (severity >= 9) {
    return Colors.palette.surface.triageScore5;
  } else if (severity >= 7) {
    return Colors.palette.surface.triageScore4;
  } else if (severity >= 5) {
    return Colors.palette.surface.triageScore3;
  } else if (severity >= 2) {
    return Colors.palette.surface.triageScore2;
  } else {
    return Colors.palette.surface.triageScore1;
  }
}
