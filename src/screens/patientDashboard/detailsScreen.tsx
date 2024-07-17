import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, ScrollView } from 'react-native';
import { RootStackParamList } from 'src/navigation.tsx';
import { ITheme } from '../../assets/themes/mainTheme';
import { makeStyles } from '../../helpers/hooks/useTheme.ts';
import Layout from '../../components/layout/layout.tsx';
import Header from '../../components/navigationHeaderWithTitle/header.tsx';
import { navigateBack } from '../../navigation/RootNavigation.tsx';

const useStyles = makeStyles((theme: ITheme) => ({
  textContainer: {
    width: 685,
  },
  text: {
    ...theme.typography.bodyL,
    paddingHorizontal: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
  },
}));

type IDetailsScreen = NativeStackScreenProps<
  RootStackParamList,
  'DetailsScreen'
>;

export default function DetailsScreen({ route }: IDetailsScreen) {
  const { title } = route.params || undefined;
  const styles = useStyles();

  return (
    <Layout withoutSidebar>
      <Header title={title} onBackNavigation={() => navigateBack()} />
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor
          quam, convallis at porta quis, hendrerit id neque. Nunc viverra nulla
          in leo ultrices aliquam. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Suspendisse potenti. Cras ut augue sit amet enim
          imperdiet lacinia nec id purus. Ut eu sodales ligula. Vestibulum
          tincidunt nulla ex, vel auctor justo blandit in. Fusce dignissim
          tortor sapien, vitae sodales risus ornare eget. Donec non neque
          vulputate, eleifend nisl nec, dapibus erat. Phasellus pellentesque
          nisl nec diam lobortis egestas. Vivamus dui neque, efficitur vitae
          augue hendrerit, sollicitudin viverra neque. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras
          interdum auctor eros, at efficitur erat interdum egestas. Praesent sed
          massa ipsum. Curabitur suscipit semper purus vel molestie. Suspendisse
          et lorem eget lacus tempor suscipit id ac tellus. Nunc urna leo,
          molestie non ligula non, vehicula vestibulum augue. Phasellus
          convallis arcu in rutrum rutrum.
        </Text>
        <Text style={styles.text}>
          Aliquam ac turpis gravida, varius lacus id, placerat dolor. Morbi quis
          elit justo. Ut non orci tortor. Nunc et libero ac mi vehicula
          fermentum ut et mauris. Phasellus a sollicitudin felis. Mauris vel
          lacus ut felis sagittis molestie sed nec magna. Quisque vel auctor
          tortor, eget tristique ligula. Pellentesque egestas augue ut diam
          varius porta. Curabitur nec odio nunc. Nulla auctor lacus eget justo
          ultricies lacinia. Sed non enim eu tortor fermentum sodales. Aliquam
          eget imperdiet tortor. Nam velit risus, pretium ut tincidunt id,
          fringilla sed lectus. Sed a diam ac nibh pellentesque pellentesque sit
          amet et velit. Cras vehicula odio vitae varius tempus. Vivamus nec
          commodo erat. Etiam facilisis sollicitudin velit, aliquam maximus erat
          aliquet quis. Donec quis augue sem. Phasellus imperdiet pretium massa.
          Integer consequat eu nunc vel interdum. Maecenas id accumsan ante.
          Pellentesque quam neque, placerat id enim sit amet, bibendum fringilla
          nisi. Nullam felis purus, eleifend ac lacus in, euismod malesuada sem.
          Curabitur efficitur est turpis, at hendrerit turpis porttitor eget.
        </Text>
      </ScrollView>
    </Layout>
  );
}
