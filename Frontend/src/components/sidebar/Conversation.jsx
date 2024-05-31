import emoji from 'emoji-dictionary';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/socketContext';

const getRandomEmoji = () => {
	const emojis = emoji.names;
  	const randomIndex = Math.floor(Math.random() * emojis.length);
	return emoji.getUnicode(emojis[randomIndex]);
};


const Conversation = ({conversation, lastIndex }) => {
	const emoji = getRandomEmoji();

	const {selectedConversation, setSelectedConversation} = useConversation();
	const { onlineUsers } = useSocketContext();
	const isSelected = selectedConversation?._id === conversation._id;
	const isOnline = onlineUsers.includes(conversation._id);


	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}`}
				onClick={() => setSelectedConversation(conversation)}
			>				
			<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic || 'https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.username}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{/* <div className='divider my-0 py-0 h-1' /> */}

			{!lastIndex && <div className='divider my-0 py-0 h-1' />}

		</>
	);
};
export default Conversation;