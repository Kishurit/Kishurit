import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { isBrowser } from "react-device-detect";
import { fetchData, serverURL, sortByAttr } from "../../api";
import useFetch from "../../hooks/useFetch";
import DbSubCatForm from "./DbSubCatForm"; // Assuming this import is correct
import "../../style/cat.css";

const updateLocalData = (dataToSet, setFunc) => {
  setFunc(sortByAttr(dataToSet, "name"));
};

const DbSubCat = () => {
  //const {data: data2} = useSelector((state) => state);

  const { data } = useFetch(serverURL("/cat1234"), "GET");
  const catData = sortByAttr(data, "name");
  const [selData, setSelData] = useState();
  const [subCatData, setSubCatData] = useState();
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (data) {
      const cat = selData ? selData : catData[0];
      if (!selData) setSelData(cat)
      fetchData(`${serverURL("/subcat1234")}/${cat._id}`, "GET")
        .then((subCatArr) => {
          console.log (subCatArr);
          updateLocalData(subCatArr, setSubCatData);
        })
        .catch((err) => console.error(err));
    }
  }, [catData, data, selData]);


  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelData(catData[selectedIndex]);
  };

  // const findSubcatByCatId = () =>
  //   subCatData.filter((subCat) => subCat.catRefId._id === selData?._id);
  // const getSubCatSorted = () => sortByAttr(findSubcatByCatId(), "name");

  const updateDataBase = async (newData) => {
    console.log(newData);

    try {
      let req = await fetchData(
        serverURL("/cat1234"),
        newData?._id === undefined ? "post" : "put",
        newData
      );
      console.log(req);

      let dataToUpdate =
        newData._id === undefined
          ? [...catData, req]
          : catData.map((obj) => (obj._id === newData._id ? req : obj));

      updateLocalData(dataToUpdate); // Update the state with the dataToUpdate
      console.log(req);
      setCanEdit(false);
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  // if (1 === 1) return <p></p>;
  return (
    <>
    <Container fluid className={isBrowser ? "p-5" : "mt-5"}>
      <Row>
        <Col lg={6} md={12}>
          <Table>
            <thead>
              <tr className="mt-1 mb-5">
                <th>
                  <h3 className="text-center mt-1 mb-4">
                    {subCatData?.length} תתי קטגוריות
                  </h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <Form.Select
                    size="sm"
                    type="text"
                    placeholder="*קטגוריה"
                    value={catData?.findIndex (e => e?.name === selData?.name)}
                    onChange={handleSelectChange}
                    required
                  >
                    {catData?.map((e, i) => (
                      <option key={`${i} +sel`} value={i}>
                        {e.name}
                      </option>
                    ))}
                  </Form.Select>
                </th>
              </tr>
              <tr>
                <th>
                  <h1 className="fs-2 text mt-1 mb-1">{`${selData?.name ? selData?.name : ''}`}</h1>
                </th>
              </tr>
              {subCatData?.map((subCat, subCatIndex) => (
                <tr key={subCat._id}>
                  <td>
                    <DbSubCatForm
                      {...subCat}
                      cat={catData}
                      index={subCatIndex}
                      updateData={updateDataBase}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className={!canEdit ? "d-grid" : ""}>
                  {/* {canEdit ? (
                    <DbCatForm canEdit={true} />
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setCanEdit(true)}
                    >
                      להוסיף
                    </Button>
                  )} */}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default DbSubCat;
