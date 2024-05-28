import useGetConversation from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading,  conversations } = useGetConversation();

	console.log('Conversations:', conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
			<Conversation />
		</div>
	);
};
export default Conversations;