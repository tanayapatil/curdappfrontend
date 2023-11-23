import React, { useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


const Data = () => {
    const [value,setValue]=useState('')

    const getallData=async()=>{
        const result = await fetch('http://localhost:2000/api/getdata')
        const responce = await result.json()
        console.log(responce)
        setValue(responce.allData)
        
    }

    useEffect(()=>{
          getallData()
    },[])
    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={8}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {value && value.map((item,index)=>{
                                    return(
                                        <tr>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.message}</td>
                                    </tr>
                                    )
                                })}
                               
                                
                               
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={1}></Col>
                </Row>
            </Container>

        </>
    )
}

export default Data
