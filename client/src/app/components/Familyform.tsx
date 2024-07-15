import React from 'react'
import { useState } from 'react';
const Familyform = (props:any) => {
  

  const handleFileChange= (e:any) =>{
   setfdata({
    ...fdata,
    f_pic:Array.from(e.target.files)
   })
  }
  const onchange= (e:any) =>{
    const {name,value}=e.target;
    setfdata({
     ...fdata, 
     [name]:value
    })
  }
const onsubmit=(e:any)=>{
    e.preventDefault();
    console.log("formdata",fdata);
    props.onAdd(fdata);
    setfdata({
      fname: "",
      frelation: "",
      fphone: "",
      femail: "",
      faddress: "",
      fjob:"",
      f_age: "",
      fdob: "",
      fhobbies: "",
      f_pic: []
    })
}
  
  const [fdata, setfdata] = useState({
    fname: "",
    frelation: "",
    fphone: "",
    femail: "",
    faddress: "",
    fjob:"",
    f_age: "",
    fdob: "",
    fhobbies: "",
    f_pic: []
  });
 

  return (
    <div>
      <form encType='multipart/form-data'>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">Family Member Name:</label>
          <input type="text" className="form-control" id="fname" name="fname" value={fdata.fname} onChange={onchange} />
          <label htmlFor="frelation" className="form-label">Relation to Patient:</label>
          <input type="text" className="form-control" id="frelation" name="frelation" value={fdata.frelation} onChange={onchange} />
          <label htmlFor="fphone" className="form-label">Phone Number:</label>
          <input type="tel" className="form-control" id="fphone" name="fphone" value={fdata.fphone} onChange={onchange} />
          <label htmlFor="femail" className="form-label">Email address:</label>
          <input type="email" className="form-control" id="femail" name="femail" placeholder="name@example.com" value={fdata.femail} onChange={onchange} />
          <label htmlFor="faddress" className="form-label">Current Address:</label>
          <input type="text" className="form-control" id="faddress" name="faddress" value={fdata.faddress} onChange={onchange} />
          <label htmlFor="fjob" className="form-label">Occupation:</label>
          <input type="text" className="form-control" id="fjob" name="fjob" value={fdata.fjob} onChange={onchange} />
          <label htmlFor="f_age" className="form-label">Age:</label>
          <input type="number" className="form-control" id="f_age" name="f_age" value={fdata.f_age} onChange={onchange} />
          <label htmlFor="fdob" className="form-label">Date of Birth:</label>
          <input type="date" className="form-control" id="fdob" name="fdob" value={fdata.fdob} onChange={onchange} />
          <label htmlFor="fhobbies" className="form-label">Hobbies:</label>
          <input type="text" className="form-control" id="fhobbies" name="fhobbies" value={fdata.fhobbies} onChange={onchange} />
          <label htmlFor="f_pic" className="form-label">Upload Your Pictures:</label>
          <input type="file" className="form-control" id="formFileMultiple" name="f_pic" onChange={handleFileChange} multiple />
        
          <br />
          <button onClick={onsubmit} className='btn btn-primary'>Add Family Member Details</button>
        </div>
      </form>
    </div>
  )
}

export default Familyform
