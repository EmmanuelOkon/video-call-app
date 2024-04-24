// import { Home } from "lucide-react";
import { URLS } from "./routes";

export const sidebarLinks = [
  {
    label: "Home",
    route: URLS.HOME,
    imgUrl: "/icons/home.svg",
    // imgUrl: Home,
  },
  {
    label: "Upcoming Meetings",
    route: URLS.UPCOMING_MEETINGS,
    imgUrl: "/icons/upcoming.svg",
  },
  {
    label: "Previous Meetings",
    route: URLS.PREVIOUS_MEETINGS,
    imgUrl: "/icons/previous.svg",
  },
  {
    label: "Recordings",
    route: URLS.RECORDINGS,
    imgUrl: "/icons/video.svg",
  },
  {
    label: "Personal Room",
    route: URLS.PERSONAL_ROOM,
    imgUrl: "/icons/add-personal.svg",
  },
];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
