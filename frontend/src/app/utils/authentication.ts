import carousel1 from "../../../public/event-carousel-01.jpg";
import carousel2 from "../../../public/event-carousel-02.jpg";
import carousel3 from "../../../public/event-carousel-03.jpg";
import carousel4 from "../../../public/event-carousel-04.jpg";
import checkmarkLogo from "../../../public/icons8-check-48.png";
import hidePasswordLogo from "../../../public/icons8-hide-password-50.png";
import showPasswordLogo from "../../../public/icons8-show-password-30.png";

interface ICarousel {
  image: string;
  text: string;
}

const carouselArray: ICarousel[] = [
  {
    image: carousel1.src,
    text: "Turn Your Passion into a Gathering. Host events that bring like-minded people together",
  },
  {
    image: carousel2.src,
    text: "Create Spaces Where Ideas Flourish. Whether it's local meetups or global conferences, your community starts here",
  },
  {
    image: carousel3.src,
    text: "Cultivate Community Through Shared Experiences. Start hosting events that matter.",
  },
  {
    image: carousel4.src,
    text: "From Hobby Groups to Professional Networks: Create Spaces Where Connections Thrive",
  },
];

export default {
  assets: {
    checkmarkLogo,
    hidePasswordLogo,
    showPasswordLogo,
  },
  carouselArray,
};
