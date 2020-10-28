const $searchInput = document.querySelector('#searchInput');
const $searchForm = document.querySelector('#searchForm');
const $hoverParagraph = document.querySelector('#hoverP');
const $mealImage = document.querySelector('#mealImage');
const $messageOne = document.querySelector('#message-one');
const $messageTwo = document.querySelector('#message-two');
const loader = document.querySelector('.loader');
const $mealsGridContainer = document.querySelector('.mealsGridContainer');



const ifError = () => {
    showLoading();
             setTimeout(() => {
               $messageOne.textContent = 'No results, please try again'
               $messageOne.style.display = 'block';
             }, 2100)
             
             setTimeout(() => {
                $messageOne.style.display = 'none';
             }, 5500)
}

function showLoading() {
    loader.classList.add('show');
     setTimeout(() => {
        loader.classList.remove('show');
    }, 2000)
}

const searchMeal =  (e) => {
    e.preventDefault();
    $mealsGridContainer.innerHTML = '';
    const searchTerm = $searchInput.value;
  
    fetch(`/meals?s=${searchTerm}`).then((response) => {
        response.json().then(({ mealsData }) => {

            if (mealsData == undefined || mealsData == null){
                return ifError();
            } else {
                showLoading();

                setTimeout(() => {
                    $messageTwo.textContent = 'Oooooh yummmm';
                    $messageTwo.style.display = 'block';
                  }, 3000)
            
                  setTimeout(() => {
                    $messageTwo.style.display = 'none';
                  }, 5500)
                
                  setTimeout(() => {
                    mealsData.forEach((mealData) => {
                        const div = document.createElement('div');
                        div.className += 'mealItem';
                        div.innerHTML = `<div class="mealItemInner" data-mealID=${mealData.idMeal}>
                             <img id="mealImage" src="${mealData.strMealThumb}">
                                <div class="onHover">
                                    <p id="hoverP">${mealData.strMeal}</p>
                                    <button class="moreDetails">More details</button>
                                    <a target="_blank"href=${mealData.strYoutube}><button id="youtubeButton">Youtube video</button></a>
                                </div>
                            </div>`
            
                        $mealsGridContainer.appendChild(div);
                    })
                  }, 2600)
            
                setTimeout(() => {
                    $messageTwo.textContent = 'Oooohhh, tasty. Enjoy!!';
                    $messageTwo.style.display = 'block';
                },2200)
            
                setTimeout(() => {
                    $messageTwo.style.display = 'none';
                }, 6500)
            }
        })
    })
    $searchInput.value = '';
    const $moreDetailsButton = $mealsGridContainer.querySelector('.moreDetails');

    if($moreDetailsButton){
        $moreDetailsButton.addEventListener('hover', () => console.log('Hey'))
    }
}

// Submit Event Listener
$searchForm.addEventListener('submit', searchMeal);
