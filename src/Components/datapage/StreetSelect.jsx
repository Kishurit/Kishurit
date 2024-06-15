import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClearButton, Typeahead } from "react-bootstrap-typeahead";
import { Col } from "react-bootstrap";

const StreetSelect = (props) => {
  const url = "https://data.gov.il/api/3/action/datastore_search";

  const [streets, setStreets] = useState([]);
  const [street, setStreet] = useState("");

  useEffect(() => {
    var citisParams = {
      params: {
        resource_id: "9ad3862c-8391-4b2f-84a4-2d4c68625f4b",
        limit: 500000,
        q: props.city,
      },
    };

    axios.get(url, citisParams).then((data) => {
      // console.log (data?.data?.result?.records);
      const addedStreets = data?.data?.result?.records
        .map((e) => String(e["שם_רחוב"]).trim())
        .sort((a, b) => a.localeCompare(b, "he"))
        //     .filter((e) => e !== "לא רשום")
        .map((e, index) => ({ id: index + 1, label: e }));
      setStreets(addedStreets);
      //console.log(addedStreets);
    });
  }, [props.city]);

  // const options = ["ערים"];
  // const renderMenuItemChildren = (option, { text }) => <div>תבחר עיר</div>;

  return (
    <>
      <div className={props.className}>
        <Typeahead
          id="streets-select"
          size="sm"
          onChange={(selected) => {
            console.log(selected);

            const sel = selected.length > 0 ? selected[0].label : null;
            setStreet(sel);
            if (sel) {
              props.setStreet(sel);
              console.log(sel);
            }
          }}
          options={streets}
          selected={street ? [street] : []}
          align="justify"
          placeholder="לבחור רחוב"
        />
      </div>
    </>
  );
};

export default StreetSelect;
