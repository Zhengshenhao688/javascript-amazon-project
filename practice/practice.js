function divide(a, b) {
  if(b === 0) {
    throw'除数不能为0';
  }
  return a / b;
}

try{
  console.log(divide(10, 2));
  console.log(divide(10, 0));
} catch (err) {
  console.log('捕获到错误', err);
}

console.log('程序继续执行');



console.log('reject的流程');

async function fetchData(simulateError) {
  try{
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateError) {
          reject('请求失败'); // 异步报错
        } else {
          resolve('请求成功'); // 异步成功
        }
      }, 500);
    });

    console.log('拿到数据:', data);
  } catch (err) {
    console.log('捕获到错误:', err);
  }

  console.log('继续执行其他逻辑')
}

fetchData(false); // 异步成功
fetchData(true); // 异步失败