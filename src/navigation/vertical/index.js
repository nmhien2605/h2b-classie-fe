import { Mail, Home, Trello, Users } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "group",
    title: "My Presentations",
    icon: <Users size={20} />,
    navLink: "/my-slides",
  },
  {
    id: "slide",
    title: "Create Slide",
    icon: <Trello size={20} />,
    navLink: "/create-slide",
  },
];
