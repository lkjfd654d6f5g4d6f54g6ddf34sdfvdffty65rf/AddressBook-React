import { Card,CardContent,Box,Typography,TextField,Button,Container,Grid } from "@mui/material";
import styles from "../style/Styles.styles";

import {useParams} from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
export const UpdateContact = () =>{
    let myId=useParams();
    // console.log("10-->",myId);

  const [nameValidation,setNameValidation] = useState();
  const [phoneValidation,setPhoneValidation] = useState();

  const [contacts, setContacts] = useState([]);
  const [view, setView] = useState(false);
    const history = useHistory();
    const [inputField, setInputField] = useState({ name: "", phone: "" });
    const classes = styles();
    function checkPhoneNumber(){
        axios.post("http://localhost:3000/check_phonenumber","hii")
        .then(res=>{
          console.log(res.data.data);
          setContacts(res.data.data);
        })
      }
    let name, value;
    const inputHandler = (e) => {
        setView(false);
    setNameValidation(false);
    setPhoneValidation(false);
      e.preventDefault();
      name = e.target.name;
      value = e.target.value;
      setInputField({ ...inputField, [name]: value });
      if(inputField.phone && inputField.phone.length>4){
        for(var elem of contacts)
        {
          if(elem.phone.includes(inputField.phone))
          {
            console.log("Exist")
            setView(true);
          }else{
            console.log("Not exist")
            // setView(false);
          }
        }}
    };
    useEffect(()=>{
        checkPhoneNumber();
        var id = myId;
        console.log(id)
        axios.get(`http://localhost:3000/edit-contact/${id.id}`)
        .then(res=>{
            console.log("16-->",res.data.data)
            let {name,phone}=res.data.data;
            setInputField({name:name,phone:phone});
           
        })
    },[])
    const update = async()=>{
        if(inputField.name ==="" && inputField.phone==="")
    {
      setNameValidation(true);
      setPhoneValidation(true);
      return;
    }
    if(inputField.name ==="")
    {
      setNameValidation(true);
      return;
    }
    if(inputField.phone ==="")
    {
      setPhoneValidation(true);
      return;
    }
        console.log("39-->",inputField,myId.id)
        if(inputField.name==''|| inputField.phone=='')
        {
            alert("All the fields need to be filled")
            return;
        }
        await axios.post(`http://localhost:3000/update-contact/${myId.id}`,inputField)
        .then(res=>{
            if(res.data.isSuccess)
            {
                alert(res.data.message);
                history.push("/all-contacts")
            }else{
                alert(res.data.message)
            }
        })
    }
    return(
        <>
             <Container className={classes.container}>
                 <h1></h1>
            <Card className={classes.card1}>
            <CardContent className={classes.content}>
                <h3 className="text-center p-2">Update Contact</h3>
                <form style={{paddingLeft:'4em',paddingRight:'4em'}}>
                    <div className="form-group">
                        <label htmlFor="name" className={classes.label} >Name:</label>
                        <input type="text" name="name" className={classes.form_control} onChange={inputHandler} value={inputField.name}/><br />
                        {nameValidation?<p className="text-danger">This field is required</p>:""}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone" className={classes.label}>Phone:</label>
                        <input type="text" name="phone" className={classes.form_control} onChange={inputHandler}
                value={inputField.phone}/><br />
                {view ? <p className="text-danger">This phone number is already added</p> : ""}
                {phoneValidation?<p className="text-danger">This field is required</p>:""}
                    </div>
                    <div className="pb-2">
                        <button type="button" className={classes.button} onClick={update} disabled={view || nameValidation || phoneValidation}> Update </button>
                    </div>
                </form>
                </CardContent>
            </Card>
            </Container>
        </>
    )
}