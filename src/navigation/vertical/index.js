import { Users, Home, Trello } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Group',
    icon: <Users size={20} />,
    navLink: '/group'
  },
  {
    id: 'slide',
    title: 'Create Slide',
    icon: <Trello size={20} />,
    navLink: '/create-slide'
  }
]
