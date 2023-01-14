import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
function CoverSelector({coverHandling}) {
    const {
        cover,
        setCover,
        coverSelected,
        setCoverSelected}
        = coverHandling;

    const handleCover = input => e =>{
        setCover({...cover, [input]: e.target.value})
      }

  return (
    <>
        <div className='d-f a-i-c'>
        <Checkbox
            value={coverSelected.ForGender}
            checked={coverSelected.ForGender}
            onChange={(event) => {
                setCoverSelected((coversSelection)=>{
                    return {...coversSelection, ForGender: event.target.checked}
                })
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <p>Cover Por Género</p>
        </div>

        <div className='d-f a-i-c'>
        <Checkbox
            value={coverSelected.Regular}
          checked={coverSelected.Regular}
          onChange={(event) => {
              setCoverSelected(coversSelection=>{
                return {...coversSelection, Regular: event.target.checked}
              })
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
            <p>Cover Normal</p>
        </div>

        <div className='d-f a-i-c'>
        <Checkbox
            value={coverSelected.ForFEU}
            checked={coverSelected.ForFEU}
            onChange={(event) => {
                setCoverSelected(coversSelection=>{
                    return {...coversSelection, ForFEU: event.target.checked}
                })
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <p>Cover Para FEU</p>
        </div>

        {coverSelected.ForGender &&
            <>
            <TextField 
                label='Precio Para Chicos'
                name='ForMen' 
                type="number" 
                value={cover.ForMen} 
                onChange={handleCover("ForMen")}
                color="primary"
                variant="standard"
                className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh"
                //className="border-pallid-blue inputs-changer font-size-20 font-color-white inputs-shape margin-top-5vh"
            />
            <TextField 
                label='Precio Para Chicas'
                name='ForWomen' 
                type="number" 
                value={cover.ForWomen} 
                onChange={handleCover("ForWomen")}
                color="primary"
                variant="standard"
                className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh"
                //className="border-pallid-blue inputs-changer font-size-20 font-color-white inputs-shape margin-top-5vh"
            />
            </>
        }

        {coverSelected.Regular &&
        <>
        <TextField 
            label='Precio Normal'
            name='Regular' 
            type="number" 
            value={cover.Regular} 
            onChange={handleCover("Regular")}
            color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh"
            //className="border-pallid-blue inputs-changer font-size-20 font-color-white inputs-shape margin-top-5vh"
        />
        </>
        }
        
        {coverSelected.ForFEU &&
        <>
        <TextField 
            label='Precio FEU'
            name='ForFEU' 
            type="number" 
            value={cover.ForFEU} 
            onChange={handleCover("ForFEU")}
            color="primary"
            variant="standard"
            className="inputs-changer font-size-25 font-color-white inputs-shape margin-top-5vh"
            //className="border-pallid-blue inputs-changer font-size-20 font-color-white inputs-shape margin-top-5vh"
        />
        </>
        }
        
    </>
  )
}

export default CoverSelector