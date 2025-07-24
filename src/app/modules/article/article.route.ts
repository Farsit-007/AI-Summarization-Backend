import { Router } from 'express';
import { articleControllers } from './article.controller';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { articleValidationSchemas } from './article.validation';

const router: Router = Router();

// createAnArticle
router.post(
  '/',
  auth(),

  validateRequest(articleValidationSchemas.createAnArticle),
  articleControllers.createAnArticle
);

// getOwnAllArticles
router.get('/getOwnArticles', auth(), articleControllers.getOwnAllArticles);

// getAllArticles
router.get('/', articleControllers.getAllArticles);

// getSingleArticle
router.get('/:id', articleControllers.getSingleArticle);



// deleteAnArticle
router.delete('/:id', articleControllers.deleteAnArticle);

// summarizeArticle
router.post(
  '/summarize-article/:id',
  articleControllers.summarizeArticle
);

export const ArticleRoutes = router;
