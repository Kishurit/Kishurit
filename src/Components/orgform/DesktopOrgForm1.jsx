<<<<<<< HEAD
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { isBrowser, isMobile } from "react-device-detect";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const initialValues = {
  site_name: "",
  link1: "",
  link2: "",
  link3: "",
  facebook_link1: "",
  facebook_link2: "",
  linkedIn_link: "",
  instagram_link: "",
  email1: "",
  email2: "",
  tel1: "",
  tel2: "",
  whatsapp: "",
  location: "",
  message: "",
};

const schema = yup.object().shape({
  site_name: yup.string().required("שדה חובה"),
  link1: yup.string().required("שדה חובה"),
  link2: yup.string(),
  link3: yup.string(),
  facebook_link1: yup.string(),
  facebook_link2: yup.string(),
  linkedIn_link: yup.string(),
  instagram_link: yup.string(),
  email1: yup.string().email("כתובת דואר אלקטרוני לא תקינה"),
  email2: yup.string().email("כתובת דואר אלקטרוני לא תקינה"),
  tel1: yup.string(),
  tel2: yup.string(),
  whatsapp: yup.string(),
  location: yup.string().required("שדה חובה"),
  message: yup.string(),
});

const DesktopOrgForm1 = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission logic here
  };

  return (
    <React.Fragment>
      <Form className={"text-right" + (isBrowser && " well2")} onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center mb-3">להגיש עסק חדש</h3>
        <Row>
          <Form.Group controlId="site_name" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="site_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="*שם"
                  required
                  {...field}                  
                />
              )}
            />
            {errors.site_name && <span className="text-danger">{errors.site_name.message}</span>}
          </Form.Group>

          <Form.Group controlId="link1" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="link1"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="*קישור1"
                  required
                  {...field}
                />
              )}
            />
            {errors.link1 && <span className="text-danger">{errors.link1.message}</span>}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="link2" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="link2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור2"
                  {...field}
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="link3" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="link3"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור3"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="facebook_link1" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="facebook_link1"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור לפייסבוק1"
                  {...field}
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="facebook_link2" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="facebook_link2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור לפייסבוק2"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="linkedIn_link" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="linkedIn_link"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור ללינקדאין"
                  {...field}
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="instagram_link" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="instagram_link"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור לאינסטגרם"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="email1" className="mb-3" as={Col} lg={6} md={6}>
          <Controller
              name="email1"
              control={control}
              defaultValue=""
              render={({ field }) => (
              <Form.Control
                  size="sm"
                  type="email"
                  placeholder="אימייל1"
                  {...field}
              />
              )}
          />
          </Form.Group>

          <Form.Group controlId="email2" className="mb-3" as={Col} lg={6} md={6}>
          <Controller
              name="email2"
              control={control}
              defaultValue=""
              render={({ field }) => (
              <Form.Control
                  size="sm"
                  type="email"
                  placeholder="אימיי2"
                  {...field}
              />
              )}
          />
          </Form.Group>
      </Row>        
        <Row>
          <Col className={isMobile && "d-grid"}>
            <Button variant="primary" size="sm" type="submit">
              לשלוח
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

=======
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { isBrowser, isMobile } from "react-device-detect";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const initialValues = {
  site_name: "",
  link1: "",
  link2: "",
  link3: "",
  facebook_link1: "",
  facebook_link2: "",
  linkedIn_link: "",
  instagram_link: "",
  email1: "",
  email2: "",
  tel1: "",
  tel2: "",
  whatsapp: "",
  location: "",
  message: "",
};

const schema = yup.object().shape({
  site_name: yup.string().required("שדה חובה"),
  link1: yup.string().required("שדה חובה"),
  link2: yup.string(),
  link3: yup.string(),
  facebook_link1: yup.string(),
  facebook_link2: yup.string(),
  linkedIn_link: yup.string(),
  instagram_link: yup.string(),
  email1: yup.string().email("כתובת דואר אלקטרוני לא תקינה"),
  email2: yup.string().email("כתובת דואר אלקטרוני לא תקינה"),
  tel1: yup.string(),
  tel2: yup.string(),
  whatsapp: yup.string(),
  location: yup.string().required("שדה חובה"),
  message: yup.string(),
});

const DesktopOrgForm1 = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission logic here
  };

  return (
    <React.Fragment>
      <Form className={"text-right" + (isBrowser && " well2")} onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center mb-3">להגיש עסק חדש</h3>
        <Row>
          <Form.Group controlId="site_name" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="site_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="*שם"
                  required
                  {...field}                  
                />
              )}
            />
            {errors.site_name && <span className="text-danger">{errors.site_name.message}</span>}
          </Form.Group>

          <Form.Group controlId="link1" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="link1"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="*קישור1"
                  required
                  {...field}
                />
              )}
            />
            {errors.link1 && <span className="text-danger">{errors.link1.message}</span>}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="link2" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="link2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור2"
                  {...field}
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="link3" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="link3"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור3"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="facebook_link1" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="facebook_link1"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור לפייסבוק1"
                  {...field}
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="facebook_link2" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="facebook_link2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור לפייסבוק2"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="linkedIn_link" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="linkedIn_link"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור ללינקדאין"
                  {...field}
                />
              )}
            />
          </Form.Group>

          <Form.Group controlId="instagram_link" className="mb-3" as={Col} lg={6} md={6}>
            <Controller
              name="instagram_link"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="קישור לאינסטגרם"
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="email1" className="mb-3" as={Col} lg={6} md={6}>
          <Controller
              name="email1"
              control={control}
              defaultValue=""
              render={({ field }) => (
              <Form.Control
                  size="sm"
                  type="email"
                  placeholder="אימייל1"
                  {...field}
              />
              )}
          />
          </Form.Group>

          <Form.Group controlId="email2" className="mb-3" as={Col} lg={6} md={6}>
          <Controller
              name="email2"
              control={control}
              defaultValue=""
              render={({ field }) => (
              <Form.Control
                  size="sm"
                  type="email"
                  placeholder="אימיי2"
                  {...field}
              />
              )}
          />
          </Form.Group>
      </Row>        
        <Row>
          <Col className={isMobile && "d-grid"}>
            <Button variant="primary" size="sm" type="submit">
              לשלוח
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

>>>>>>> 80af62dbefbeccbf611f3c65aede4ade31d713c9
export default DesktopOrgForm1;