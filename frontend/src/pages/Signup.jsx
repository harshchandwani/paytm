import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from "../components/InputBox"
import {Button} from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Singup"} />
          <SubHeading label={"Enter your information to create an Account"} />
          <InputBox onChange= {(e) => {
            setFirstName(e.target.value)
          }} placeholder="Harsh" label={"First Name"} />
          <InputBox onChange= {(e) => {
            setLastName(e.target.value)
          }}placeholder="Chandwani" label={"Last Name"} />
          <InputBox onChange= {(e) => {
            setUserName(e.target.value)
          }}placeholder="harsh@gmail.com" label={"Email"} />
          <InputBox onChange= {(e) => {
            setPassword(e.target.value)
          }}placeholder="Nitika" label={"Password"} />
          <div className='pt-4'>
            <Button onClick={ async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName, 
                password
              })
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
              toast.success("Sign up Successfull")
            }} label = {"Sign up"} />
          </div>
          <BottomWarning label= {"Already have an account"} buttonText = {"Sign in"} to= {"/signin"} />

        </div>
      </div>
    </div>
  )
}

export default Signup


// import { BottomWarning } from "../components/BottomWarning"
// import { Button } from "../components/Button"
// import { Heading } from "../components/Heading"
// import { InputBox } from "../components/InputBox"
// import { SubHeading } from "../components/SubHeading"

// export const Signup = () => {
//     return <div className="bg-slate-300 h-screen flex justify-center">
//     <div className="flex flex-col justify-center">
//       <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//         <Heading label={"Sign up"} />
//         <SubHeading label={"Enter your infromation to create an account"} />
//         <InputBox placeholder="John" label={"First Name"} />
//         <InputBox placeholder="Doe" label={"Last Name"} />
//         <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
//         <InputBox placeholder="123456" label={"Password"} />
//         <div className="pt-4">
//           <Button label={"Sign up"} />
//         </div>
//         <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//       </div>
//     </div>
//   </div>
// }