
let selects = document.querySelector('.select');
let valueOption = null;
let index = null;
     
     selects.onchange = function select() {
      valueOption =  Number(selects.value);  // вывод value
       let selectedOption = selects.options[selects.selectedIndex]; // вся опция  option value='2018'>2018</option>
       index = selects.selectedIndex; // индекс
       console.log(valueOption); 
     }  

       function useRequest(url, callback) {   // __2  Действие__ получили данные    callback - это displayResult 
        var xhr = new XMLHttpRequest();      //  Создаем экзепляр класса XMLHttpRequest
       // Инициализация запрос
        xhr.open('GET', url, true);
        // Добавляем обрабочик ответа сервера
        xhr.onload = function() {
          if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
          } else {
            const result = JSON.parse(xhr.response);   //  ПАРСИМ
            if (callback) {                           //  ЕСЛИ передается 2 параметр callback
              callback(result, index);               //  тогда вызываем этот колбэк, передавая туда результат запроса
              console.log(result);
            }
          }
        };
        
        xhr.send();
      };
      
      // Ищем ноду для вставки результата запроса
      const resultNode = document.querySelector('.j-result');
      // Ищем кнопку, по нажатии на которую будет запрос
      const btnNode = document.querySelector('.j-btn-request');
      /**
        * Функция обработки полученного результата
        * apiData - объект с результатом запроса
        */
      function displayResult(apiData, index) {
        let cards = '';   
         // for (let i = 0; i < apiData.lenght; i++) {  при это цикл for почему-то не работает
          const cardBlock = `
          <table>
          <tr>
          <th>1 кв.</th> <th>2 кв.</th> <th>3 кв.</th> <th>4 кв.</th> </tr>
          <tr>
     <td>${apiData[index].sales.q1}</td> <td>${apiData[index].sales.q2}</td> <td>${apiData[index].sales.q3}</td> <td>${apiData[index].sales.q4}</td>
    
          </tr
          </table>
          <p><a href='https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'], datasets:[{label:'Выручка за ${apiData[index].year} год',data:${apiData[index].sales.q3}}]}}'>Открыть график</a></p>
          `; 
  // <td>${apiData[i].sales.q1}</td> <td>${apiData[i].sales.q2}</td> <td>${apiData[i].sales.q3}</td> <td>${apiData[i].sales.q4}</td>
          cards = cardBlock; 
        resultNode.innerHTML = cards;  
      }
      
      // Вешаем обработчик на кнопку для запроса       //  __1 действие__  -  передаем url и функцию callback в качестве аргумента
      btnNode.addEventListener('click', () => {
        useRequest('https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440', displayResult);    // идем в начало кода
      })