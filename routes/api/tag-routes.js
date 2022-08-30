const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch {err} {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!Tag) {
      res.status(404).json({message: "No tag found"});
      return;
    }
    res.status(200).json(category);
    }  catch {err} {
      res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch {err} {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTagName = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!newTagName) {
      res.status(404).json({message: "No tag found"});
      return;
    }
    res.status(200).json(newTagName);
    }  catch {err} {
      res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy( {
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({message: "No tag found"});
      return;
    }
    res.status(200).json(deleteTag);
    }  catch {err} {
      res.status(500).json(err);
    }
});

module.exports = router;
