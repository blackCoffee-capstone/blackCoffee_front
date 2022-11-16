// lottie
import Lottie from "lottie-react";
import LoadingAnimation from "assets/lottie/loading.json";

function Loading() {
  return (
    <div>
      <Lottie animationData={LoadingAnimation} loop={true} 
        style={{ width: "200px", margin: "0 auto" }} 
      />
      <p style={{ textAlign: "center" }} >Loading...</p>
    </div>
  );
}

export default Loading