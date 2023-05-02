import { Children } from 'react';
import { Card } from 'react-bootstrap';

export default function Well(props) {
  return (
    <Card bg="light">
      <Card.Body>
        <Card.Text>
          { props.children }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
