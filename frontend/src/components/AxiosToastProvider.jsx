import { useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { setAxiosToast } from "../api/axios";

export default function AxiosToastProvider() {
  const { showToast } = useToast();

  useEffect(() => {
    setAxiosToast(showToast);
  }, [showToast]);

  return null;
}
