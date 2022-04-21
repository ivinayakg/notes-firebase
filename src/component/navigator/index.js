import classes from "./navigator.module.css";
import { ArchiveIcon, TrashIcon, StarIcon, HomeIcon } from "../icons";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const buttonsData = [
    { icon: <HomeIcon />, name: "home", link: "/home" },
    { icon: <ArchiveIcon />, name: "draft", link: "/home/draft" },
    { icon: <TrashIcon />, name: "trash", link: "/home/trash" },
    { icon: <StarIcon />, name: "star", link: "/home/star" },
  ];

  const navigate = useNavigate();

  return (
    <nav className={classes.nav}>
      <div className={classes.navContainer}>
        {buttonsData.map(({ icon, name, link }, index) => (
          <button
            className={"btn-pri " + classes.btn}
            key={index}
            onClick={() => navigate(link)}
          >
            {icon}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigator;
