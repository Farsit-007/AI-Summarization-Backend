import { CalculatePagination } from '../../builder/paginationHelper';
import catchAsync from '../../utils/catchAsync';
import { httpStatus } from '../../utils/httpStatus';
import pick from '../../utils/pick';
import sendResponse from '../../utils/sendResponse';
import { articleFilterOptions } from './article.constants';
import { articleServices } from './article.service';

// createAnArticle
const createAnArticle = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const result = await articleServices.createAnArticleIntoDB(user, payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Article created successfully!',
    data: result,
  });
});

// getAllArticles
const getAllArticles = catchAsync(async (req, res) => {
  const filters = pick(req.query, articleFilterOptions);
  const pagiOptions = CalculatePagination(req.query);
  const result = await articleServices.getAllArticlesFromDB(
    pagiOptions,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Articles retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// get all own Articles
const getOwnAllArticles = catchAsync(async (req, res) => {
  const filters = pick(req.query, articleFilterOptions);
  const pagiOptions = CalculatePagination(req.query);
  const user = req.user;

  const result = await articleServices.getOwnAllArticlesFromDB(
    pagiOptions,
    user,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Articles retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// getSingleArticle
const getSingleArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await articleServices.getSingleArticleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Article fetched successfully!',
    data: result,
  });
});



// deleteAnArticle
const deleteAnArticle = catchAsync(async (req, res) => {
  await articleServices.deleteAnArticleFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Article deleted successfully!',
    data: null,
  });
});

// summarizeAnArticle
const summarizeArticle = catchAsync(async (req, res) => {
  const result = await articleServices.summarizeArticleFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Article summarized successfully!',
    data: result,
  });
});

export const articleControllers = {
  createAnArticle,
  getAllArticles,
  getOwnAllArticles,
  getSingleArticle,
  deleteAnArticle,
  summarizeArticle,
};
