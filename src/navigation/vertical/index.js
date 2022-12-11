import { Mail, Home, Trello } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'slide',
    title: 'Create Slide',
    icon: <Trello size={20} />,
    navLink: '/create-slide'
  }
]
