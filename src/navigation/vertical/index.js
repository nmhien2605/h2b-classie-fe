import React from "react";
// icon library
import { Airplay, Cast, Home, Trello, Users } from "react-feather";
//another icon library
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
class Presentation extends React.Component {
  render() {
    return <span size={20}><HiOutlinePresentationChartBar /> </span>
  }
}
export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  // {
  //   id: 'secondPage',
  //   title: 'Group',
  //   icon: <Users size={20} />,
  //   navLink: "/group",
  // },
  {
    id: "group",
    title: "My Presentations",
    icon: <Presentation />,
    navLink: "/my-slides",
  },
  {
    id: "slide",
    title: "Create Presentation",
    icon: <Trello size={20} />,
    navLink: "/create-presentation",
  },
];
