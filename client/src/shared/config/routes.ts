/** Single source of truth for client-side paths used in links and redirects. */
export const ROUTES = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  users: '/users/list',
  profile: '/profile/view',
  profileEdit: '/profile/edit',
} as const;
