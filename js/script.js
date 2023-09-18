/**
 * CSIS 3380 -Fullstack Web Development 
 * Assignment 2 - Pagination
 * Student name: Bengisu Gelin
 */



const contact_list_element = document.querySelector('.contact-list');
const pagination_element = document.querySelector('.pagination');

let current_page=1;  // default current page
let pageSize = 10;  // total contact number per page

/**
 * 
 * @param {*} users -> list of user's contact object coming from data.js
 * @param {*} wrapper -> classes that will host the relevant data. ( contact-list, .pagination)
 * @param {*} pageSize -> total contact number per page
 * @param {*} current_page ->page which is currently screened. (default is the fisrt page.)
 */
function DisplaycontactList(users,wrapper,pageSize,current_page){

  wrapper.innerHTML = "";

  const startIndex = (current_page - 1) * pageSize; //the starting index of the object which will be shown in the current page.
  const endIndex = startIndex + pageSize;  //the ending index of the object in the data list.
  let paginatedUsers = users.slice(startIndex, endIndex); //Slice of 10 contact number between start index and end index 


  //Adding users (contacts) for a given slice.
  for(let i =0; i<paginatedUsers.length; i++){
    let user = paginatedUsers[i];

      const listItem = document.createElement('li');  //creating a <li> inside HTML file
      listItem.classList.add('contact-item', 'cf');  //insert the <li> inside ".contact-item cf" class
  
      // Create the user details section
      const userDetails = document.createElement('div');  //create div
      userDetails.classList.add('contact-details');      //insert div to contact-details class
  
      const avatar = document.createElement('img');  //create img
      avatar.classList.add('avatar');               //insert img to avatar class
      avatar.src = user.image;                      // set source to relevant user(contact) image.
  
      const userName = document.createElement('h3'); //create <h3>
      userName.textContent = user.name;             //set user nae as h3
  
      const userEmail = document.createElement('span'); 
      userEmail.classList.add('email');
      userEmail.textContent = user.email;
  
      userDetails.appendChild(avatar);   // append avatar to userdetails
      userDetails.appendChild(userName);  //append username
      userDetails.appendChild(userEmail); //append email
  
      // Create the joined details section
      const joinedDetails = document.createElement('div');
      joinedDetails.classList.add('joined-details');
  
      //specify join dte of every user.
      const joinDate = document.createElement('span');
      joinDate.classList.add('date');
      joinDate.textContent = `Joined ${user.joined}`;
  
      joinedDetails.appendChild(joinDate);
  
      listItem.appendChild(userDetails);
      listItem.appendChild(joinedDetails);
  
      wrapper.appendChild(listItem);


      //total number of object in users array inside the data.js file
      var totalContactNo = users.length;

      //print it 
      const totalnum = document.getElementById("totalContactNum")
      totalnum.textContent = `Total: ${users.length} `

  }
  
}


//setting the number of page needed.
function SetupPagination(users,wrapper,pageSize){

  wrapper.innerHTML = "";

  
  //creating page numbers needed
  let page_count = Math.ceil(users.length/pageSize); //get the number of page -> is we have 33 users, then we need 4 page, therefore MAth.ceil was used.
  for(let i = 1; i < page_count + 1 ; i++){
    let pageNumbers = PaginationNumbers(i,users);
    wrapper.appendChild(pageNumbers);
  }

}


//create the list of page numbers needed.
function PaginationNumbers(page,users){

  const pagination_listItem = document.createElement('li'); 
  pagination_listItem.classList.add('page-item-current-page');

  const prev_link = document.createElement('a');
  prev_link.classList.add('page-link');
  prev_link.setAttribute("href","#")

  prev_link.innerText = page;



  if(current_page == page){
    pagination_listItem.classList.add('active'); 
  }

  pagination_listItem.appendChild(prev_link);
  
  //show the relevant page and contact list when page number clicked
  pagination_listItem.addEventListener('click', function(){
    current_page = page;
    DisplaycontactList(users,contact_list_element,pageSize,current_page);


  })

  return pagination_listItem;
  
}

//Display the contact list
DisplaycontactList(users,contact_list_element,pageSize,current_page);

//set up the pagination
SetupPagination(users,pagination_element,pageSize);
  
