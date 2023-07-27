import React from "react";
import { isBrowser } from "react-device-detect";
import { getPost, serverURL } from "../api";
import { NotificationManager } from "react-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Col } from "react-bootstrap";
import Well from "../Bootstrap3/Well";

const schema = yup.object().shape({
  subject: yup.string().trim().optional(),
  name: yup.string().trim().optional(),
  email: yup.string().email("כתובת המייל אינה תקינה").optional(),
  tel: yup.string().optional(),
  message: yup.string().trim().required("ההודעה היא שדה חובה"),
});

const defaultValues = {
  subject: undefined,
  name: undefined,
  email: undefined,
  tel: undefined,
  message: undefined,
};

const ContactForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    console.clear();
    //console.log(data);

    getPost(serverURL("/mail"), { data })
      .then((val) => {
        NotificationManager.success("ההודעה נשלחה בהצלחה", "", 2000);
        //console.log(val);
      })
      .catch((val) => {
        NotificationManager.error("ההודעה לא נשלחה", "", 2000);
        console.log(val);
      });
  };

  const MyForm = ({ style, className }) => (
    <Form onSubmit={handleSubmit(onSubmit)} className={className} style={style}>
      <h3 className="mt-6 mb-20 text-center">לשלוח הודעה</h3>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="text"
          size="sm"
          id="subject"
          name="subject"
          placeholder="כותרת"
          {...register("subject")}
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="text"
          size="sm"
          id="name"
          name="name"
          placeholder="שם"
          {...register("name")}
        />
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="email"
          size="sm"
          id="email"
          name="email"
          placeholder="כתובת מייל"
          {...register("email")}
          className={formState.errors.email ? "is-invalid" : ""}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          type="tel"
          size="sm"
          id="tel"
          name="tel"
          placeholder="מספר טלפון"
          {...register("tel")}
          className={formState.errors.tel ? "is-invalid" : ""}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.tel?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 col">
        <Form.Control
          as="textarea"
          size="sm"
          rows="5"
          placeholder="הודעה"
          {...register("message")}
          className={formState.errors.message ? "is-invalid" : ""}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.message?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-0">
        לשלוח
      </Button>
    </Form>
  );

  return (
    <>
      {isBrowser ? (
        <Well className="lg:col-span-2 sm:col-span-1" type="well2">
          <MyForm />
        </Well>
      ) : (
        <MyForm />
      )}
    </>
  );
};

export default ContactForm;
