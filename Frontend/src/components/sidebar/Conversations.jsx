import useGetConversation from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading,  conversations } = useGetConversation();

	console.log('Conversations:', conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, index) => (
				<Conversation
					key={conversation._id} // Використовуйте унікальний ключ, якщо доступний
					conversation={conversation}
					lastIndex={index === conversations.length - 1}
				/>
		))}
		</div>
	);
};
export default Conversations;