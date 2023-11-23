import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Mycard.css'

const Mycard = (props) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')
    const {handleEdit}=props

    const getData = async () => {
        setLoading(true)
        const result = await fetch('http://localhost:2000/api/getdata')
        const responce = await result.json()
        console.log(responce)
        setData(responce.allData)

    }

    const handleDelete=async(id)=>{
          const result=await fetch(`http://localhost:2000/api/deleteData/${id}`,{
            method: 'DELETE',
            headers:{
             'Content-Type': 'application/json',
            },
          })
          const responce=await result.json()
          console.log(responce)
          getData()
    }


    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col lg={5}></Col>
                    <Col lg={2}>
                        {
                            loading ? <Button variant="danger" disabled={true} >disabled</Button>
                                : <Button variant="danger" onClick={getData}>Load Data</Button>
                        }

                    </Col>
                    <Col lg={5}></Col>
                </Row>
                <Row className='mt-4'>
                    {data && data.map((item, index) => {
                     return(
                        <Col lg={4} className='mt-3'>
                            <Card border="primary" style={{ width: '18rem' }}>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.message}</Card.Title>
                                    <Card.Text>
                                        {item.email}
                                    </Card.Text>

                                </Card.Body>
                                <Row>
                                    <Col lg={5}></Col>
                                    <Col lg={3}></Col>
                                    <Col lg={1}>  <i class="fa fa-trash iconcolor" aria-hidden="true" onClick={()=>{handleDelete(item._id)}}></i></Col>
                                  
                                    <Col lg={1}>  <i class="fa fa-pencil-square-o iconcolor" aria-hidden="true" onClick={()=>{handleEdit(item._id)}}></i></Col>
                                </Row>
                            </Card>
                        </Col>
                        )

                    })}

                </Row>
            </Container>

        </>
    )
}

export default Mycard
