import { Card, CardContent, Container } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../style/Styles.styles";
export const AddContact = () => {
  const classes = styles();
  var allPhones =[];
  const [contacts, setContacts] = useState([]);
  const [inputField, setInputField] = useState({ name: "", phone: "" });
  const [view, setView] = useState(false);
  const [nameValidation,setNameValidation] = useState();
  const [phoneValidation,setPhoneValidation] = useState();
  var history = useHistory();
  
  function checkPhoneNumber(){
    axios.post("http://localhost:3000/check_phonenumber","hii")
    .then(res=>{
      console.log(res.data.data);
      setContacts(res.data.data);
    })
  }
  let name, value;
  const inputHandler = (e) => {
    e.preventDefault();
    setNameValidation(false);
    setPhoneValidation(false);
    setView(false);
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
  useEffect(() => {
    checkPhoneNumber();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    console.log("28-->",inputField);
    console.log(contacts);
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
      await axios
        .post("http://localhost:3000/add-contact", inputField)
        .then((res) => {
          if (res.data.isSuccess) {
            alert(res.data.message);
            history.push("/all-contacts")
          } else {
            alert(res.data.message);
          }
        });
  };
  return (
    <>
      <Container className={classes.container}>
        <Card className={classes.card1}>
          <CardContent className={classes.content}>
            <p className={classes.heading}>Add Contact</p>
            <label htmlFor="name" className={classes.label}>
              Name:
            </label>
            <input type="text" name="name" className={classes.form_control} onChange={inputHandler} value={inputField.name}
            /><br />
            {nameValidation?<p className="text-danger">This field is required</p>:""}
            <div className={classes.division}>
              <label htmlFor="phone" className={classes.label}>
                Phone:
              </label>
              <input type="number" name="phone" className={classes.form_control} onChange={inputHandler} value={inputField.phone}
              />
              <br />
              {view ? <p className="text-danger">This phone number is already added</p> : ""}
              {phoneValidation?<p className="text-danger">This field is required</p>:""}
            </div>
            <div className={classes.division}>
              <button className={classes.button} onClick={submit} disabled={view || nameValidation || phoneValidation}>
                Submit
              </button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
