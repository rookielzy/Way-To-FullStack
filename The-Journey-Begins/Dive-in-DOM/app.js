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
    const bookName = addForm.querySelector('input[type="text"]').value;
    
})