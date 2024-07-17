import React from "react";
import { useState } from "react";
import { FormEvent, ChangeEvent } from "react";
import { BACKEND_URL } from "../../../constants";
interface Pdata {
  pname: string;
  pemail: string;
  p_age: string;
  pdob: string;
  phobbies: string;
  p_pic: File[];
}
const Form = () => {
  const [pdata, setPdata] = useState<Pdata>({
    pname: "",
    pemail: "",
    p_age: "",
    pdob: "",
    phobbies: "",
    p_pic: [],
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdata({
        ...pdata,
        p_pic: Array.from(e.target.files),
      });
      console.log(e.target.files);
      console.log(Array.from(e.target.files));
    }
  };
  function onchange(event: any) {
    console.log(event);
    let name = event.target.name;
    let value = event.target.value;
    setPdata({ ...pdata, [name]: value });
  }
  // useEffect(() => {
  //   console.log(pdata);
  // }, [pdata]);
  async function onsubmit(event: any) {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(pdata).forEach((key) => {
        if (key !== "p_pic") formData.append(key, pdata[key as keyof Omit<Pdata,"p_pic">] as string);
      });
      pdata.p_pic.forEach((file, index) => {
        formData.append("p_pic", file);
      });
      console.log(formData);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/api/personaldetails`,
        {
          method: "POST",
          // headers: { "Content-Type": "application/JSON" },
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Patient Details saved");
      } else console.log("Error sending data to server");
    } catch (err) {
      console.error("Network error:", err);
    }
  }
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="pname" className="form-label">
            Patient Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="pname"
            name="pname"
            value={pdata.pname}
            onChange={onchange}
          />
          <label htmlFor="pemail" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            id="pemail"
            name="pemail"
            placeholder="name@example.com"
            value={pdata.pemail}
            onChange={onchange}
          />
          <label htmlFor="p_age" className="form-label">
            Age:
          </label>
          <input
            type="number"
            className="form-control"
            id="p_age"
            name="p_age"
            value={pdata.p_age}
            onChange={onchange}
          />
          <label htmlFor="pdob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            className="form-control"
            id="pdob"
            name="pdob"
            value={pdata.pdob}
            onChange={onchange}
          />
          <label htmlFor="phobbies" className="form-label">
            Hobbies:
          </label>
          <input
            type="text"
            className="form-control"
            id="phobbies"
            name="phobbies"
            value={pdata.phobbies}
            onChange={onchange}
          />
          <label htmlFor="p_pic" className="form-label">
            Upload Your Pictures:
          </label>
          <input
            type="file"
            className="form-control"
            id="formFileMultiple"
            name="p_pic"
            onChange={handleFileChange}
            multiple
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
