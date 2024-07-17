import { View } from 'react-native';

import Center from '../../components/roundtree/center';
import Edge from '../../components/roundtree/edge';
import { EDGE_SIZE } from '../../constants/roundtree';
import { getNumbersInRange } from '../../helpers/utils';
import { useBodySystems } from '../../constants/bodySystems';
import { makeStyles } from './../../helpers/hooks/useTheme';
import { BodySystemKey } from '../../screens/patientDashboard/patientDashboard.tsx';

const useStyles = makeStyles(() => ({
  root: {
    width: EDGE_SIZE * 2,
    height: EDGE_SIZE * 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  edge: {
    left: EDGE_SIZE,
    top: EDGE_SIZE,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

interface IRoundtree {
  roundtreeFilter: BodySystemKey;
  onSelectNode: Function;
}

const Roundtree = ({ roundtreeFilter, onSelectNode }: IRoundtree) => {
  const styles = useStyles();
  const bodySystems = useBodySystems();

  // Rearrange the bodySystems to correctly display in the roundtree starting with MET
  const rearrangedBodysystems = [
    ...bodySystems.slice(3),
    ...bodySystems.slice(0, 3),
  ];
  const newConfig = [
    {
      light: 1,
      dark: 0,
    },
    {
      light: 3,
      dark: 0,
    },
    {
      light: 0,
      dark: 0,
    },
    {
      light: 5,
      dark: 0,
    },
    {
      light: 0,
      dark: 1,
    },
    {
      light: 0,
      dark: 0,
    },
    {
      light: 0,
      dark: 0,
    },
    {
      light: 0,
      dark: 0,
    },
    {
      light: 0,
      dark: 0,
    },
    {
      light: 0,
      dark: 0,
    },
    {
      light: 2,
      dark: 0,
    },
  ];

  const getEdgeStyle = (index: number) => {
    return {
      transform: [
        {
          translateX: -EDGE_SIZE / 2,
        },
        {
          rotate: `${index * 30}deg`,
        },
        {
          translateX: EDGE_SIZE / 2,
        },
      ],
    };
  };

  return (
    <>
      <View style={styles.root}>
        {getNumbersInRange(1, rearrangedBodysystems.length).map((_, index) => {
          return (
            <View key={index} style={[styles.edge, getEdgeStyle(index)]}>
              <Edge
                index={index}
                node={rearrangedBodysystems[index]}
                newConfig={newConfig[index]}
                empty={true}
                outlineValue={0}
                isPatientDashboard={true}
                roundtreeFilter={roundtreeFilter}
                onSelectNode={onSelectNode}
              />
            </View>
          );
        })}

        <Center isHighlighted={true} />
      </View>
    </>
  );
};

export default Roundtree;
