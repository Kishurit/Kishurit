import React from "react";
//import { useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { isBrowser } from "react-device-detect";

export default function DataTable(props) {
  return (
    <ListGroup className="list2">
      {props.data?.links?.map((e1, i) => (
        <div key={"subCat" + i}>
          <ListGroupItem
            style={{
              fontWeight: "lighter",
              fontSize: "large",
              paddingTop: "3%",
              marginRight: "-1em",
              borderRadius: "0",
              color: "black",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            {("" + (i + 1)).padStart(2, "0") + ". "}{" "}
            <span style={{ direction: "ltr" }}>{e1.cat}</span>
          </ListGroupItem>

          {props.soryByAtrr(e1.links).map((e2, j) => (
            <ListGroupItem
              key={e2.site_name}
              style={{
                border: "none",
                margin: "0",
                padding: isBrowser ? "0% 4% 0% 0%" : "0% 6% 0% 0%",
              }}
            >
              {("" + (j + 1)).padStart(2, "0") + ". "}
              <a href={e2.link}>{e2.site_name}</a>

              {e2.link2 && <a href={e2.link2}>קישור 2</a>}

              {e2.link3 && <a href={e2.link3}>קישור 3</a>}
              {e2.link4 && <a href={e2.link4}>קישור 4</a>}

              {e2.facebook_link1 && <a href={e2.facebook_link1}>דף פייסבוק</a>}

              {e2.facebook_link2 && <a href={e2.facebook_link2}>דף פייסבוק2</a>}

              {e2.linkedIn_link && <a href={e2.linkedIn_link}>לינקדאין</a>}

              {e2.instagram_link && <a href={e2.instagram_link}>דף אינסטגרם</a>}

              <Button
                variant="link"
                style={{ fontWeight: "400", marginTop: "-0.3em" }}
                onClick={() => {
                  props.setName(e2.site_name);
                  props.setShowModal(true);
                }}
              >
                דיווח
              </Button>
            </ListGroupItem>
          ))}
        </div>
      ))}
    </ListGroup>
  );
}
