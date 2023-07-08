import { useEffect, useState } from "react";
import axios from "axios";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";
import useFetch from "../../hooks/useFetch";
import { Col, Spinner } from "react-bootstrap";

const CitiesSelect = (props) => {
  const url = "https://data.gov.il/api/3/action/datastore_search";
  /*const citiesUrl =
    "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=2500";

  const streetsUrl =
    "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=";*/

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    console.clear();
    var citisParams = {
      params: {
        resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba", // the resource id
        limit: 5000,
      },
    };

    axios.get(url, citisParams).then((data) => {
      console.log (data?.data?.result?.records);
      const addedCities = data?.data?.result?.records
        .map((e) => String(e["שם_ישוב"]).trim())
        .sort((a, b) => a.localeCompare(b, "ar"))
        .filter((e) => e !== "לא רשום")
        .map((e, index) => ({ id: index + 1, label: e }));
      setCities(addedCities);
    });
  }, []);

  const options = ["ערים"];
  const renderMenuItemChildren = (option, { text }) => <div>תבחר עיר</div>;

  if (cities.length === 0) return <p></p>;
  return (
    <>
      <Col {...props.col} className={props.className}>
        <Typeahead
          id="cities-select"
          size="sm"
          onChange={(selected) => {
            console.log(selected);

            const sel = selected.length > 0 ? selected[0].label : null;
            setCity(sel);
            if (sel) {
              props.setCity(sel);
              console.log(sel);
            }
          }}
          options={cities}
          selected={city ? [city] : []}
          align="justify"
          placeholder="לבחור יישוב"
        />
      </Col>
    </>
  );
};

export default CitiesSelect;
