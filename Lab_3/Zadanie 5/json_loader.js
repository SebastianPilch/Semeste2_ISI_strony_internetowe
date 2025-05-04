const apiUrl = 'http://localhost:3000/categories';

async function loadMenu() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const menuList = document.getElementById('menu-list');

        console.log(data)
        data.forEach(category => {
            const li = document.createElement('li');

            const toggleButton = document.createElement('button');
            toggleButton.classList.add('toggle-button');
            toggleButton.textContent = '▶';
            toggleButton.setAttribute('aria-label', `Rozwiń kategorię ${category.category}`);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = category.category;

            const label = document.createElement('label');
            label.htmlFor = category.category;
            label.textContent = category.category;

            const productList = document.createElement('ul');
            productList.classList.add('product-list');

            toggleButton.addEventListener('click', () => {
                productList.classList.toggle('show');
                toggleButton.classList.toggle('rotated');
                showSelectedProducts();

            });
            checkbox.addEventListener('change', () => {
                const productCheckbox = li.querySelectorAll('input[type="checkbox"]');
                productCheckbox.forEach(productCheckbox => {
                    productCheckbox.checked = checkbox.checked;
                });
                showSelectedProducts();
            });

            li.appendChild(toggleButton);
            li.appendChild(checkbox);
            li.appendChild(label);

            if (category.products && category.products.length > 0) {
                category.products.forEach(product => {
                    const productLi = document.createElement('li');

                    // Checkbox dla produktu
                    const productCheckbox = document.createElement('input');
                    productCheckbox.type = 'checkbox';
                    productCheckbox.id = product.name;

                    productCheckbox.addEventListener('change', () => {
                        checkMainCheckboxState(li);
                        showSelectedProducts();
                    });

                    const productLabel = document.createElement('label');
                    productLabel.htmlFor = product.name;
                    productLabel.textContent = product.name;

                    productLi.appendChild(productCheckbox);
                    productLi.appendChild(productLabel);
                    productList.appendChild(productLi);
                });
                li.appendChild(productList);
            }
            menuList.appendChild(li);
        });

    } catch (error) {
        console.error("Wystąpił błąd podczas ładowania menu:", error);
    }
}


function checkMainCheckboxState(categoryElement) {
    const mainCheckbox = categoryElement.querySelector('input[type="checkbox"]');
    const productCheckboxes = categoryElement.querySelectorAll('input[type="checkbox"]:first-child');

    const anyChecked = Array.from(productCheckboxes).some(checkbox => checkbox.checked);

    const allChecked = Array.from(productCheckboxes).every(checkbox => checkbox.checked);

    if (allChecked) {
        mainCheckbox.checked = true;
        mainCheckbox.indeterminate = false;

    } else {
        mainCheckbox.checked = false;
        mainCheckbox.indeterminate = true;
    }
    if(!anyChecked)
    {
        mainCheckbox.checked = false;
        mainCheckbox.indeterminate = false;
    }
}

function showSelectedProducts() {
    const selectedProducts = [];
    const productCheckboxes = document.querySelectorAll('input[type="checkbox"]:first-child:checked');

    productCheckboxes.forEach(checkbox => {
        const productName = checkbox.id;
        selectedProducts.push(productName);
    });

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (selectedProducts.length > 0) {
        const ul = document.createElement('ul');
        selectedProducts.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product;
            ul.appendChild(li);
        });
        contentDiv.appendChild(ul);
    } else {
        contentDiv.textContent = 'Brak zaznaczonych produktów';
    }
}


window.onload = loadMenu;

