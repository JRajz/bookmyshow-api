const { Joi } = require('celebrate');

const string = Joi.string().trim().max(255);
const stringReq = string.required();
const number = Joi.number();
const numberReq = number.required();
const posNum = number.positive().min(1);
const posNumReq = posNum.required();
const integer = number.integer();
const intReq = integer.required();
const posInt = posNum.integer();
const posIntReq = posInt.required();
const posIntegers = Joi.array().items(posInt).unique();
const posIntsReq = Joi.array().items(posIntReq).unique().required();
const email = string.email().lowercase().label('Email');
const emailReq = email.required();
const phone = posInt.min(6000000000).max(9999999999).label('Phone');
const phoneReq = phone.required();
const password = string.min(8).max(20).label('Password');
const passReq = password.required();
const date = Joi.date().iso({ format: 'YYYY-MM-DD', strict: true }).min('now');
const dateReq = date.required();

module.exports = {
  id: posInt,
  idReq: posIntReq,
  ids: posIntegers,
  idsReq: posIntsReq,
  phone,
  phoneOptional: phone.allow('', null),
  phoneReq,
  password,
  passReq,
  string,
  stringReq,
  number,
  numberReq,
  posNum,
  posNumReq,
  integer,
  intReq,
  posInt,
  posIntReq,
  posIntegers,
  posIntsReq,
  email,
  emailReq,
  date,
  dateReq,
};
