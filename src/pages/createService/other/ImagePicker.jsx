import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function WarningAlert({description}) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="filled" severity="warning">
          {description}
        </Alert>
      </Stack>
    );
  }

function ImagePicker({
    principalImageURL,
    setPrincipalImageURL,
    handlePrincipalImageChange
}) {
    const removePrincipalImage = () =>{
        setPrincipalImageURL(null)
    } 
  return (
    <>
    {!principalImageURL &&
            <div>
                <WarningAlert
                  description={"Falta la Imagen Principal"}
                />
            </div>
            }
        <label className="custom-file-upload">
            <input 
            type="file"
            name="principalImageURL"
            onChange={handlePrincipalImageChange} 
            accept="image/*"
            />
            Imagen Principal
        </label>
    {principalImageURL &&
     <div className="principalImage">
        <img src={principalImageURL} alt="Cargando..."/>
        <div onClick={()=>removePrincipalImage()}>
            <CloseRoundedIcon className="closeRoundedIcon"/>
        </div>
     </div>
    }
    </>
  )
}

export default ImagePicker