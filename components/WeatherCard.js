import styles from "../styles/WeatherCard.module.css";
import { MdLocationOn } from "react-icons/md";
import date from "date-and-time";

export default function WeatherCard(props) {
  let conditionText = props.data.current.condition.text;
  let dataDate = date.parse(props.data.location.localtime, "YYYY-MM-DD H:mm");
  let currentDate = date.format(dataDate, "ddd, MMM DD YYYY");

  const getCardStyle = (conditionText) => {
    console.log("🚀 ~ getCardStyle ~ conditionText:", conditionText);
    conditionText = conditionText.toLowerCase(); // Make it case-insensitive
    if (conditionText.includes("sunny")) {
      return styles.CardSunny;
    } else if (conditionText.includes("cloudy")) {
      return styles.CardPartlyCloudy;
    } else if (conditionText.includes("rain") || conditionText.includes("drizzle")) {
      return styles.CardRain;
    }
    // else if (conditionText.includes("snow")) {
    //   return styles.CardSnowy;
    // } else if (conditionText.includes("thunder") || conditionText.includes("storm")) {
    //   return styles.CardStormy;
    // } else if (conditionText.includes("fog") || conditionText.includes("mist")) {
    //   return styles.CardFoggy;
    // } else if (conditionText.includes("wind")) {
    //   return styles.CardWindy;
    // }
    else {
      return styles.Card; // Default style
    }
  };

  return (
    <div className={getCardStyle(conditionText)}>
      <div className={styles.TemperatureSection}>
        <p className={styles.ConditionText}>{props.data.current.condition.text}</p>
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
}
