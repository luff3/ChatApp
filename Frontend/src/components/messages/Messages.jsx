import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
	const {messages, loading } = useGetMessages();
	console.log('Mesaages:', messages);


	return (
		<div className='px-4 flex-1 overflow-auto'>
			{messages.map((message, index) => (
			<Message
				key={index} 
				message={message}
			/>
			))}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;