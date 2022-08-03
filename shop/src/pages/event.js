import { Container, Row, Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function Event() {
  return (
    <Container>
      <Row>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>오늘의 이벤트</Card.Title>
            <Outlet />
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export {Event}