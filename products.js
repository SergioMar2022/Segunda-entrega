// GET /products
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort === 'asc' ? 'price' : req.query.sort === 'desc' ? '-price' : null;
  const query = req.query.query ? { category: req.query.query } : {};
  const count = await Product.countDocuments(query);
  const totalPages = Math.ceil(count / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const prevPage = hasPrevPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevLink = hasPrevPage ? `?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
  const nextLink = hasNextPage ? `?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;
  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('category');
  res.status(200).json({
    status: 'success',
    payload: products,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
    prevLink,
    nextLink,
  });
});
