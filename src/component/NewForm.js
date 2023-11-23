import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './NewForm.css'
import Mycard from './Mycard';


const NewForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const[isEdit,setIsEdit]=useState(false)

    const[value,setValue]=useState('')

    // for id should use updateduserdata function
    const[id,setId]=useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
    
         
         const result=await fetch('http://localhost:2000/api/addinfo',{
               method: 'POST',
               headers:{
                'Content-Type': 'application/json',
               },
                
                 body: JSON.stringify({ name:name, email:email, message:message })

         })
         const responce=await result.json()
         console.log(responce)
         setValue(responce)

         setName('')
         setEmail('')
         setMessage('')
    }

    const handleEdit=async(id)=>{
          console.log('edit')
          console.log(id)
          setId(id)
          
        //   submit button toggle
          setIsEdit(true)

        //   api call for get user realated to id
        const result=await fetch(`http://localhost:2000/api/getuser/${id}`)
        const responce=await result.json()
        console.log(responce)

        // automatic form fill for edit
        setName(responce.individualUser.name)
        setEmail(responce.individualUser.email)
        setMessage(responce.individualUser.message)



    }

    const updateUserData=async()=>{
            console.log(id)
            const result=await fetch(`http://localhost:2000/api/updateuser/${id}`,{
                method: 'PATCH',
                headers:{
                 'Content-Type': 'application/json',
                },
                 
                  body: JSON.stringify({ name:name, email:email, message:message })
            })
            const responce=await result.json()
            console.log("updated",responce)

            setName('')
            setEmail('')
            setMessage('')
            setIsEdit(false)
    }

    return (
        <>
            <Container className='mt-3'>
                <Row className='mt-5'>
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <Form  >



                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2" htmlFor='name'>
                                    Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id='name' type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2" htmlFor='email'>
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control id='email' type="text" placeholder="enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="2" htmlFor='message'>
                                    Message
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" id="message" rows={3} value={message} onChange={(e) => { setMessage(e.target.value) }} />
                                </Col>
                            </Form.Group>


                        </Form>
                        {isEdit ? <Button variant="secondary" onClick={updateUserData}>Edit Form</Button>:
                        <Button variant="secondary" onClick={handleSubmit}>Submit</Button>}
                        
                        {value.status === 'successful' && value.saveInfo ? <p className='mt-5  alertBox'  > Form Submitted Successfully</p> : null}
                        
                    </Col>
                    <Col lg={2}></Col>
                </Row>

               {/* myCard component ------ */}
                <Row className='mt-5'>
                    <Mycard handleEdit={handleEdit}/>
                </Row>

                
            </Container>
        </>
    )
}

export default NewForm
