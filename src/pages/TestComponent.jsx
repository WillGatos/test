import React,{useContext} from 'react'
import { AuthContext } from '../helpers/AuthContext';
import { Button } from '@mui/material';
function TestComponent() {

    const {setSearchServiceDialogOpen} = useContext(AuthContext)
    const [checked, setChecked] = React.useState(true)
    return (
        <div className='d-f f-d-c j-c-c' style={{width: "100vw"}}>
            <Button
            disabled={checked}
            onClick={()=>setSearchServiceDialogOpen(true)}>Start</Button>

            <Button onClick={()=>setChecked(!checked)}>sadasd</Button>
        </div>
    )
}

export default TestComponent;