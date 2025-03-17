import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) {
    <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  }

  const countries = cities.reduce((prev, curr) => {
    if (prev.map((el) => el.country).includes(curr.country)) {
      return prev;
    } else {
      return [...prev, { country: curr.country, emoji: curr.emoji }];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CityList;
