import { signup, login, logout  } from '../Controllers/authController';
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie  from '../utils/generateToken.js'; 
import httpMocks from 'node-mocks-http';

jest.mock('bcryptjs', () => {
    return {
        genSalt: jest.fn(),
        hash: jest.fn(),
    };
});

jest.mock('../utils/generateToken', () => ({
    __esModule: true,
    default: jest.fn(),
}));


User.findOne = jest.fn(); 

describe('Signup Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 201 if user is successfully created', async () => {
        req.body = {
            fullName: 'John Doe',
            username: 'john',
            password: 'password',
            confirmPassword: 'password',
            gender: 'male',
        };
    
        const hashedPassword = 'hashedpassword';
        bcrypt.genSalt.mockResolvedValue(10);
        bcrypt.hash.mockResolvedValue(hashedPassword);
    
        const user = {
            ...req.body,
            _id: 'user_id',
            password: hashedPassword,
            profilePic: `https://avatar.iran.liara.run/public/boy?username=john`,
        };
    
        User.findOne = jest.fn().mockResolvedValue(null);
    
        const mockSave = jest.fn().mockResolvedValue(user);
        jest.spyOn(User.prototype, 'save').mockImplementation(mockSave);
    
        generateTokenAndSetCookie.mockImplementation(() => {}); //!HERE CORRECT
    
        await signup(req, res);

    
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual({
            _id: expect.any(String),
            fullName: 'John Doe',
            username: 'john',
            profilePic: `https://avatar.iran.liara.run/public/boy?username=john`,
        });
    });

    it('should return 400 if passwords do not match', async () => {
        req.body = {
            fullName: 'John Doe',
            username: 'john',
            password: 'password',
            confirmPassword: 'differentpassword',
            gender: 'male',
        };

        await signup(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ error: "Passwords don't match" });
    });



    it('should return 400 if username already exists', async () => {
        req.body = {
            fullName: 'John Doe',
            username: 'john',
            password: 'password',
            confirmPassword: 'password',
            gender: 'male',
        };
    
        User.findOne = jest.fn().mockResolvedValue(req.body);
    
        await signup(req, res);
    
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ error: "Username already exists" });
    });
    
    it('should return 500 if there is a server error', async () => {
        req.body = {
            fullName: 'John Doe',
            username: 'john',
            password: 'password',
            confirmPassword: 'password',
            gender: 'male',
        };
    
        User.findOne.mockRejectedValue(new Error('Internal Server Error'));
    
        await signup(req, res);
    
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: 'Internal Server Error' });
    });



    // it('should return 400 if user data is invalid', async () => {
    //     req.body = {
    //         fullName: 'John Doe',
    //         username: 'john',
    //         password: 'password',
    //         confirmPassword: 'password',
    //         gender: 'maxxle',
    //     };

    //     User.findOne = jest.fn().mockResolvedValue(null);
    //     bcrypt.genSalt.mockResolvedValue(10);
    //     bcrypt.hash.mockResolvedValue('hashedpassword');

    //     const mockSave = jest.fn().mockImplementation(() => {
    //         throw new Error("Invalid user data");
    //     });
    //     jest.spyOn(User.prototype, 'save').mockImplementation(mockSave);

    //     await signup(req, res);

    //     console.log('Response status code:', res.statusCode);
    //     console.log('Response data:', res._getJSONData());

    //     expect(res.statusCode).toBe(400);
    //     expect(res._getJSONData()).toEqual({ error: "Invalid user data" });
    // });

});


describe('Login Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });



    it('should return 400 if password is incorrect', async () => {
        const user = {
            _id: 'user123',
            username: 'testuser',
            password: 'hashedpassword', 
        };
    
        req.body = {
            username: 'testuser',
            password: 'incorrectpassword', 
        };
    
        User.findOne.mockResolvedValue(user);
    
        bcrypt.compare = jest.fn().mockReturnValue(false); 
    
        await login(req, res);
    
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ error: 'Invalid username or password' });
    });

    it('should return 200 if login is successful', async () => {
        const user = {
            _id: 'user123',
            username: 'testuser',
            password: 'hashedpassword', 
            fullName: 'Test User',
            profilePic: 'testpic.jpg',
        };
        
        req.body = {
            username: 'testuser',
            password: 'correctpassword', 
        };
        
        User.findOne.mockResolvedValue(user);
        
        bcrypt.compare.mockResolvedValue(true);
    
        console.log("Before login");
        
        await login(req, res);
    
        console.log("After login");
        
        console.log("Response status code:", res.statusCode);
        
        expect(res.statusCode).toBe(200);
        
        expect(res._getJSONData()).toEqual({
            _id: 'user123',
            fullName: 'Test User',
            username: 'testuser',
            profilePic: 'testpic.jpg',
        });
    });
    

    it('should return 500 if there is a server error', async () => {
        req.body = {
        username: 'testuser',
        password: 'correctpassword',
        };

        User.findOne.mockRejectedValue(new Error('Internal Server Error'));

        await login(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: 'Internal Server Error' });
    });
});

describe('Logout Controller', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should clear the jwt cookie and return 200 if logout is successful', () => {
        logout(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: "Logged out successfully" });

        const cookies = res.cookies['jwt'];
        expect(cookies).toBeDefined();
        expect(cookies.value).toBe('');
        expect(cookies.options.maxAge).toBe(0);
    });

    it('should return 500 if there is a server error', () => {
        const originalCookie = res.cookie;
        res.cookie = jest.fn(() => { throw new Error('Internal Server Error') });

        logout(req, res);

        res.cookie = originalCookie;

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: "Internal Server Error" });
    });
});