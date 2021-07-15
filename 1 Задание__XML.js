
/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();
// console.log('parser', parser);

// XML, который мы будем парсить
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;
// console.log('xmlString', xmlString);

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
// 1 раздел студента
const lists = xmlDOM.querySelector("list");
const students = lists.querySelectorAll("student");

// создание массива и объектов
let list = [];
var res = { }
 console.log(students);                         // высветится    ["<student/>","<student/>"]  - это  [object NodeList] (2)
for (let stud of students) {                   // тут мы грубо говоря делим на 2 часи, stud отвечает за каждого студента по __ОТДЕЛЬНОСТИ__
  const name = stud.querySelector("name");    // а далее в этом же студенте находим нужные селекторы и создаем объекты
  const atr = name.getAttribute('lang');     //  перебор NodeList можно записать еще как:__students.forEach( stud => {...});__
  const first = stud.querySelector("first");
  const second = stud.querySelector("second");       
  const age = stud.querySelector("age");
  const prof = stud.querySelector("prof");
  
  res =  { 
    name: `${first.textContent} ${second.textContent}`,
    age: Number(age.textContent),
    prof: prof.textContent,
    lang: atr,
    }
  list.push(res);
};

const result = {
  list: list
};

console.log(result);

