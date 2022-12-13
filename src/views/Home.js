import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Row, Col, CardImg, CardFooter, CardSubtitle } from 'reactstrap'
import img1 from '@src/assets/images/slider/03.jpg'
import img2 from '@src/assets/images/slider/02.jpg'
import img3 from '@src/assets/images/slider/01.jpg'

const Home = () => {
  return (
    <div>
      <Row className='match-height mb-2'>
        <Col md='4' xs='12'>
          <Card>
            <CardBody>
              <CardTitle tag='h4'>Card Title</CardTitle>
              <CardSubtitle className='text-muted'>Support card subtitle</CardSubtitle>
            </CardBody>
            <img className='img-fluid' src={img1} alt='Card cap' />
            <CardBody>
              <CardText>Bear claw sesame snaps gummies chocolate.</CardText>
              <Button href='/' onClick={e => e.preventDefault()}>
                Card Link
              </Button>
              <Button href='/' onClick={e => e.preventDefault()}>
                Another Link
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md='4' xs='12'>
          <Card>
            <CardBody>
              <CardTitle tag='h4'>Card Title</CardTitle>
              <CardSubtitle className='text-muted'>Support card subtitle</CardSubtitle>
            </CardBody>
            <img className='img-fluid' src={img2} alt='Card cap' />
            <CardBody>
              <CardText>Bear claw sesame snaps gummies chocolate.</CardText>
              <Button href='/' onClick={e => e.preventDefault()}>
                Card Link
              </Button>
              <Button href='/' onClick={e => e.preventDefault()}>
                Another Link
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md='4' xs='12'>
          <Card>
            <CardBody>
              <CardTitle tag='h4'>Card Title</CardTitle>
              <CardSubtitle className='text-muted'>Support card subtitle</CardSubtitle>
            </CardBody>
            <img className='img-fluid' src={img3} alt='Card cap' />
            <CardBody>
              <CardText>Bear claw sesame snaps gummies chocolate.</CardText>
              <Button href='/' onClick={e => e.preventDefault()}>
                Card Link
              </Button>
              <Button href='/' onClick={e => e.preventDefault()}>
                Another Link
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home
