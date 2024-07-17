import { createNavigationContainerRef, Route } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { RootStackParamList } from 'src/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function useCurrentRoute() {
  const [route, setRoute] = useState<
    Route<string, object | undefined> | undefined
  >(undefined);

  useEffect(() => {
    const listener = navigationRef.addListener('state', () => {
      setRoute(navigationRef.getCurrentRoute());
    });

    return listener;
  }, []);

  return route;
}
