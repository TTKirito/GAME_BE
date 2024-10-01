import express, { Request, Response } from 'express';
import { Game } from '../models/game';

const router = express.Router();

router.get('/api/games', async (req: Request, res: Response) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Game.find(JSON.parse(queryStr));

    if (req.query.search) {
      const search = (req.query.search as string).trim();
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex

      query = query.find({
        $or: [
          { name: searchRegex },
          { category: searchRegex },
          { provider: searchRegex },
          { title: searchRegex }
        ]
      });
    }

    if (req.query.select) {
      const fields = (req.query.select as string).split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort by creation date
    }

    const page = parseInt((req.query.page as string), 10) || 1;
    const limit = parseInt((req.query.limit as string), 10) || 100;
    const startIndex = (page - 1) * limit;
    const total = await Game.countDocuments();
    const totalPages = Math.ceil(total / limit);

    query = query.skip(startIndex).limit(limit);

    const pagination: {
      totalPages: number;
      next?: { page: number; limit: number };
      prev?: { page: number; limit: number };
    } = { totalPages };

    if (startIndex + limit < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    const games = await query;

    res.send({ games, pagination });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error' });
  }
});

export { router as indexGameRouter };