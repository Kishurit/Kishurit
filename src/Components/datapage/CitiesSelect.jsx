import React, { useEffect, useState } from "react";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";
import useAxiosSimple from "../../hooks/useAxiosSimple";

const CitiesSelect = (props) => {
  const url = "https://data.gov.il/api/3/action/datastore_search";

  const { data } = useAxiosSimple(url, "get", {
    params: {
      resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
      limit: 5000,
    },
  });

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (data && data.result && data.result.records) {
      const addedCities = data.result.records
        .map((record) => String(record["שם_ישוב"]).trim())
        .filter((name) => name !== "לא רשום")
        .sort((a, b) => a.localeCompare(b, "he"))
        .map((name, index) => ({ id: index + 1, label: name }));
        setCities(addedCities);
        // console.log(addedCities);
    }
  }, [data, url]); // Added 'url' as a dependency

  return (
    <div className={props.className}>
      <Typeahead
        id="cities-select"
        size="sm"
        onChange={(selected) => {
          const sel = selected.length > 0 ? selected[0].label : null;
          setCity(sel);
          if (sel) {
            props.setCity(sel);
          }
        }}
        options={cities}
        selected={city ? [city] : []}
        align="justify"
        placeholder="לבחור יישוב"
      />
    </div>
  );
};

export default CitiesSelect;
