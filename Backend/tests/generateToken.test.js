import generateTokenAndSetCookie  from '../utils/generateToken'; 
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('generateTokenAndSetCookie function', () => {
    let res;

    beforeEach(() => {
        res = {
        cookie: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a token and set cookie with correct options', () => {
        const userId = 'user123';
        const token = 'generated_token';

        jwt.sign.mockReturnValue(token);

        generateTokenAndSetCookie(userId, res);

        expect(jwt.sign).toHaveBeenCalledWith({ userId }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        expect(res.cookie).toHaveBeenCalledWith('jwt', token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        withCredentials: true,
        });
    });
});
