import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer';
import WeatherIcon from '../../components/weather/WeatherIcon';
import WeatherModal from '../../components/weather/WeatherModal';

const Home = () => {
	return (
		<>
			<div className="relative h-screen bg-gray-100">
				<WeatherIcon weather="sunny" />
    		</div>
			<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<Sidebar />
				<MessageContainer />
				{/* <WeatherModal /> */}
			</div>
		</>
	);
};
export default Home;
{/* <div className="relative h-screen bg-gray-100">
      			<WeatherIcon weather="sunny" />
    		</div> */}