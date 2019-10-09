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

exports.checkGetArticle = Joi.object({
  page: Joi.string(),
  pageSize: Joi.number(),
  // onlyTitle: Joi.number(), // 只要标题（归档用）
  keywords: Joi.string(), // 关键字查询
  slug: Joi.string() // 针对前台metas查询
  // mid: Joi.string() // 针对后台metas查询(暂时用不到，先关了，等用到再开)
})

exports.checkOptions = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  keyword: Joi.string(),
  register: Joi.number().valid([0, 1])
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
