/*
import { useEffect, useState } from "react";
import OverviewTable from "@/components/overview/Table";
import OverviewSnippet from "@/components/overview/Snippet";
import { getDatasets } from "@/api/dataset/api";
import { AxiosError } from "axios";
import { Dataset } from "@/api/dataset/dataset";
*/
import { TokenData } from "@/app/login/useToken"; // adjust the import

type LoginProps = {
  setToken: (userToken: TokenData) => void;
};

/**
 * Login page, checking the ticket sent by CAS server and authenticated user
 * @returns 
 */
export default function Login({ setToken }: LoginProps) {



  return (
    <div className="container">
      ...
    </div>
  )

}
