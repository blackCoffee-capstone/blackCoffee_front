// lottie
import Lottie from "lottie-react";
import LoadingAnimation from "assets/lottie/loading.json";

function Loading() {
  return (
    <section className='c_main_section'>
      <div className="c_section">
        <div className="c_inner">
          <Lottie animationData={LoadingAnimation} loop={true} 
            style={{ width: "200px", margin: "0 auto" }} 
          />
          <p style={{ textAlign: "center" }} >Loading...</p>
        </div>
      </div>
    </section>
  );
}

export default Loading