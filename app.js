document.querySelector("#joke").addEventListener('click', loadJoke);
console.log('connected')


function loadJoke() {
    const number = document.querySelector("#number").value;
    const first = document.querySelector("#first").value;
    const last = document.querySelector('#last').value;
    // console.log(number)
    // console.log(first)
    // console.log(last)

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}?firstName=${first}&lastName=${last}`, true)

    let output = ''

    xhr.onprogress = function () {
        document.querySelector('p').innerHTML = `<h3 align='center'> Loading ......</h3>`
    }

    xhr.onload = function () {

        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            // console.log(response)

            if (response.type === 'success') {
                response.value.forEach(function (joke) {
                    output += `<li> ${joke.joke} </li>`
                })
            }
            else {
                output += `Couldn't fetch joke due to some unwanted error`
            }
        }

        document.querySelector('.blank').innerHTML = output
    }

    xhr.send()

}

document.getElementById('clear').addEventListener('click', clear)
function clear() {
    document.querySelector('p').innerHTML = ''
}