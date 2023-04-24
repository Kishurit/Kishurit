import { Children } from 'react';
import { Card } from 'react-bootstrap';

export default function Well(props) {
  return (
    <Card bg="light" className="my-4">
      <Card.Body>
        <Card.Text>
          { Children }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
