import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Container, Input, Table} from 'reactstrap';

export default function Students() {
  // State, initial field
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [text, setText] = useState("")
  const [textEdit, setTextEdit] = useState("")
  const [isEdit, setIsEdit] = useState({id:"", flag: false})
  const [checked, setChecked] = useState({
    id:"",
    flag: false
  })

  const inititalizeCheked = () => {
      const filterData = data.filter(item => item.checked === false);

      return filterData.length !==0
  }

  const reChecked = (id, flag) => {

  }



  const url = 'https://66a07b267053166bcabb898e.mockapi.io/student';

  // Function Handler
  // const getStudent = () => {
  //     axios.get(url)
  //       .then((res)=>{
  //         setData(res.data)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  // }

  const getStudent = () => {
    axios({
      method: 'get',
      url: url,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStudent();
  }, []);

  // const deleteStudent = (id) => {
  //     axios.delete(url + "/" +id)
  //       .then((res) => {
  //         setMessage("Deleted successful")
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //       .finally(() => {
  //         getStudent();
  //       })
  // }

  const deleteStudent = (id) => {
    axios({
      method: 'delete',
      url: url + '/' + id,
    })
      .then((res) => {
        setMessage('Delete successful');
        setData(data.filter(item => item.id !== id))
      })
      .catch((error) => {
        console.log(error);
      })
  };

  // const addNewStudent = () => {
  //     axios.post(url, {
  //       name: "Lê Buởi"
  //     })
  //       .then((res) => {
  //         setMessage("Add successful")
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //       .finally(() => {
  //         getStudent();
  //       })
  // }

  const addNewStudent = (txt) => {
    axios({
      method: 'post',
      url: url,
      data: {
        name: txt,
      },
    })
      .then((res) => {
        setMessage('Add Successful');
        setData([...data,{id: res.data.id, name: txt}])
      })
      .catch((error) => {
        console.log(error);
      })
      
  };

  // const updateStudent = (id) => {
  //     axios.put(url +"/" +id,{
  //       name: "Lê Buởi"
  //     })
  //       .then((res) => {
  //         console.log("Update successful")
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //       .finally(() => {
  //         getStudent();
  //       })
  // }

  // axios put khai báo tuờng minh
  const updateStudent = (id,txt) => {
    axios({
      method: 'put',
      url: url + '/' +id,
      data: {
        name: txt,
      },
    })
      .then((res) => {
        setMessage('Update successful')
        setData(data.map(item => item.id === id ?{...item,name: txt}:item))
      })
      .catch((error) => {
        console.log(error);
      });
  };




  // Render
  return (
    <div>
      <Container>
        {
          message && <p>{message}</p>
        }
        <h1>Student List</h1>
        <Input
         placeholder="Nhập tìm kiếm" 
          className='my-5'
          value={text}

          onChange={(e) => setText(e.target.value)}

          onKeyDown={(e) => {
            if(e.key === "Enter") {
              addNewStudent(text)
              setText("")
            }
          }}
         
         />

        <Table>
          <thead>
            <tr>
              <th>
                <Input type='checkbox'/>
              </th>
              <th>#id</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Input type='checkbox'/>
                  </td>
                  <td>{item.id}</td>
                  <td>
                    {
                        isEdit.id === item.id && isEdit.flag === true?<Input
                          value={textEdit}
                          onChange={(e) => setTextEdit(e.target.value)}
                          onKeyDown={(e)=> {
                            if(e.key === "Enter") {
                              updateStudent(item.id, textEdit)
                              setTextEdit("")
                              setIsEdit({
                                id: "",
                                flag: false
                              })
                            }
                          }}

                        />:
                        <p onDoubleClick={() => {
                          setIsEdit({
                            id: item.id,
                            flag: true
                          })
                          setTextEdit(item.name)
                        }}>{item.name}</p>
                    }
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteStudent(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        
                      }}
                      className="btn btn-success"
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
