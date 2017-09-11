const list = document.querySelector('#book-list ul');

// delete books
list.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {
        const li = e.target.parentElement;
        list.removeChild(li);
    }
});

// BAD WAY
// Using this way, you will get a fixed value of delete buttons
// So when you add a new li item, the new li item's delete function can not work.
// const btns = document.querySelectorAll('#book-list .delete');

// add book-list
const addForm = document.forms['add-book'];
addForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Important!!! Prevent the page reload
    const value = addForm.querySelector('input[type="text"]').value;
    
    // list.innerHTML += '<li><span class="name">' + value + '</span><span class="delete">delete</span></li>'; 
    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const deleteBtn = document.createElement('span');

    // add content
    deleteBtn.textContent = 'delete';
    bookName.textContent = value;

    // style it
    deleteBtn.classList.add('delete');
    bookName.classList.add('name');

    // append to list
    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    list.appendChild(li);
})