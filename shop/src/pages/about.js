import { Outlet } from 'react-router-dom';

function About() {
	return (
		<div> 
      <h4>회사정보</h4>
      {/* nested routes의 element를 보여주는 곳은 Outlet으로 표시한다. */}
      <Outlet />
    </div>
	)
}

export default About;