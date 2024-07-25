"use server";

import { API_URL, RETREATS_LIMIT } from "@/lib/constants";
import axios from "axios";

export const getRetreats = async (searchParams: {
  title: string;
  location: string;
  type: string;
  page: string;
}) => {
  const queryParams = new URLSearchParams(searchParams).toString();
  const url = `${API_URL}?${
    searchParams.page ? "" : "page=1"
  }&limit=${RETREATS_LIMIT}${queryParams ? `&${queryParams}` : ""}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return [];
  }
};
