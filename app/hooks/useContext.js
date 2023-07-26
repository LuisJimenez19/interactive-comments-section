import { useContext } from "react";
import { context } from "../context/Context";

export function useMainConext() {
  return useContext(context);
}
