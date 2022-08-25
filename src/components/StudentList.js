import React, { useEffect, useState } from "react";
import { Card, Container, Table, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom'
import {  FerrisWheelSpinnerOverlay } from 'react-spinner-overlay';

export default function StudentList(props) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  let getStudents = () => {
    setLoading(true)
    axios
      .get("https://8080-learnwithpa-studentmana-mirwur2mjns.ws-us63.gitpod.io/listStudents")
      .then((response) => {setStudents(response.data)
                          setLoading(false)})
      .catch((error) => alert(error));
  };

  let deleteStudent = (studentId) => {
    axios.delete("https://8080-learnwithpa-studentmana-mirwur2mjns.ws-us63.gitpod.io/student/"+studentId)
    .then(response=> {
      if (response.data !== null){
        props.showAlert("success", "Record deleted successfully")
        setStudents(students.filter(student=>student.id!==studentId));
      }
    })
  }

  return (
    <div className="my-3">
      <Container>
        <div >

        <FerrisWheelSpinnerOverlay
          loading={loading}

          overlayColor="rgba(255,255,255,0.8)"
        />
      </div>
        <Card.Header>
          <h3>Students List</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Student Address</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                ""
              ) : (
                students.map((student)=>
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.address}</td>
                  <td>
                    <ButtonGroup>
                      <Link to={"/student/"+student.id}><Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}> Edit </FontAwesomeIcon></Button></Link>{ ' '}
                      <Button size="sm" variant="outline-danger" onClick={deleteStudent.bind(this,student.id)}><FontAwesomeIcon icon={faTrash}> Delete </FontAwesomeIcon></Button>
                      {/* <Button size="sm" variant="outline-danger" onClick={()=>deleteStudent(student.id)}><FontAwesomeIcon icon={faTrash}> Delete </FontAwesomeIcon></Button> */}
                    </ButtonGroup>
                  </td>
                </tr>
                )
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Container>
    </div>
  );
}
