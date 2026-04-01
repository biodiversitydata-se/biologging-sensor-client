'use client'

import Login from "./Login";
//import './login.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CLIENT_URL, CLIENT_LOGIN_FULL_URL } from "@/config/constants";
import useToken from './useToken';

/**
 * Main page for including "login" page in routing. 
 */
export default function LoginPage() {

  const { token, setToken } = useToken();

  const CAS_BASE_URL = "https://auth.biodiversitydata.se/cas";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticket = params.get("ticket");
    const returnUrl = params.get("returnUrl") || "/";

    // Must match exactly the service URL used elsewhere
    const service = `${CLIENT_URL}/login?returnUrl=${encodeURIComponent(returnUrl)}`;

    // Step 1: No ticket → redirect to CAS login
    if (!ticket) {
      const loginUrl = `${CAS_BASE_URL}/login?service=${encodeURIComponent(service)}`;
      //console.log("Redirecting to CAS login:", loginUrl);
      window.location.href = loginUrl;
      return;
    }

    // Step 2: Ticket present → validate ticket
    const validateTicket = async () => {
      try {
        const validateUrl = `${CAS_BASE_URL}/serviceValidate?service=${encodeURIComponent(
          service
        )}&ticket=${ticket}`;

        //console.log("Validating CAS ticket:", validateUrl);

        const response = await axios.get(validateUrl, { withCredentials: true });

        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, "application/xml");

        const userNode = doc.getElementsByTagName("cas:user")[0];
        if (!userNode) throw new Error("No CAS user found in response");

        const username = userNode.textContent;

        const sbdiIdNode = doc.getElementsByTagName("cas:id")[0];
        const sbdiId = sbdiIdNode?.textContent ?? null;

        const authorityNode = doc.getElementsByTagName("cas:authority")[0];
        const roles = authorityNode?.textContent
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean) ?? [];
        const isAdmin = roles.includes("BIOLOGGING_ADMIN");

        //console.log("CAS user:", username, "ID:", sbdiId, "Roles:", roles);

        setToken({ username, sbdiId, isAdmin });

        // Clean URL after login
        window.location.href = returnUrl;
      } catch (err) {
        console.error("CAS validation failed:", err);
        // Optional: force re-login if validation fails
        //const loginUrl = `${CAS_BASE_URL}/login?service=${encodeURIComponent(service)}`;
        //window.location.href = loginUrl;
      }
    };

    validateTicket();
  }, [setToken]);

/*

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    let ticket = params.get('ticket');
    const returnUrl = params.get("returnUrl") || "/"; // default homepage

    // 👇 This MUST match exactly the service used in Banner.tsx
    const service = `${CLIENT_URL}/login?returnUrl=${encodeURIComponent(returnUrl)}`;

    console.log("useeffectpagetsx");
    if (ticket) {
      console.log(CLIENT_LOGIN_FULL_URL);
      //axios.get(`https://auth.biodiversitydata.se/cas/serviceValidate?service=${CLIENT_LOGIN_FULL_URL}&ticket=${ticket}`, { withCredentials: true })
      axios.get(`https://auth.biodiversitydata.se/cas/serviceValidate?service=${encodeURIComponent(service)}&ticket=${ticket}`, { withCredentials: true })
        .then(function (response) {
          console.log("response axios serviceValidate");
          console.log(response);

          const parser = new DOMParser();
          const doc = parser.parseFromString(response.data, "application/xml");            
          
          console.log(doc);
          console.log("parfait");

          // Try to find CAS <user> node
          const userNode = doc.getElementsByTagName("cas:user")[0];
          //console.log("usernode"+usernode);
          if (userNode) {
            const username = userNode.textContent;
            console.log("CAS user:", username);

            const sbdiIdNode = doc.getElementsByTagName("cas:id")[0];
            const sbdiId = sbdiIdNode.textContent;
            console.log("CAS id:", sbdiId);


            // check if the user is ADMIN
            const authorityNode = doc.getElementsByTagName("cas:authority")[0];
            const authorityString = authorityNode?.textContent ?? ''; // empty string if missing
            // Normalize, split, trim, filter empty
            const roles = authorityString
              .split(',')
              .map(r => r.trim())
              .filter(r => r.length > 0);
            const isAdmin = roles.some(r => r === 'BIOLOGGING_ADMIN');

            if (isAdmin)
              console.log("OUI IL EST ADMIN");
            else 
              console.log("NON PAS ADMIN");
              

            // ✅ store in the format expected by useToken
            if (!username) throw new Error("Username is missing!");
            setToken({ username, sbdiId, isAdmin });

            // Clean up URL after login
            //window.location.href = window.location.origin;
            window.location.href = returnUrl;
          } else {
            console.error("No CAS user found in response", response.data);
          }
        })
        .catch(() => {
          console.error('CAS validation failed');
        });
    }
  }, [setToken]);
*/

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="alert alert-success">
      ✅ Logged in as {token?.username}
    </div>
  );


}