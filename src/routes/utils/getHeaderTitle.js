import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


export function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Acceuil':
      return 'Acceuil';
    case 'Matchs':
      return 'Matchs';
    case 'Paris':
      return 'Paris';
    case 'Classement':
      return "Classement";
    case 'Profile':
      return "Profile"
  }
}
