import UserModel from "../src/models/user";
import bcrypt from "bcrypt";
import { cloneDeep } from 'lodash';

const i_size = 10;
const j_size = 10;
const util = require('util')
let output = [];

const siteData = [
  {
    description: 'Yahoo購物網',
    link: 'https://tw.buy.yahoo.com/'
  },
  {
    description: '家樂福',
    link: 'https://www.carrefour.com.tw/'
  },
  {
    description: '東森購物網',
    link: 'https://www.etmall.com.tw/'
  },
  {
    description: '樂天市場',
    link: 'https://www.rakuten.com.tw/'
  },
  {
    description: 'momo購物網',
    link: 'https://www.momoshop.com.tw/main/Main.jsp'
  },
  {
    description: '生活市集',
    link: 'https://www.buy123.com.tw/'
  },
  {
    description: '淘寶',
    link: 'https://world.taobao.com/'
  },
  {
    description: '蝦皮',
    link: 'https://shopee.tw/'
  },
];

for (let i = 0; i < i_size; i++) {
  let following = [];
  for (let f = i + 1; f < i_size; f++) {
    let folData = {
      email: 'test' + f.toString() + 'email',
      name: 'test' + f.toString()
    }
    following.push(folData)
  }
  let data = {
    id: i.toString(),
    name: 'test' + i.toString(),
    email: 'test' + i.toString() + 'email',
    password: 'test' + i.toString() + 'password',
    following,
    merchandise: []
  }
  for (let j = 0; j < j_size; j++) {
    let subData = {
      id: i.toString() + '_' + j.toString(),
      name: 'merchandise' + i.toString() + '_' + j.toString(),
      isFavorite: false,
      items: []
    }
    let newSiteData = cloneDeep(siteData)
    for (let k = 0; k < siteData.length; k++) {
      newSiteData[k].id = i.toString() + '_' + j.toString() + '_' + k.toString()
      subData.items.push(newSiteData[k])
    }
    data.merchandise[j] = subData
  }
  // console.log(util.inspect(data, false, null, false))
  output.push(data);
}

const dataInit = async () => {
  await UserModel.deleteMany({});
  for (let x = 0; x < output.length; x++) {
    let newUser = new UserModel(output[x])
    newUser.password = await bcrypt.hash(output[x].password, 12)
    await newUser.save();
  }
  console.log("Database initialized!");
}

export { dataInit };