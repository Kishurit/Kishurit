import React from "react";
import { Form } from "react-bootstrap";

const RegionEng = ["", "north", "south", "center", "yosh"];
const RegionHeb = ["הכל", "צפון", "דרום", "מרכז", 'יו"ש'];

export default function RegionPanel({ location, setLocation }) {
  return (
    <React.Fragment>
      <Form.Group className="mb-2" style={{ marginRight: "-1em" }}
      controlId="location">
        {RegionEng.map((region, i) => (
          <Form.Check
            key={region}
            inline
            value={region}
            label={RegionHeb[i]}
            name="inlineRadio"
            type="radio"
            checked = {location === region}
            onChange={() => setLocation(region)}
          />
          
        ))}
      </Form.Group>
    </React.Fragment>
  );
}
