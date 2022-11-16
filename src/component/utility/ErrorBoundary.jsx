// core
import React from 'react'
// router
import { useLocation } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {

    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <section className='c_main_section'>
          <div className="c_section">
            <div className="c_inner">
              <h2 style={{ textAlign: "center" }}>
                페이지를 불러오는데 실패했습니다 :(
                <br />
                새로고침 해주세요
              </h2>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary