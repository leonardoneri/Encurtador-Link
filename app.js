const form = document.querySelector('form');
const input = document.querySelector('input');
const results = document.querySelector('.results')
const popup = document.querySelector('.popup')

const API_URL = 'https://api.shrtco.de/v2'

form.addEventListener('submit', async function (event) {
  event.preventDefault()
  const inputValue = input.value

  async function getShortedLink(link) {
    const result = await fetch(`${API_URL}/shorten?url=${link}`)
    return result.json()
  }

  const shorted = await getShortedLink(inputValue)
  renderResults(shorted.result)

  input.value = ''

})

function renderResults(data) {

  results.innerHTML =
    `
      <div class="result">
        <p>${data.original_link}</p>

        <div class="shorted">
          <p>${data.short_link}</p>
          <button onclick="copy()">Copy</button>
        </div>
    </div>
  `

}

function copy() {
  const copyTextElement = document.querySelector('.shorted p')
  navigator.clipboard.writeText(copyTextElement.textContent)

  popup.classList.add('active')

  setTimeout(function () {
    popup.classList.remove('active')
  }, 2000);
}