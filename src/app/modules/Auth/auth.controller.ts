import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

// createUser
const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

// loginUser
const loginUser = catchAsync(async (req, res) => {
  const { token, refreshToken } = await authServices.loginUserIntoDB(
    req.body
  );

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  res.cookie('token', token, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Logged in successfully',
    data: {
      token,
      refreshToken,
    },
  });
});

// getMyProfile
const getMyProfile = catchAsync(async (req, res) => {
  const result = await authServices.getMyProfile(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Profile fetched Successfully',
    data: result,
  });
});

// getNewtoken
const getNewtoken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.getNewtoken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Access Token Generated successfully',
    data: result,
  });
});



export const authControllers = {
  createUser,
  loginUser,
  getMyProfile,
  getNewtoken,
};
