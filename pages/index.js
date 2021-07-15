import Head from "next/head";
import WeatherSection from "../components/WeatherSection";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Spotweather</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <WeatherSection />
      <footer>
        <p>
          Spotweather | Andoni Technology | Powered by
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            WeatherAPI.com
          </a>
        </p>
      </footer>
    </div>
  );
}
