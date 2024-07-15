export type User= {
    Patient_Details:PatientDetails;
    FamilyDetails:FamilyDetails[];
}
type PatientDetails = {
  pname: string;
  pemail: string;
  p_age: string;
  pdob: string;
  phobbies: string;
  p_pic: string[];
  userId: string;
};

type FamilyDetails = {
  fname: string;
  frelation: string;
  fphone: string;
  femail: string;
  faddress: string;
  fjob: string;
  f_age: string;
  fdob: string;
  fhobbies: string;
  f_pic: string[];
};
