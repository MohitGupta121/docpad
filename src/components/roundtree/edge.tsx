import { useCallback } from 'react';
import { View } from 'react-native';
import { NodeConfiguration } from '../../helpers/roundtree.ts';
import { EDGE_SIZE } from '../../constants/roundtree.ts';
import { ITheme } from '../../assets/themes/mainTheme';
import Node from '../../components/roundtree/node.tsx';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import { BodySystemKey } from '../../screens/patientDashboard/patientDashboard.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    width: EDGE_SIZE,
    height: 1,
    backgroundColor: theme.palette.border.grayInputDefault,
    position: 'relative',
  },
  highlight: {
    borderWidth: 1,
    borderRadius: 10,
    left: theme.spacing.spacing3,
    position: 'absolute',
  },
  highlightLight: {
    backgroundColor: theme.palette.border.brandSecondary,
    height: theme.spacing.spacing4,
    top: -3.5,
    borderColor: theme.palette.border.brandPrimary,
  },
  greenDotExam: {
    position: 'absolute',
    top: -1.5,
    left: 21,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 0,
    backgroundColor: theme.palette.border.positive,
    opacity: 1,
    zIndex: 1,
  },
  greenDotAnamnesis: {
    position: 'absolute',
    top: -3.5,
    left: 19,
    width: 8,
    height: 8,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: theme.palette.surface.primary,
    borderColor: theme.palette.border.positive,
    borderStyle: 'solid',
    opacity: 1,
    zIndex: 1,
  },
}));

export interface IEdge {
  index: number;
  node: any;
  newConfig?: NodeConfiguration;
  outlineValue: number | undefined;
  empty?: boolean;
  isPatientDashboard?: boolean;
  roundtreeFilter: BodySystemKey;
  onSelectNode: Function;
}

const Edge = ({
  index,
  node,
  newConfig,
  outlineValue,
  empty,
  isPatientDashboard,
  roundtreeFilter,
  onSelectNode,
}: IEdge) => {
  const styles = useStyles();

  const getHighlightStyles = (
    value: number = 0,
    darkHighlight: boolean,
    outline: boolean = false,
  ) => {
    // divide the edge length (diameter of roundTree) into ten segments and multiply by anamnesis value
    if (!outline && value > 1) {
      return { width: (styles.root.width / 8) * (value - 1.2) };
    } else if (outline && value > 1) {
      return { width: (styles.root.width / 11) * value };
    } else if (!isPatientDashboard && value === 1 && darkHighlight) {
      return styles.greenDotExam;
    } else if (!isPatientDashboard && value === 1 && !darkHighlight) {
      return styles.greenDotAnamnesis;
    } else {
      if (outline) {
        return { display: 'none' };
      } else {
        return;
      }
    }
  };

  const getHighlightStylesPatientDashboard = useCallback(
    (value: number = 0) => {
      return { width: (styles.root.width / 9) * value };
    },
    [styles.root.width],
  );

  const renderHighlightLight = () => {
    return (
      <View
        style={[
          styles.highlight,
          styles.highlightLight,
          getHighlightStyles(newConfig?.light, false),
        ]}
      />
    );
  };

  const renderHighlightDark = () => {
    return (
      <View
        style={[
          styles.highlight,
          styles.highlightDark,
          getHighlightStyles(newConfig?.dark, true),
        ]}
      />
    );
  };

  return (
    <View style={styles.root}>
      {renderHighlightLight()}

      {renderHighlightDark()}
      {isPatientDashboard && (
        <View
          style={[
            styles.highlight,
            styles.highlightLight,
            getHighlightStylesPatientDashboard(outlineValue),
          ]}
        />
      )}
      <Node
        index={index}
        node={node}
        empty={empty}
        roundtreeFilter={roundtreeFilter}
        onSelectNode={onSelectNode}
      />
    </View>
  );
};

export default Edge;
