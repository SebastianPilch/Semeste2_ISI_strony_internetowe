
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];


// 1. Na stronie wyświetl w sekcji 1 tylko imiona zawierające znak "r".  ( tablica names)

function displayNamesWithR()
{
    const app = document.getElementById('app');
    const filteredNames = names.filter(name => name.toLowerCase().includes('r'));
    app.innerHTML = '';
    filteredNames.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        app.appendChild(nameElement);
    });
    window.onload = displayNamesWithR;
}

// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronie w sekcji 2
//      sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
//      inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
//      Nasteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2


function List_under_9()
{
    const section2 = document.getElementById('list_under_9');
    section2.innerHTML = '';
    const allLessThanNine = numbers.every(num => num < 9);
    section2.innerHTML += `<p>Czy wszystkie elementy są mniejsze niż 9? ${allLessThanNine}</p>`;
    const anyLessThanSix = numbers.some(num => num < 6);
    section2.innerHTML += `<p>Czy tablica zawiera elementy mniejsze niż 6? ${anyLessThanSix}</p>`;
    const incrementedNumbers = numbers.map(num => num + 1);
    section2.innerHTML += `<p>Tablica po inkrementacji: [${incrementedNumbers.join(', ')}]</p>`;
    const oddNumbers = incrementedNumbers.filter(num => num % 2 !== 0);
    section2.innerHTML += `<p>Tablica z elementami nieparzystymi: [${oddNumbers.join(', ')}]</p>`;
    const sumOfElements = oddNumbers.reduce((sum, num) => sum + num, 0);
    section2.innerHTML += `<p>Suma elementów z tablicy nieparzystej: ${sumOfElements}</p>`;


}

// 3. Na stronie w sekcji 3 wyświetl tylko kraje z Europy

function Europe_only()
{
    const section3 = document.getElementById("Europs_states")
    const filteredNames = countries.filter(countries => countries.continent === 'Europe');
    section3.innerHTML = '';
    filteredNames.forEach(countries => {
        const nameElement = document.createElement('li');
        nameElement.textContent = countries.name;
        section3.appendChild(nameElement);
    });
}




// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. Wyświetlanie wyników na ekranie przegladarki w sekcji 4.

function select_mails()
{
    const section4 = document.getElementById("Mails")
    const filteredNames = people.filter(people => people.email.toLowerCase().includes('replicant.io'));
    section4.innerHTML = '';
    filteredNames.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name.name;
        section4.appendChild(nameElement);
    });
}

// 5. W sekcji 5 wyswietl tylko imiona osób, które nie sa zdublowane


function Duplicants()
{
    const section5 = document.getElementById("RemoveDuplicants")
    let uniqueNames = duplicateName.filter((name, index, arr) => {
        return arr.indexOf(name) === arr.lastIndexOf(name);
    });

    uniqueNames.forEach(name => {
        const nameElement = document.createElement('li');
        nameElement.textContent = name;
        section5.appendChild(nameElement);
    });


}

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32]

// W sekcji 6 wyswietl odpoiwiedzi dla nastepujacych pytań:
//  1. Wypisz liste wszytkich firm

//  2.  Wypisz liste wszytkich pełnoletnich (tablica ages).
//
//  3.  Wypisz liste wszytkich firm  należacych do kategorii -  "Ratail".
//
//  4.  Wypisz liste wszytkich firm rozpoczynajacych działanosc w latach 80.
//
//  5.  Dodaj do tych wszytkich firm z punktu 4 prefix "Super". Wyniki wyswietl na ekranie.
//
//  6. Posiosrtuj liste firm pod katem długości działania na rynku działanosci. Wyniki wyswietl na ekranie.
//
//  7. Wyswwielt sumaryczna liczbe lat działanosci firm z kategorii Technology.
//
// 8.Kazdy rok z  tablicy ages zduplikuj. Następnie onlicz sume lat ale tylko dla lat większych od 40. Wynik napisz na ektranie.


function companiesQuestions()
{
    const section6 = document.getElementById('Companies');
    section6.innerHTML = '';
    const Company_list = companies.map(company => company.name);
    section6.innerHTML += `<p>Wypisz liste wszytkich firm: ${Company_list}</p>`;
    const adult = ages.filter(age => age >= 18)
    section6.innerHTML += `<p>Wszyscy pełnoletni: ${adult}</p>`;
    const Ratail_list = companies.filter( company =>  company.category === "Retail").map(company => company.name)
    section6.innerHTML += `<p>Nazwy firm w kategorii Retail: ${Ratail_list}</p>`;
    const list80s = companies.filter( company =>  company.start >= 1980 && company.start <= 1989).map(company => company.name)
    section6.innerHTML += `<p>Start w latach 80: ${list80s}</p>`;
    const Super_prefix = list80s.map(company => "Super " + company)
    section6.innerHTML += `<p>Prefix super: ${Super_prefix}</p>`;
    const sortedCompanies = companies.sort((a, b) => {
    const durationA = a.end - a.start;
    const durationB = b.end - b.start;
    return durationB - durationA;
    }).map(company => company.name);
    section6.innerHTML += `<p>Czas na rynku posortowane: ${sortedCompanies}</p>`;
    const time_sum = companies.filter(company => company.category === "Technology").reduce((total, company) => total + (company.end - company.start), 0);
    section6.innerHTML += `<p>Czas na rynku firmy technologiczne: ${time_sum}</p>`;
    const ages_calculations = ages.flatMap(age => [age, age]).
                                    filter(age  => age  > 40).reduce((total, age ) => total + age ,0 )


    section6.innerHTML += `<p>Obliczenia na ages: ${ages_calculations}</p>`;

}

