import styles from "../styles/WeatherCard.module.css";
import { MdLocationOn } from "react-icons/md";
import date from "date-and-time";

export const WeatherCard = (props) => {
  let conditionText = props.data.current.condition.text;
  let dataDate = date.parse(props.data.location.localtime, "YYYY-MM-DD H:mm");
  let currentDate = date.format(dataDate, "ddd, MMM DD YYYY");

  return (
    <div
      className={
        conditionText.includes("rain") ? styles.CardCloudy : styles.Card
      }
    >
      <div className={styles.TemperatureSection}>
        <p className={styles.ConditionText}>
          {props.data.current.condition.text}
        </p>
        <p className={styles.TempC}>{props.data.current.temp_c}°</p>
      </div>
      <div className={styles.DateSection}>
        <p className={styles.TextTime}>{currentDate}</p>
        <p className={styles.LocationText}>
          <MdLocationOn />
          {props.data.location.name}
        </p>
      </div>
      <div className={styles.IconSection}>
        <img src={props.data.current.condition.icon} />
      </div>
    </div>
  );
};
