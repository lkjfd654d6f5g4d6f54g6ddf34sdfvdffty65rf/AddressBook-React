import { Container } from '@mui/material'
import {Link} from 'react-router-dom'
export const Navbar = () =>{
    return(
        <Container style={{ paddingLeft: "4em",marginTop:"3rem",paddingRight:'4em' }}>
            
            <Link to="/all-contacts"><button type="button" class="btn btn-success">View Contact</button></Link>
            <Link to="/" style={{float:'right'}}><button type="button" class="btn btn-outline-primary">Add Contact</button></Link>
        </Container>
    )
}