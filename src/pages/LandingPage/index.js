import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { LoginWithGoogle } from "../../firebase";
import classes from "./landingpage.module.css";

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <h2 className="primary">Remember</h2>
        <button className={classes.theme + " btn-pri"} onClick={toggleTheme}>
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <div className={classes.content}>
        <embed src="/assets/remember.svg" className={classes.img} />
        <span className={classes.CTA}>
          <h2>Remember</h2>
          <p className={classes.para}>
            Your one step solution to create and manage your notes, Add a note
            through your phone and later revise it on your PC.
          </p>
          <button
            className={classes.btn + " btn-pri"}
            onClick={() => LoginWithGoogle(navigate)}
          >
            Login With Google{" "}
            <img src="/assets/google.svg" className={classes.btnImg} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
