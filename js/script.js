const container = document.querySelector('.container'),
    seats = document.querySelectorAll('.row .seat:not(.occupied)'),
    count = document.querySelector('#count'),
    movieSelect = document.querySelector('#movie'),
    options = document.querySelectorAll('#movie option');
let ticketPrice = +movieSelect.value,
    selectedSeats = document.querySelectorAll('.row .seat.selected'),
    total = document.querySelector('#total');
firstRender()
const updateSelectedCount = () => { // по клику делаем сиденья акс. и извлекакаем массив акт. сиденьев
    /* const selectedSeats = document.querySelectorAll('.row .seat.selected') */
    selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    let seatesIndex = [...selectedSeats]
    seatesIndex = seatesIndex.map(function (seat) {
        return [...seats].indexOf(seat)
    })
    return seatesIndex
}
const addToLocalStorage = (totalIndexes, totalSum) => {
    totalIndexes = localStorage.setItem('Indexes', JSON.stringify(updateSelectedCount()))
    totalSum = localStorage.setItem('totalCount', JSON.stringify(+total.textContent))
    console.log(totalIndexes, totalSum, +total.textContent)
}

function firstRender(totalIndexes, totalSum) {
    totalIndexes = new Promise((resolve, reject) => {
        function getData() {
            let data = JSON.parse(localStorage.getItem('Indexes'))
            resolve(data)
        }
        getData()
    })
    totalIndexes.then((data) => {
         data !== null && data.length > 0 ?
            seats.forEach((seat, i) => {
                data.indexOf(i) > -1 ? seat.classList.add('selected') : 0 
            })
            : 0
        totalSum = localStorage.getItem('totalCount')
        total.innerText = totalSum || "0"
        count.innerText = data.length || "0"
    })
}
movieSelect.addEventListener('click', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount()
})
container.addEventListener('click', e => {
    const target = e.target
    if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount()
        addToLocalStorage()
    }
})