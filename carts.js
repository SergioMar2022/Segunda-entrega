// DELETE /carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter((product) => product.product != pid);
    await cart.save();
    res.status(200).json({ status: 'success' });
  });
  
  // PUT /carts/:cid
  router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findByIdAndUpdate(cid, { products: req.body }, { new: true }).populate('products.product');
    res.status(200).json({ status: 'success', payload: cart });
  });
  
  // PUT /carts/:cid/products/:pid
  router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    const index = cart.products.findIndex((product) => product.product == pid);
    cart.products[index].quantity = req.body.quantity;
    await cart.save();
    res.status(200).json({ status: 'success' });
  });
  
  // DELETE /carts/:cid
  router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    await Cart.findByIdAndUpdate(cid, { products: [] });
    res.status(200).json({ status: 'success' });
  });
  
  // GET /carts/:cid
  router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');
    res.render('cart', { cart });
  });
  