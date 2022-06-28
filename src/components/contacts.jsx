import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import DeleteIcon from '@mui/icons-material/Delete';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import {Link} from 'react-router-dom';
import { BounceLoader } from "react-spinners";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#089bab",
    color: theme.palette.common.white,
    textAlign:'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Contacts = () => {
  const [product,setProduct] = useState([])
  let header = { "content-type": "application/json" };
  const [spinner, setSpinner] = useState(false)
  useEffect(async() => {
    await axios.get("http://localhost:3000")
      .then((res) => {
        if(res.data.isSuccess){
        setProduct(res.data.data)
        }
      });
  }, [product]);
  const deleteRow = async (id)=>
  {
    console.log(id)
    var tconfirm = window.confirm("Are you sure want to delete");
    if(!tconfirm)
    {
      return;
    }
    await axios.post(`http://localhost:3000/delete-contact/${id}`)
    .then(res=>{
      if(res.data.isSuccess)
      {
        alert(res.data.message)
      }
    })
  }
  return (
    <Container style={{ padding: "4em" }}>
      <h1 className="text-center">Product Details</h1>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((row,index) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" align="center" scope="row">
                  {index+1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center"><Link exact to={`/update-contacts/${row._id}`} type="button" value={index+1} class="btn btn-sm"><Edit /></Link><button type="button" value={row._id} class="btn btn" onClick={()=>deleteRow(row._id)}><DeleteIcon style={{color:"#f44336"}} /></button> </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
