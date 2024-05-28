import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	console.log('Generate token', token);
	res.cookie("jwt", token, {
		maxAge: 30 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, 
		sameSite: "None", 
		secure: true,
		withCredentials: true,
	});
};

export default generateTokenAndSetCookie;