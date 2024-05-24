import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {

	const {loading, logout} = useLogout();


	const handleLogout = async (e) => {
		e.preventDefault();
		await logout();
    };


	return (
		<div className='mt-auto'>
			
				<BiLogOut
				className='w-6 h-6 text-white cursor-pointer'
				onClick={handleLogout}
				/>
			{/* ) : (
				<span className='loading loading-spinner'></span>
			)} */}
		</div>
	);
};
export default LogoutButton;