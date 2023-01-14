import {useRef} from 'react'
import * as xlsx from "xlsx"
import axios from 'axios'
function ExcelUpload() {
    const jsonArray = useRef()
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const accessToken = localStorage.getItem("accessToken");
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                jsonArray.current = json;
                console.log(jsonArray.current)
                axios.post("/events/excelUpload",jsonArray.current,{
                    headers:  {'Authorization': 'Bearer '+ accessToken},
                }).catch(er=>console.log(er))
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    return (
    <form>
    <p className="text-center">Admin</p>
    <input
        onChange={readUploadFile}
        type="file" id="actual-btn" 
        hidden
    />
    <div className="adminContainer centerElement">
        <label for="actual-btn" className="excelInput">Choose File</label>
    </div>

    </form>
  )
}

export default ExcelUpload