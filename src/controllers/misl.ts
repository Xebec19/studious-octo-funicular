import faker from "faker";
import fs from 'fs';

const categoryTranslation = async () => {
  const categoryName = faker.music.genre();
  const createdOn = faker.date.recent().toLocaleDateString();
  return `'${categoryName}','${createdOn}','active'`;
};

const productTranslation = async () => {
  const productName = faker.commerce.productName();
  const quantity = faker.datatype.number();
  const productImage = faker.image.fashion();
  const price = faker.finance.amount();
  const deliveryPrice = faker.finance.amount();
  const productDesc = faker.lorem.paragraph();
  const gender = +Math.random().toFixed(1) > 0.6 ? 'Male' : 'Female';
  const createdOn = faker.date.past().toLocaleDateString();
  const updatedOn = faker.date.recent().toLocaleDateString();
  return `'${productName}','${productImage}',${quantity},'${createdOn}','${updatedOn}','${+Math.random().toFixed(1) > 0.6 ? 'active' : 'unactive'}',${price},${deliveryPrice},'${productDesc}','${gender}',1`
}

const createCategoryData = async () => {
  return `INSERT INTO bazaar_categories
  (category_name, created_on, status)
  VALUES(${await categoryTranslation()});
  `;
};

const createProductData = async () => {
  return `INSERT INTO bazaar_products
  (category_id, product_name, product_image, quantity, created_on, updated_on, status, price, delivery_price, product_desc, gender, country_id)
  VALUES(${+Math.random().toFixed(1)*10+1},${await productTranslation()});
  `;
};

const seeding = new Promise(async (resolve, reject) => {
  try {
    var categoryScript = '';
    var productScript = '';
    for (let i = 0; i < 10; i++) {
      categoryScript += await createCategoryData();
    }
    for (let i = 0; i < 100; i++) {
      productScript += await createProductData();
    }
    resolve({ categoryScript, productScript });
  }
  catch (error: any) {
    console.log('--error ', error.stack);
    reject();
  }
});

export const seedingFunc = () => {
  console.log('--seeding started');
  seeding.then((data: any) => {
    fs.writeFile('src/assets/seeding/category.sql', data.categoryScript, (err) => {
      if (err) {
        console.error(err);
        throw new Error(err.message);
      }
    });
    fs.writeFile('src/assets/seeding/product.sql', data.productScript, (err) => {
      if (err) {
        console.error(err);
        throw new Error(err.message);
      }
    });
    console.log('--seeding completed');
  }).catch((error: any) => {
    console.log('--error ', error.stack);
    console.log('--seeding stopped');
  });
};