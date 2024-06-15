import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { isBrowser } from "react-device-detect";

import { fetchData, serverURL, sortByAttr } from "../../api";
import useFetch from "../../hooks/useFetch";
import DbCatForm from "./DbCatForm";

const DbCat = () => {
  const { data } = useFetch(serverURL("/cat1234"), "GET");
  const [catData, setCatData] = useState();
  const [canEdit, setCanEdit] = useState(false);

  const updateDataBase = async (newData) => {
    try {
      let req = await fetchData(
        serverURL("/cat1234"),
        newData?._id === undefined ? "post" : "put",
        newData
      );

      let dataToUpdate;
      if (newData._id === undefined) {
        dataToUpdate = [...catData, req];
      } else {
        dataToUpdate = catData.map((obj) =>
          obj._id === newData._id ? newData : obj
        );
      }

      updateLocalData(dataToUpdate);
      setCanEdit(false);

      return true;
    } catch (err) {
      alert("לא ניתן לעדכן");
      return false;
    }
  };

  const updateLocalData = (localData) => {
    setCatData(() => sortByAttr(localData, "name"));
  };

  useEffect(() => {
    updateLocalData(data);
  }, [data]);

  return (
    <Container fluid className={isBrowser ? "p-5" : "mt-5"}>
      <Row lg={3}>
        <Col lg={3}></Col>
        <Col lg={6} md={12}>
          <Table>
            <thead>
              <tr>
                <th style={{ border: "none" }}>
                  <h3 className="text-center">
                    {catData?.length === undefined ? 0 : catData.length}{" "}
                    קטגוריות
                  </h3>
                  {/* Removed optional chaining */}
                </th>
              </tr>
            </thead>
            <tbody>
              {catData?.map((cat, i) => (
                <tr key={cat?.name}>
                  <td style={{ border: "none" }}>
                    <DbCatForm {...cat} updateData={updateDataBase} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  className={!canEdit ? "d-grid" : ""}
                  style={{ border: "none" }}
                >
                  {canEdit ? (
                    <DbCatForm canEdit={true} updateData={updateDataBase} />
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => setCanEdit(true)}
                    >
                      להוסיף
                    </Button>
                  )}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DbCat;
