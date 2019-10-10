const Joi = require('@hapi/joi')

exports.checkRegister = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  nickname: Joi.string()
    .min(1)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  repeat_password: Joi.ref('password'),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  })
}).with('password', 'repeat_password')

exports.checkLogin = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().required()
})

exports.checkUpdateUser = Joi.object({
  currentPassword: Joi.string(),
  newPassword: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  nickname: Joi.string()
    .min(1)
    .max(30)
})

exports.checkOptions = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  keyword: Joi.string(),
  register: Joi.number().valid(0, 1).required()
})

exports.checkGetAllComment = Joi.object({
  page: Joi.number().max(2),
  pageSize: Joi.number().max(2)
})

exports.checkAddComment = Joi.object({
  cid: Joi.number().required(),
  author: Joi.string(),
  authorId: Joi.number(),
  mail: Joi.string().email(),
  url: Joi.string().uri(),
  ip: Joi.string().ip(),
  agent: Joi.string(),
  text: Joi.string(),
  parent: Joi.number()
})
  .with('author', 'mail')
  .without('author', 'authorId')
  .or('author', 'authorId')

exports.checkDelComment = Joi.object({
  coid: Joi.number().required()
})

exports.checkFindBySlug = Joi.object({
  slug: Joi.string().required()
})
exports.checkAddMeta = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string(),
})
exports.checkUpdateAndDelMetaByMid = Joi.object({
  mid: Joi.number().required()
})

exports.checkGetArticle = Joi.object({
  page: Joi.string(),
  pageSize: Joi.number(),
  keywords: Joi.string(),
  slug: Joi.string()
})

exports.checkCreateArticle = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  content: Joi.string().required(),
  order: Joi.number(),
  authorId: Joi.string().required(),
  type: Joi.string().valid('archive', 'page'),
  allowComment: Joi.number().valid(0, 1),
  metaIds: Joi.array()
})

exports.checkUpdateAndDelArtById = Joi.object({
  cid: Joi.number().required()
})
