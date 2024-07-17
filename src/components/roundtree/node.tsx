import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { BodySystem } from '../../constants/bodySystems';
import { getLabelRotation } from '../../helpers/roundtree';
import { CENTER_CIRCLE_RADIUS } from '../../constants/roundtree';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme';
import { BodySystemKey } from '../../screens/patientDashboard/patientDashboard.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  node: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: CENTER_CIRCLE_RADIUS * 2,
    height: CENTER_CIRCLE_RADIUS * 2,
    borderRadius: CENTER_CIRCLE_RADIUS,
    borderColor: theme.palette.border.grayInputDefault,
    backgroundColor: theme.palette.surface.primary,
    transform: [
      {
        translateY: -CENTER_CIRCLE_RADIUS,
      },
    ],
  },
  label: {
    ...theme.typography.bodyS,
    textTransform: 'uppercase',
    color: theme.palette.text.tertiary,
  },
}));

export interface INode {
  index: number;
  node: BodySystem;
  empty?: boolean;
  roundtreeFilter: BodySystemKey;
  onSelectNode: Function;
}

const Node = ({ index, node, empty, roundtreeFilter, onSelectNode }: INode) => {
  const styles = useStyles();
  const [nodeSelected, setNodeSelected] = useState(false);

  useEffect(() => {
    setNodeSelected(roundtreeFilter === node.key);
  }, [roundtreeFilter, node.key]);

  const getSelectedBorderColor = () => {
    return { borderColor: node.chartLineColor };
  };

  const getSelectedColor = () => {
    return { color: node.chartLineColor };
  };

  return (
    <>
      <View style={styles.node} />
      {empty && (
        <TouchableOpacity
          style={[styles.node, nodeSelected && getSelectedBorderColor()]}
          onPress={() => {
            setNodeSelected((prevState) => {
              if (!prevState) {
                onSelectNode(node.key);
              } else {
                onSelectNode('');
              }
              return !prevState;
            });
          }}
        >
          <Text
            style={[
              styles.label,
              getLabelRotation(index),
              nodeSelected && getSelectedColor(),
            ]}
          >
            {node.label}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Node;
