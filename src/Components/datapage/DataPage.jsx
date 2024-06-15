import React, { useState, useMemo, useRef, useEffect, StrictMode } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import DataTable from "../DataTable3";
import ReportForm from "./ReportForm";
import DataCat from "./DataCat";
import RegionPanel from "./RegionPanel";
import SearchPanel from "./SearchPanel";
import { fetchData, serverURL } from "../../api";
import CitiesSelect from "./CitiesSelect";
import StreetSelect from "./StreetSelect";

const soryByAtrr = (arr) => {
  return (arr = arr.sort((a, b) => {
    let res = a["site_name"].localeCompare(b["site_name"]);
    return res;
  }));
};

/*const getLinksLength = (links) => {
  return links.reduce ((a, c) => {
      return a + c.links.length;
  }, 0)
}*/

export default function DataPage(props) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [searchData, setSearchData] = useState();
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState([]);
  const searchText = useRef();

  const [name, setName] = useState("");
  const elementColoumnWidth1 =
    window.innerWidth < 1200 ? { lg: "5", md: "5" } : { lg: "4", md: "4" };

  const elementColoumnWidth2 =
    window.innerWidth < 1200 ? { lg: "3", md: "3", sm: '6', xs: '6' } : { lg: "2", md: "2", sm: '6', xs: '6' };

  const SearchInData = (e) => {
    e.preventDefault();
    if (searchText.current.value.trim() === "") alert("הכנס ערך");
    const dataToserver = {
      searchText: searchText.current.value,
      location: location,
    };
    fetchData(serverURL("/search"), "post", dataToserver)
      .then((dataFromServer) => {
        setSearchData(dataFromServer);
        setIndex(-1);
      })
      .catch((err) => {
        setIndex(-1);
        setSearchData([]);
      });
  };

  useEffect(() => {
    if (index >= 0) {
      fetchData(serverURL(`/${index}`)).then((dataFromServer) =>
        setData(dataFromServer)
      );
    }
  }, [index]);

  return (
    <React.Fragment>
      <Container className="uicontainer">
        <h2
          className="text-center title"
          style={{ textDecoration: "underline" }}
        >
          קישורית
        </h2>
        <br style={{ padding: "0", margin: "0" }} />

        <Form onSubmit={SearchInData}>
          <SearchPanel searchText={searchText} {...elementColoumnWidth1} />
          <RegionPanel location={location} setLocation={setLocation} />
          <DataCat
            {...elementColoumnWidth1}
            index={index}
            setIndex={setIndex}
          />
          {/* <br style = {{padding: "0", margin: "0"}} /> */}

          <Row>
            <Col {...elementColoumnWidth2}>
            <CitiesSelect
              setCity={setCity}
              col={elementColoumnWidth2}
              className="mt-2"
            />
            </Col>
            <Col {...elementColoumnWidth2}>
            <StreetSelect
              setStreet={setStreet}
              col={elementColoumnWidth2}
              city={city}
              className="mt-2"
            />
            </Col>
          </Row>
        </Form>
        <Row>
          <Col lg={8} md={8} className="text-lg-right mt-4">
            <h3 className="text-center">
              {index !== -1
                ? data?.name
                : searchData.links.length !== 0
                ? "חיפוש: " + searchText.current.value
                : "לא נמצאו רשומות עבור: " + searchText.current.value}
            </h3>
            <DataTable
              soryByAtrr={soryByAtrr}
              data={index === -1 ? searchData : data}
              setName={setName}
              setShowModal={setShowModal}
            />
          </Col>
        </Row>
        <ReportForm
          name={name}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Container>
    </React.Fragment>
  );
}
