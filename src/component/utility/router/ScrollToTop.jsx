// core
import { useEffect } from "react";
// router
import { useLocation } from "react-router-dom";

// 라우터 이동시 맨 위로 이동하도록 함
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}